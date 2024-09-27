import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";
import React from "react";
import Topbar from "@/components/Topbar";
import MapLayout from "@/components/MapLayout";

const index = () => {
  return (
    <View>
      <Topbar balance={0} />
      <MapLayout />
      <Text>index</Text>
      <ReclaimSDK />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

import { Reclaim } from "@reclaimprotocol/reactnative-sdk";
export const ReclaimSDK = () => {
  const APP_ID = "0xd620F4BE441bACA3bDCB5c02c1cA741da62D447c";
  const APP_SECRET = "0xd620F4BE441bACA3bDCB5c02c1cA741da62D447c";
  const reclaimClient = new Reclaim.ProofRequest(APP_ID);

  async function startVerificationFlow() {
    const providerId = "9536778f-25f8-4d3b-b86f-b3d82187a999"; //TODO: replace with your provider id you had selected while creating the application

    const appDeepLink = "YOUR_APP_DEEP_LINK_HERE"; //TODO: replace with your app deep link
    reclaimClient.setAppCallbackUrl(appDeepLink);

    await reclaimClient.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );

    await reclaimClient.buildProofRequest(providerId);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(
        APP_SECRET //TODO : replace with your APP_SECRET
      )
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    await reclaimClient.startSession({
      onSuccessCallback: (proof) => {
        console.log("Verification success", proof);
        // Your business logic here
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        // Your business logic here to handle the error
      },
    });
  }

  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={startVerificationFlow}>
          <Text>Start Verification Flow</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
