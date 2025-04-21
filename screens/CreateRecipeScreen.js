import React, { useState } from "react";
import { getAuth } from "firebase/auth";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";

import appFirebase from "../credenciales.js";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function CreateRecipeScreen(props) {
  const initialState = {
    title: "",
    ingredients: "",
    instructions: "",
    creator: "",
  };

  const [state, setState] = useState(initialState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveRecipe = async () => {
    try {
      const user = auth.currentUser; // Obtén el usuario autenticado
      if (!user) {
        Alert.alert("Error", "No se pudo identificar al usuario");
        return;
      }

      await addDoc(collection(db, "recipes"), {
        ...state,
        creator: user.displayName || user.email, // Nombre o correo del creador
        uid: user.uid, // UID del usuario autenticado
        creationDate: Timestamp.now(), // Fecha de creación
      });

      Alert.alert("Alerta", "Receta guardada correctamente");
      props.navigation.navigate("Home"); // Redirige a la pantalla principal
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al guardar la receta");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Receta</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          onChangeText={(value) => handleChangeText(value, "title")}
          value={state.title}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingredientes (separados por comas)"
          onChangeText={(value) => handleChangeText(value, "ingredients")}
          value={state.ingredients}
          multiline={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Instrucciones"
          onChangeText={(value) => handleChangeText(value, "instructions")}
          value={state.instructions}
          multiline={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Guardar Receta" onPress={saveRecipe} />
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
