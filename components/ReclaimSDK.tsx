import { Colors } from "@/constants/Colors";
import {
  APP_DEEP_LINK,
  RECLAIM_APP_ID,
  RECLAIM_APP_SECRET,
  RECLAIM_PROVIDER_ID,
} from "@/constants/keys";
import { Reclaim } from "@reclaimprotocol/reactnative-sdk";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const ReclaimSDK = (): any => {
  const reclaimClient = new Reclaim.ProofRequest(RECLAIM_APP_ID);

  async function startVerificationFlow() {
    reclaimClient.setAppCallbackUrl(APP_DEEP_LINK);

    await reclaimClient.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );

    // await reclaimClient.buildProofRequest(RECLAIM_PROVIDER_ID);
    await reclaimClient.buildProofRequest(
      RECLAIM_PROVIDER_ID,
      false,
      "V2Linking"
    );
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
    <>
      <TouchableOpacity
        onPress={startVerificationFlow}
        style={styles.iconContainer}
      >
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Start Uber Verification</Text>
        </View>
      </TouchableOpacity>
    </>
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
    // width: 40,
    height: "100%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    // backgroundColor: Colors.brand.primary,
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
