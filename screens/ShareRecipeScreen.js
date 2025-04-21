import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import appFirebase from "../credenciales.js";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function ShareRecipeScreen({ route, navigation }) {
  const { recipeId } = route.params || {}; // Obtén el ID de la receta desde los parámetros de navegación
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { name, email, uid } = doc.data();
          // Excluir al usuario actual de la lista
          if (uid !== auth.currentUser.uid) {
            docs.push({ id: doc.id, name, email, uid });
          }
        });
        setUsers(docs);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const shareRecipeWithUser = async (recipientUid) => {
    try {
      await addDoc(collection(db, "sharedRecipes"), {
        recipeId,
        senderUid: auth.currentUser.uid,
        recipientUid,
        sharedAt: new Date(),
      });
      Alert.alert("Éxito", "Receta compartida con éxito");
      navigation.goBack(); // Regresa a la pantalla anterior
    } catch (error) {
      console.error("Error al compartir la receta:", error);
      Alert.alert("Error", "No se pudo compartir la receta");
    }
  };

  // Mueve la validación de `recipeId` aquí
  if (!recipeId) {
    Alert.alert("Error", "No se pudo obtener el ID de la receta");
    navigation.goBack(); // Regresa a la pantalla anterior
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un usuario para compartir</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => shareRecipeWithUser(item.uid)}
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
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  userItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
});
