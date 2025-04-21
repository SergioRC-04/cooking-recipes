import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import CreateRecipeScreen from "./screens/CreateRecipeScreen";
import SearchScreen from "./screens/SearchScreen";
import ShareRecipeScreen from "./screens/ShareRecipeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="CreateRecipe" component={CreateRecipeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ShareRecipe" component={ShareRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
