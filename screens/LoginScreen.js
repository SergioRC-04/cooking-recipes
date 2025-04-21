import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import appFirebase from "../credenciales.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>

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
          placeholder="Contraseña"
          onChangeText={(value) => handleChangeText(value, "password")}
          value={state.password}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Iniciar Sesión" onPress={loginUser} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
