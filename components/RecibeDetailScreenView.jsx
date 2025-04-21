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
        <Text>Cargando detalles de la receta...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
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
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    lineHeight: 22,
  },
  shareButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
