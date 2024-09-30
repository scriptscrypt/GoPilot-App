import React, { useCallback, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Topbar from "@/components/Topbar";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { BuildType, OktoProvider } from "okto-sdk-react-native";
import { OKTO_CLIENT_API } from "@/constants/keys";
import { BlurView } from "expo-blur";
import { DrawerActions } from '@react-navigation/native';

export default function Layout() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const navigation = useNavigation();
  const drawerRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const insets = useSafeAreaInsets();

  const handleNewProposal = () => {
    setShouldOpenModal(true);
    // @ts-ignore: Expo Router's types might not be up to date
    // navigation.closeDrawer();
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  useFocusEffect(
    useCallback(() => {
      if (shouldOpenModal) {
        setModalVisible(true);
        setShouldOpenModal(false);
      }
    }, [shouldOpenModal])
  );
  const CustomDrawerContent = (props: any) => {
    return (
      <>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ paddingTop: 0 }}
        >
          <View style={[styles.drawerHeader, { paddingTop: 16 + insets.top }]}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userText}>Ramesha</Text>
            <Text style={styles.userIdText}>39G....ozcNj</Text>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <TouchableOpacity
          style={[
            styles.newProposalButton,
            { marginBottom: 16 + insets.bottom },
          ]}
          onPress={handleNewProposal}
        >
          <Text style={styles.buttonText}>New Proposal</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {/* <OktoProvider apiKey={OKTO_CLIENT_API} buildType={BuildType.SANDBOX}> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: "#e6e6e6",
            drawerActiveTintColor: "#000",
            drawerInactiveTintColor: "#333",
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Recent Rides",
              title: "Recent Rides",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="time-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="earningsScreen"
            options={{
              drawerLabel: "Earnings",
              title: "Earnings",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="star-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="notificationsScreen"
            options={{
              drawerLabel: "Notifications",
              title: "Notifications",
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="notifications-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="newVotesScreen"
            options={{
              drawerLabel: "Vote",
              title: "Vote",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="checkbox-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="stakeScreen"
            options={{
              drawerLabel: "Stake $NMT",
              title: "Stake $NMT",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="cash-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="accountSettingsScreen"
            options={{
              drawerLabel: "Account Settings",
              title: "Account Settings",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="helpFeedbackScreen"
            options={{
              drawerLabel: "Help & feedback",
              title: "Help & feedback",
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="help-circle-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Drawer>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <BlurView intensity={10} style={StyleSheet.absoluteFill}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeIconButton}
                onPress={toggleModal}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalText}>New Proposal</Text>
              
            </View>
          </BlurView>
        </Modal>
      </GestureHandlerRootView>
      {/* </OktoProvider> */}
    </View>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  welcomeText: {
    fontSize: 14,
    color: "#888",
  },
  userText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  userIdText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  newProposalButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    margin: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeIconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
});
