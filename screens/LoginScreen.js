import React, { useState } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginScreenView from "../components/LoginScreenView";

const auth = getAuth(appFirebase);

export default function LoginScreen(props) {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, state.email, state.password);
      Alert.alert("Éxito", "Inicio de sesión correcto");
      props.navigation.navigate("Home");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  const navigateToRegister = () => {
    props.navigation.navigate("Register");
  };

  return (
    <LoginScreenView
      email={state.email}
      password={state.password}
      onChangeText={handleChangeText}
      onLogin={loginUser}
      onNavigateToRegister={navigateToRegister} // Pasar la función de navegación al componente
    />
  );
}
