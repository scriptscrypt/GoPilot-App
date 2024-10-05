import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SolanaGovernanceComponent from "@/components/Governance";

const governance = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Governance</Text> */}
      <SolanaGovernanceComponent />
    </View>
  );
};

export default governance;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
