import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

export default function LoginScreenView({
  email,
  password,
  onChangeText,
  onLogin,
  onNavigateToRegister, // Nueva función para redirigir a la pantalla de registro
}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logoutil.png")} // Asegúrate de que el logo esté en la carpeta `assets`
          style={styles.logo}
        />
        <Text style={styles.title}>TastyRecipes</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#94A3B8"
          placeholder="Email"
          onChangeText={(value) => onChangeText(value, "email")}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#94A3B8"
          placeholder="Password"
          onChangeText={(value) => onChangeText(value, "password")}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={onLogin}>
        <Text style={{ color: "#fff" }}>Login</Text>
      </TouchableOpacity>

      {/* Texto para redirigir al registro */}
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => onNavigateToRegister()}
      >
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.registerLink}>Register now!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 14,
    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras para Android
    elevation: 5,
  },
  buttonContainer: {
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "#EC8B14",
    fontSize: 14,
    alignItems: "center",
    // Sombras para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombras para Android
    elevation: 5,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#333",
  },
  registerLink: {
    fontSize: 14,
    color: "#EC8B14",
    fontWeight: "bold",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
  },
});
