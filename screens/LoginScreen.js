import React, { useState } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginScreenView from "../components/LoginScreenView";

// Inicializa el servicio de autenticación de Firebase
const auth = getAuth(appFirebase);

// Componente principal de la pantalla de inicio de sesión
export default function LoginScreen(props) {
  const initialState = {
    email: "",
    password: "",
  };

  // Hook de estado para manejar los valores de los inputs
  const [state, setState] = useState(initialState);

  // Función para manejar los cambios en los inputs
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  // Función para iniciar sesión con Firebase
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

  // Función para navegar a la pantalla de registro
  const navigateToRegister = () => {
    props.navigation.navigate("Register");
  };

  // Renderiza el componente de vista y pasa las props necesarias
  return (
    <LoginScreenView
      email={state.email}
      password={state.password}
      onChangeText={handleChangeText}
      onLogin={loginUser}
      onNavigateToRegister={navigateToRegister}
    />
  );
}
