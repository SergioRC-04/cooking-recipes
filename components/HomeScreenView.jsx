import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HomeScreenView({
  userName,
  recipes,
  sharedRecipes,
  navigation,
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {userName}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateRecipe")}
      >
        <Text style={styles.buttonText}>Agregar Receta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Search")}
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
              navigation.navigate("RecipeDetail", { recipeId: recipe.id })
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
              navigation.navigate("RecipeDetail", { recipeId: recipe.id })
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
