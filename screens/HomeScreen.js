import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import appFirebase from "../credenciales.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function HomeScreen(props) {
  const [recipes, setRecipes] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Obtener el nombre del usuario autenticado
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "Usuario"); // Usa el nombre o un valor predeterminado
    }

    const getRecipes = async () => {
      try {
        const user = auth.currentUser; // Obtén el usuario autenticado
        if (!user) {
          Alert.alert("Error", "No se pudo identificar al usuario");
          return;
        }

        // Consulta para obtener solo las recetas del usuario actual
        const recipesQuery = query(
          collection(db, "recipes"),
          where("uid", "==", user.uid) // Filtra por el UID del usuario
        );

        const querySnapshot = await getDocs(recipesQuery);
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { title, ingredients, instructions, creator, creationDate } =
            doc.data();
          docs.push({
            id: doc.id,
            title,
            ingredients,
            instructions,
            creator,
            creationDate:
              creationDate?.toDate().toLocaleString() || "Sin fecha",
          });
        });
        setRecipes(docs);
      } catch (error) {
        console.error(error);
      }
    };

    const getSharedRecipes = async () => {
      try {
        const user = auth.currentUser; // Obtén el usuario autenticado
        if (!user) return;

        // Consulta para obtener las recetas compartidas con el usuario actual
        const sharedQuery = query(
          collection(db, "sharedRecipes"),
          where("recipientUid", "==", user.uid)
        );

        const sharedSnapshot = await getDocs(sharedQuery);
        const sharedRecipeIds = sharedSnapshot.docs.map(
          (doc) => doc.data().recipeId
        );

        if (sharedRecipeIds.length > 0) {
          const recipesQuery = query(
            collection(db, "recipes"),
            where("__name__", "in", sharedRecipeIds)
          );

          const recipesSnapshot = await getDocs(recipesQuery);
          const sharedDocs = recipesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setSharedRecipes(sharedDocs);
        }
      } catch (error) {
        console.error("Error al obtener recetas compartidas:", error);
      }
    };

    getRecipes();
    getSharedRecipes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {userName}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("CreateRecipe")}
      >
        <Text style={styles.buttonText}>Agregar Receta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Search")}
      >
        <Text style={styles.buttonText}>Buscar Recetas</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Mis Recetas</Text>
      </View>

      <View style={styles.recipeList}>
        {recipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeItem}
            onPress={() =>
              props.navigation.navigate("RecipeDetail", { recipeId: recipe.id })
            }
          >
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeSubtitle}>Creador: {recipe.creator}</Text>
            <Text style={styles.recipeDate}>Fecha: {recipe.creationDate}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Recetas Compartidas</Text>
      </View>

      <View style={styles.recipeList}>
        {sharedRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeItem}
            onPress={() =>
              props.navigation.navigate("RecipeDetail", { recipeId: recipe.id })
            }
          >
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeSubtitle}>Creador: {recipe.creator}</Text>
            <Text style={styles.recipeDate}>
              Fecha:{" "}
              {recipe.creationDate?.toDate().toLocaleString() || "Sin fecha"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  recipeList: {
    marginTop: 20,
  },
  recipeItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  recipeSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  recipeDate: {
    fontSize: 12,
    color: "#777",
  },
});
