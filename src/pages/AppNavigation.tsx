import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./login/index";
import Cadastro from "./cadastro/index";
import Home from "./home/index";
import Tarefas from "./tarefas/index";
import Explorar from "./explorar/index";

// Importação dos novos módulos de expansão do sistema
import Configuracoes from "./configuracoes/index";
import Telemetria from "./telemetria/index";

// Interface de tipagem de rotas (Garante segurança e previne exceções de navegação)
export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Tarefas: undefined;
  Explorar: undefined;
  Configuracoes: undefined;
  // O módulo de Telemetria exige a passagem do ID e Título da tarefa alvo
  Telemetria: { tarefaId: string; tituloTarefa: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tarefas" component={Tarefas} />
        <Stack.Screen name="Explorar" component={Explorar} />
        <Stack.Screen name="Configuracoes" component={Configuracoes} />
        <Stack.Screen name="Telemetria" component={Telemetria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
