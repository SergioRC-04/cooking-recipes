import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function CreateRecipeScreenView({
  state,
  onChangeText,
  onSaveRecipe,
  navigation,
}) {
  return (
    <View contentContainerStyle={styles.container}>
      {/* Encabezado con el logo, título y botón de retroceso */}
      <View style={styles.header}>
        <Image source={require("../assets/recetasA.png")} style={styles.logo} />
        <Text style={styles.title}>Create Recipe</Text>
        <TouchableOpacity
          style={{ marginLeft: "auto" }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../assets/atras1.png")} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* Campo de entrada para el nombre de la receta */}
      <View style={styles.inputContainer}>
        <Text style={styles.othertitle}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipe name"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "title")}
          value={state.title}
        />
      </View>

      {/* Campo de entrada para los ingredientes */}
      <Text style={styles.othertitle}>Ingredient</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { minHeight: 60 }]}
          placeholder="Ingredients (comma-separated)"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "ingredients")}
          value={state.ingredients}
          multiline={true}
        />
      </View>

      {/* Campo de entrada para los pasos */}
      <Text style={styles.othertitle}>Steps</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { minHeight: 60 }]}
          placeholder="Describe the steps"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "instructions")}
          value={state.instructions}
          multiline={true}
        />
      </View>

      {/* Botón para guardar la receta */}
      <TouchableOpacity style={styles.buttonContainer} onPress={onSaveRecipe}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 14,
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadows for Android
    elevation: 5,
  },
  buttonContainer: {
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "#EC8B14",
    alignItems: "center",
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadows for Android
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  othertitle: {
    fontSize: 16,
    paddingTop: 20,
    paddingHorizontal: 25,
    paddingBottom: 5,
  },
});
