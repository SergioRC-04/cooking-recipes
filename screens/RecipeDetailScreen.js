import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import RecipeDetailScreenView from "../components/RecibeDetailScreenView.jsx";

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
    return <RecipeDetailScreenView loading />;
  }

  return (
    <RecipeDetailScreenView
      recipe={recipe}
      onShare={() => navigation.navigate("ShareRecipe", { recipeId })}
    />
  );
}
