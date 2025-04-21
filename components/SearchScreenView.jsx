import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function SearchScreenView({
  searchTerm,
  filteredRecipes,
  onSearch,
  onRecipePress,
  navigation,
}) {
  return (
    <View style={styles.container}>
      {/* Encabezado con el logo, título y botón de retroceso */}
      <View style={styles.header}>
        <Image source={require("../assets/lupaA.png")} style={styles.logo} />
        <Text style={styles.title}>Search Recipes</Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/atras1.png")} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* Campo de entrada para el término de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or ingredients"
        placeholderTextColor="#94A3B8"
        value={searchTerm}
        onChangeText={onSearch}
      />

      {/* Lista de recetas filtradas */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeItem}
            onPress={() => onRecipePress(item.id)}
          >
            <Image
              source={require("../assets/recetas.png")}
              style={styles.recipeImage}
            />
            <View style={styles.subrecipeItem}>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeSubtitle}>Creator: {item.creator}</Text>
              <Text style={styles.recipeingre}>
                Ingredients: {item.ingredients}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No recipes found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginBottom: 1,
    marginHorizontal: 0,
    paddingTop: 50,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#EC8B14",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subrecipeItem: {
    width: "70%",
    flexDirection: "column",
    marginRight: 15,
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
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  recipeingre: {
    fontSize: 12,
    color: "#777",
  },
});
