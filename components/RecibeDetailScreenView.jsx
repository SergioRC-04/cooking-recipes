import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function RecipeDetailScreenView({
  recipe,
  onShare,
  loading,
  navigation,
}) {
  // Muestra un indicador de carga si los datos de la receta aún no están disponibles
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
      {/* Encabezado con el título de la receta y el botón de retroceso */}
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/atras1.png")} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* Información del creador de la receta */}
      <Text style={styles.subtitle}>Creador: {recipe.creator}</Text>

      {/* Fecha de creación de la receta */}
      <Text style={styles.date}>
        Fecha de creación:{" "}
        {recipe.creationDate?.toDate().toLocaleString() || "Sin fecha"}
      </Text>
      {/* Sección de ingredientes */}
      <Text style={styles.sectionTitle}>Ingredientes:</Text>
      <Text style={styles.text}>{recipe.ingredients}</Text>

      {/* Sección de instrucciones */}
      <Text style={styles.sectionTitle}>Instrucciones:</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>

      {/* Botón para compartir la receta */}
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
    color: "#EC8B14",
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
    backgroundColor: "#EC8B14",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
