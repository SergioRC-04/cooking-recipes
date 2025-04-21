import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function RegisterScreenView({
  state,
  onChangeText,
  onSaveUser,
  onNavigateToLogin,
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contenedor del logo y título */}
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logoutil.png")} style={styles.logo} />
        <Text style={styles.title}>User Registration</Text>
      </View>

      {/* Campo de entrada para el nombre */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Campo de entrada para el apellido */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "lastname")}
          value={state.lastname}
        />
      </View>

      {/* Campo de entrada para el correo electrónico */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "email")}
          value={state.email}
          keyboardType="email-address"
        />
      </View>

      {/* Campo de entrada para el número de teléfono */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "number")}
          value={state.number}
          keyboardType="phone-pad"
        />
      </View>

      {/* Campo de entrada para la contraseña */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          onChangeText={(value) => onChangeText(value, "password")}
          value={state.password}
          secureTextEntry={true}
        />
      </View>

      {/* Botón para registrar al usuario */}
      <TouchableOpacity style={styles.buttonContainer} onPress={onSaveUser}>
        <Text style={{ color: "#fff" }}>Register User</Text>
      </TouchableOpacity>

      {/* Texto para redirigir al inicio de sesión */}
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => onNavigateToLogin()}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadows for Android
    elevation: 5,
  },
  buttonContainer: {
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "#EC8B14",
    fontSize: 14,
    alignItems: "center",
    // Shadows for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadows for Android
    elevation: 5,
  },
  loginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#333",
  },
  loginLink: {
    fontSize: 14,
    color: "#EC8B14",
    fontWeight: "bold",
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
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});
