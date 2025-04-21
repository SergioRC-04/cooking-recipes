import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ShareRecipeScreenView({ users, onShare }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un usuario para compartir</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => onShare(item.uid)}
          >
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay otros usuarios disponibles
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    backgroundColor: "#fff", // Fondo blanco consistente con las otras pantallas
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#EC8B14", // Color naranja consistente con los títulos anteriores
    marginBottom: 20,
    textAlign: "center",
    textTransform: "uppercase", // Texto en mayúsculas para consistencia
  },
  userItem: {
    flexDirection: "row", // Alinea el contenido horizontalmente
    alignItems: "center", // Centra verticalmente el contenido
    padding: 15,
    backgroundColor: "#f9f9f9", // Fondo claro para los elementos
    borderRadius: 15, // Bordes redondeados consistentes
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1, // Permite que el nombre ocupe el espacio restante
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
    flex: 1, // Permite que el correo ocupe el espacio restante
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});
