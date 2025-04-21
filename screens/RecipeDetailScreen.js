import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import RecipeDetailScreenView from "../components/RecibeDetailScreenView.jsx";

const db = getFirestore(appFirebase);

// Componente principal de la pantalla de detalles de la receta
export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params; // Obtén el ID de la receta desde los parámetros de navegación
  const [recipe, setRecipe] = useState(null); // Estado para almacenar los datos de la receta

  // Hook de efecto para cargar los detalles de la receta al montar el componente
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
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

  // Muestra un indicador de carga si los datos de la receta aún no están disponibles
  if (!recipe) {
    return <RecipeDetailScreenView loading />;
  }

  // Renderiza el componente de vista con los datos de la receta
  return (
    <RecipeDetailScreenView
      recipe={recipe}
      onShare={() => navigation.navigate("ShareRecipe", { recipeId })}
      navigation={navigation}
    />
  );
}
