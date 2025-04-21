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

// Inicializa Firestore y el servicio de autenticación de Firebase
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

// Componente principal de la pantalla de registro
export default function RegisterScreen(props) {
  // Estado inicial para los campos del formulario
  const initialState = {
    name: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
  };

  // Hook de estado para manejar los valores de los inputs
  const [state, setState] = useState(initialState);

  // Función para manejar los cambios en los inputs
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  // Función para validar la contraseña
  const validatePassword = (password) => {
    // Expresión regular para validar contraseñas seguras
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password); // Retorna true si la contraseña es válida
  };

  // Función para guardar el usuario en Firebase
  const saveUser = async () => {
    try {
      // Validar la contraseña antes de continuar
      if (!validatePassword(state.password)) {
        Alert.alert(
          "Error",
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número."
        );
        return; // Detiene la ejecución si la contraseña no es válida
      }

      // Crear un nuevo usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      // Actualizar el perfil del usuario con su nombre y apellido
      await updateProfile(userCredential.user, {
        displayName: `${state.name} ${state.lastname}`,
      });

      // Guardar los datos del usuario en Firestore
      await addDoc(collection(db, "users"), {
        name: state.name,
        lastname: state.lastname,
        email: state.email,
        number: state.number,
        uid: userCredential.user.uid,
      });

      // Mostrar un mensaje de éxito y redirigir al inicio de sesión
      Alert.alert("Alerta", "Usuario registrado correctamente");
      props.navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al registrar el usuario");
    }
  };

  // Función para navegar a la pantalla de inicio de sesión
  const navigateToLogin = () => {
    props.navigation.navigate("Login");
  };

  // Renderiza el componente de vista y pasa las props necesarias
  return (
    <RegisterScreenView
      state={state}
      onChangeText={handleChangeText}
      onSaveUser={saveUser}
      onNavigateToLogin={navigateToLogin}
    />
  );
}
