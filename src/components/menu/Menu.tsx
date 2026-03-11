import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../pages/AppNavigation";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themes } from "../../global/themes";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={style.menuContainer}>
      <TouchableOpacity
        style={style.menuItem}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons
          name="dashboard"
          size={24}
          color={themes.colors.primary}
        />
        <Text style={style.menuText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.menuItem}
        onPress={() => navigation.navigate("Explorar")}
      >
        <MaterialIcons name="explore" size={24} color={themes.colors.primary} />
        <Text style={style.menuText}>Explorar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.menuItem}
        onPress={() => navigation.navigate("Tarefas")}
      >
        <MaterialIcons
          name="assignment"
          size={24}
          color={themes.colors.primary}
        />
        <Text style={style.menuText}>Demandas</Text>
      </TouchableOpacity>
    </View>
  );
}
