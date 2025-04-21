import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import appFirebase from "../credenciales.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import HomeScreenView from "../components/HomeScreenView";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function HomeScreen(props) {
  const [recipes, setRecipes] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "Usuario");
    }

    const getRecipes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Error", "No se pudo identificar al usuario");
          return;
        }

        const recipesQuery = query(
          collection(db, "recipes"),
          where("uid", "==", user.uid)
        );

        const querySnapshot = await getDocs(recipesQuery);
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { title, ingredients, instructions, creator, creationDate } =
            doc.data();
          docs.push({
            id: doc.id,
            title,
            ingredients,
            instructions,
            creator,
            creationDate:
              creationDate?.toDate().toLocaleString() || "Sin fecha",
          });
        });
        setRecipes(docs);
      } catch (error) {
        console.error(error);
      }
    };

    const getSharedRecipes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const sharedQuery = query(
          collection(db, "sharedRecipes"),
          where("recipientUid", "==", user.uid)
        );

        const sharedSnapshot = await getDocs(sharedQuery);
        const sharedRecipeIds = sharedSnapshot.docs.map(
          (doc) => doc.data().recipeId
        );

        if (sharedRecipeIds.length > 0) {
          const recipesQuery = query(
            collection(db, "recipes"),
            where("__name__", "in", sharedRecipeIds)
          );

          const recipesSnapshot = await getDocs(recipesQuery);
          const sharedDocs = recipesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setSharedRecipes(sharedDocs);
        }
      } catch (error) {
        console.error("Error al obtener recetas compartidas:", error);
      }
    };

    getRecipes();
    getSharedRecipes();
  }, []);

  return (
    <HomeScreenView
      userName={userName}
      recipes={recipes}
      sharedRecipes={sharedRecipes}
      navigation={props.navigation}
    />
  );
}
