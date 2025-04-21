import React, { useState } from "react";
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
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
      // Validar la contraseña
      if (!validatePassword(state.password)) {
        Alert.alert(
          "Error",
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula y un número."
        );
        return;
      }

      // Registrar al usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );

      // Actualizar el perfil del usuario con su nombre
      await updateProfile(userCredential.user, {
        displayName: `${state.name} ${state.lastname}`,
      });

      // Guardar información adicional del usuario en Firestore
      await addDoc(collection(db, "users"), {
        name: state.name,
        lastname: state.lastname,
        email: state.email,
        number: state.number,
        uid: userCredential.user.uid, // Relacionar con el UID del usuario
      });

      Alert.alert("Alerta", "Usuario registrado correctamente");
      props.navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al registrar el usuario");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={(value) => handleChangeText(value, "lastname")}
          value={state.lastname}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Número de Teléfono"
          onChangeText={(value) => handleChangeText(value, "number")}
          value={state.number}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={(value) => handleChangeText(value, "password")}
          value={state.password}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Registrar Usuario" onPress={saveUser} />
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
