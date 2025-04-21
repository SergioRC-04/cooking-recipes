import React, { useState } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import CreateRecipeScreenView from "../components/CreateRecipeScreenView";

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
    <CreateRecipeScreenView
      state={state}
      onChangeText={handleChangeText}
      onSaveRecipe={saveRecipe}
    />
  );
}
