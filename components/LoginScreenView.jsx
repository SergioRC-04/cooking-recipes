import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function LoginScreenView({
  email,
  password,
  onChangeText,
  onLogin,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          onChangeText={(value) => onChangeText(value, "email")}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          onChangeText={(value) => onChangeText(value, "password")}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Iniciar Sesión" onPress={onLogin} />
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
