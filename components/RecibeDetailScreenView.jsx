import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function RecipeDetailScreenView({ recipe, onShare, loading }) {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          Cargando detalles de la receta...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
      </View>
      <Text style={styles.subtitle}>Creador: {recipe.creator}</Text>
      <Text style={styles.date}>
        Fecha de creación:{" "}
        {recipe.creationDate?.toDate().toLocaleString() || "Sin fecha"}
      </Text>
      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      <Text style={styles.text}>{recipe.ingredients}</Text>
      <Text style={styles.sectionTitle}>Instrucciones:</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Compartir Receta</Text>
      </TouchableOpacity>
    </ScrollView>
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
    width: "100%",
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
  loadingText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EC8B14", // Color consistente con los títulos anteriores
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textTransform: "uppercase",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    lineHeight: 22,
    textAlign: "justify",
    paddingHorizontal: 20,
  },
  shareButton: {
    backgroundColor: "#EC8B14", // Color consistente con los botones anteriores
    padding: 15,
    borderRadius: 25, // Bordes redondeados consistentes
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
    marginHorizontal: 20,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
