import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js"; // Configuración de Firebase
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // Métodos para interactuar con Firestore
import { getAuth } from "firebase/auth"; // Servicio de autenticación de Firebase
import HomeScreenView from "../components/HomeScreenView"; // Componente de vista para la pantalla principal

// Inicializa Firestore y el servicio de autenticación de Firebase
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

// Componente principal de la pantalla de inicio
export default function HomeScreen(props) {
  // Estado para almacenar las recetas del usuario
  const [recipes, setRecipes] = useState([]);
  // Estado para almacenar las recetas compartidas con el usuario
  const [sharedRecipes, setSharedRecipes] = useState([]);
  // Estado para almacenar el nombre del usuario
  const [userName, setUserName] = useState("");

  // Hook de efecto para cargar datos al montar el componente
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "Usuario");
    }

    // Función para obtener las recetas del usuario desde Firestore
    const getRecipes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "No se pudo identificar al usuario");
          return;
        }

        const recipesQuery = query(
          collection(db, "recipes"),
          where("uid", "==", user.uid)
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

    // Función para obtener las recetas compartidas con el usuario
    const getSharedRecipes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

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
    <HomeScreenView
      userName={userName}
      recipes={recipes}
      sharedRecipes={sharedRecipes}
      navigation={props.navigation}
    />
  );
}
