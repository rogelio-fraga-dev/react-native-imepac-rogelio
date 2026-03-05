import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login/index";
import Cadastro from "./cadastro/index";
import Home from "./home/index.tsx";
export type RootStackParamList = {
  // Exportando o tipo conforme orientação [cite: 804]
  Login: undefined;
  Cadastro: undefined;
  Home: undefined; // Adicionando a rota Home
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
