import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import SearchScreenView from "../components/SearchScreenView";

// Inicializa Firestore
const db = getFirestore(appFirebase);

export default function SearchScreen({ navigation }) {
  // Estado para almacenar todas las recetas
  const [recipes, setRecipes] = useState([]);
  // Estado para almacenar el término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para almacenar las recetas filtradas según el término de búsqueda
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Hook de efecto para cargar las recetas al montar el componente
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { title, ingredients, creator } = doc.data();
          docs.push({
            id: doc.id,
            title,
            ingredients,
            creator,
          });
        });
        setRecipes(docs);
        setFilteredRecipes(docs); // Inicialmente muestra todas las recetas
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  // Función para manejar la búsqueda de recetas
  const handleSearch = (text) => {
    setSearchTerm(text);

    // Filtrar recetas por título o ingredientes
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(text.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  // Renderiza el componente de vista y pasa las props necesarias
  return (
    <SearchScreenView
      searchTerm={searchTerm}
      filteredRecipes={filteredRecipes}
      onSearch={handleSearch}
      onRecipePress={(recipeId) =>
        navigation.navigate("RecipeDetail", { recipeId })
      }
      navigation={navigation}
    />
  );
}
