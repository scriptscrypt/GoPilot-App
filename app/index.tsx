import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Topbar from "@/components/Topbar";
import MapLayout from "@/components/MapLayout";

const index = () => {
  return (
    <View>
      <Topbar balance={0} />
      <MapLayout />
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
