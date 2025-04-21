import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales.js";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import ShareRecipeScreenView from "../components/ShareRecipeScreenView";
import { Alert } from "react-native";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function ShareRecipeScreen({ route, navigation }) {
  const { recipeId } = route.params || {}; // Obtén el ID de la receta desde los parámetros de navegación
  const [users, setUsers] = useState([]);

  // Hook de efecto para cargar la lista de usuarios al montar el componente
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

  // Función para compartir la receta con otro usuario
  const shareRecipeWithUser = async (recipientUid) => {
    try {
      await addDoc(collection(db, "sharedRecipes"), {
        recipeId,
        senderUid: auth.currentUser.uid,
        recipientUid,
        sharedAt: new Date(),
      });
      Alert.alert("Éxito", "Receta compartida con éxito");
      navigation.goBack();
    } catch (error) {
      console.error("Error al compartir la receta:", error);
      Alert.alert("Error", "No se pudo compartir la receta");
    }
  };

  // Verifica si el ID de la receta está disponible
  if (!recipeId) {
    Alert.alert("Error", "No se pudo obtener el ID de la receta");
    navigation.goBack();
    return null;
  }

  return <ShareRecipeScreenView users={users} onShare={shareRecipeWithUser} />;
}
