import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import SearchScreenView from "../components/SearchScreenView";

const db = getFirestore(appFirebase);

export default function SearchScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

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

  return (
    <SearchScreenView
      searchTerm={searchTerm}
      filteredRecipes={filteredRecipes}
      onSearch={handleSearch}
      onRecipePress={(recipeId) =>
        navigation.navigate("RecipeDetail", { recipeId })
      }
    />
  );
}
