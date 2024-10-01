import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

interface TopbarProps {
  balance: number;
}

const Topbar: React.FC<TopbarProps> = ({ balance }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const openDrawer = () => {
    // @ts-ignore: Expo Router's types might not be up to date
    navigation.openDrawer();
  };

  return (

    <View style={[styles.container]}>
      <TouchableOpacity onPress={openDrawer} style={styles.iconContainer}>
        <Ionicons name="menu-outline" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{balance} $GO</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.brand.primary,
  },
  balanceContainer: {
    backgroundColor: Colors.brand.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  balanceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Topbar;
