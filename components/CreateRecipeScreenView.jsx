import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

export default function CreateRecipeScreenView({
  state,
  onChangeText,
  onSaveRecipe,
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Receta</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          onChangeText={(value) => onChangeText(value, "title")}
          value={state.title}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingredientes (separados por comas)"
          onChangeText={(value) => onChangeText(value, "ingredients")}
          value={state.ingredients}
          multiline={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Instrucciones"
          onChangeText={(value) => onChangeText(value, "instructions")}
          value={state.instructions}
          multiline={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Guardar Receta" onPress={onSaveRecipe} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
});
