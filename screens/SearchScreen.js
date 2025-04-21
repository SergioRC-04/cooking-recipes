import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import appFirebase from "../credenciales.js";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por título o ingredientes"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeItem}
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipeId: item.id })
            }
          >
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeSubtitle}>Creador: {item.creator}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron recetas</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 20,
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
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});
