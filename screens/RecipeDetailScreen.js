import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import appFirebase from "../credenciales.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(appFirebase);

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params; // Obtén el ID de la receta desde los parámetros de navegación
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", recipeId); // Referencia al documento de la receta
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data()); // Establece los datos de la receta
        } else {
          Alert.alert("Error", "No se encontró la receta");
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Error",
          "Hubo un problema al cargar los detalles de la receta"
        );
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles de la receta...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.subtitle}>Creador: {recipe.creator}</Text>
      <Text style={styles.date}>
        Fecha de creación:{" "}
        {recipe.creationDate?.toDate().toLocaleString() || "Sin fecha"}
      </Text>
      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      <Text style={styles.text}>{recipe.ingredients}</Text>
      <Text style={styles.sectionTitle}>Instrucciones:</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() =>
          navigation.navigate("ShareRecipe", { recipeId: recipeId })
        } // Navega a la pantalla de compartir receta
      >
        <Text style={styles.shareButtonText}>Compartir Receta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    lineHeight: 22,
  },
});
