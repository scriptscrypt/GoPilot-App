import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={openDrawer} style={styles.iconContainer}>
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{balance} $NMT</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  balanceContainer: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Topbar;
