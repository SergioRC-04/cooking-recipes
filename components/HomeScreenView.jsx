import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function HomeScreenView({
  userName,
  recipes,
  sharedRecipes,
  navigation,
}) {
  return (
    <View style={{ flex: 1 }}>
      {/* Encabezado con el logo y el saludo al usuario */}
      <View style={styles.header}>
        <Image source={require("../assets/logoutil.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome, {userName}</Text>
      </View>

      {/* Contenedor principal con desplazamiento */}
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.bottonsearch}
          onPress={() => navigation.navigate("Search")}
        >
          <Image
            source={require("../assets/lupa.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        {/* Sección de recetas del usuario */}
        <Text style={styles.listTitle}>My Recipes</Text>
        <View style={styles.recipeList}>
          {recipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeItem}
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipeId: recipe.id })
              }
            >
              <Image
                source={require("../assets/recetas.png")} // Reemplaza con la ruta de tu imagen
                style={styles.recipeImage}
              />
              <View style={styles.recipeTextContainer}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeSubtitle}>
                  Creador: {recipe.creator}
                </Text>
                <Text style={styles.recipeDate}>
                  Fecha: {recipe.creationDate}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sección de recetas compartidas */}
        <Text style={styles.listTitle}>Shared Recipes</Text>
        <View style={styles.recipeList}>
          {sharedRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={styles.recipeItem}
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipeId: recipe.id })
              }
            >
              <Image
                source={require("../assets/recetas.png")}
                style={styles.recipeImage}
              />
              <View style={styles.recipeTextContainer}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeSubtitle}>
                  Creador: {recipe.creator}
                </Text>
                <Text style={styles.recipeDate}>
                  Fecha:{" "}
                  {recipe.creationDate?.toDate().toLocaleString() ||
                    "Sin fecha"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer con el botón para agregar una nueva receta */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("CreateRecipe")}
        >
          <Text style={styles.footerButtonText}>Add Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginBottom: 1,
    marginHorizontal: 0,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "baseline",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: "#333",
    textAlign: "left",
    fontWeight: "bold",
  },
  bottonsearch: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
    paddingRight: 20,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#EC8B14",
    textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase",
    marginTop: 20,
  },
  recipeList: {
    marginBottom: 20,
  },
  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  recipeTextContainer: {
    flex: 1,
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
    paddingBottom: 20,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#EC8B14",
    borderRadius: 25,
    alignItems: "center",
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
