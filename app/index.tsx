import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Button,
} from "react-native";
import React from "react";
import Topbar from "@/components/Topbar";
import MapLayout from "@/components/MapLayout";
import {
  BuildType,
  OktoProvider,
  useOkto,
  type OktoContextType,
} from "okto-sdk-react-native";

const index = () => {
  // const { showWidgetSheet, closeBottomSheet } = useOkto() as OktoContextType;

  // const openSheet = () => {
  //   showWidgetSheet();
  // };
  return (
    <View>
      <Topbar balance={0} />
      {/* <Pressable>
        <Button onPress={openSheet} title="Login" />
      </Pressable> */}
      <MapLayout />
      <Text>index</Text>
      <ReclaimSDK />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});

import { Reclaim } from "@reclaimprotocol/reactnative-sdk";
import {
  APP_DEEP_LINK,
  RECLAIM_APP_ID,
  RECLAIM_APP_SECRET,
  RECLAIM_PROVIDER_ID,
} from "@/constants/keys";
export const ReclaimSDK = () => {
  const reclaimClient = new Reclaim.ProofRequest(RECLAIM_APP_ID);

  async function startVerificationFlow() {
    reclaimClient.setAppCallbackUrl(APP_DEEP_LINK);

    await reclaimClient.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );

    await reclaimClient.buildProofRequest(RECLAIM_PROVIDER_ID);

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(
        RECLAIM_APP_SECRET //TODO : replace with your RECLAIM_APP_SECRET
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
      <View style={{ padding: 16 }}>
        <Pressable onPress={startVerificationFlow}>
          <Button title="Fetch Uber details" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
