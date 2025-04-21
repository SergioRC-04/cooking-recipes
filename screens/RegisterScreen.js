import React, { useState } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import RegisterScreenView from "../components/RegisterScreenView";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function RegisterScreen(props) {
  const initialState = {
    name: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const saveUser = async () => {
    try {
      if (!validatePassword(state.password)) {
        Alert.alert(
          "Error",
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número."
        );
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${state.name} ${state.lastname}`,
      });

      await addDoc(collection(db, "users"), {
        name: state.name,
        lastname: state.lastname,
        email: state.email,
        number: state.number,
        uid: userCredential.user.uid,
      });

      Alert.alert("Alerta", "Usuario registrado correctamente");
      props.navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al registrar el usuario");
    }
  };
  const navigateToLogin = () => {
    props.navigation.navigate("Login"); // Navega a la pantalla de inicio de sesión
  };

  return (
    <RegisterScreenView
      state={state}
      onChangeText={handleChangeText}
      onSaveUser={saveUser}
      onNavigateToLogin={navigateToLogin} // Pasa la función de navegación
    />
  );
}
