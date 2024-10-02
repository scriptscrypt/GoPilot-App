import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons
import Topbar from "@/components/Topbar";
import MapLayout from "@/components/MapLayout";
import { Reclaim } from "@reclaimprotocol/reactnative-sdk";
import {
  APP_DEEP_LINK,
  RECLAIM_APP_ID,
  RECLAIM_APP_SECRET,
  RECLAIM_PROVIDER_ID,
} from "@/constants/keys";
import { Colors } from "@/constants/Colors";
import VideoUploadComp from "@/components/VideoUploadComp";
import '../shim.mjs';

const Index = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState("");

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
    setCurrentStep(1);
    setVideoUploaded(false);
    setAdditionalDetails("");
  };

  const handleUploadVideo = () => {
    // Implement video upload logic here
    console.log("Video upload logic goes here");
    setVideoUploaded(true);
  };

  const handleNext = () => {
    if (currentStep === 1 && videoUploaded) {
      setCurrentStep(2);
    } else if (currentStep === 2 && additionalDetails.trim() !== "") {
      // Handle form submission
      console.log("Form submitted:", { videoUploaded, additionalDetails });
      toggleBottomSheet();
    }
  };

  const renderBottomSheetContent = () => {
    if (currentStep === 1) {
      return (
        // <View style={styles.bottomSheetContent}>
        //   <Text style={styles.bottomSheetTitle}>Upload a Video</Text>
        //   <Button title="Upload Video" onPress={handleUploadVideo} />
        //   {videoUploaded && <Text style={styles.successText}>Video uploaded successfully!</Text>}
        // </View>
        <VideoUploadComp />
      );
    } else {
      return (
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Additional Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter additional details"
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
            multiline
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Topbar balance={111111} />
      <MapLayout />

      <ReclaimSDK />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleBottomSheet}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetVisible}
        onRequestClose={toggleBottomSheet}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            {renderBottomSheetContent()}
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={toggleBottomSheet} />
              <Button
                title={currentStep === 1 ? "Next" : "Submit"}
                onPress={handleNext}
                disabled={currentStep === 1 ? !videoUploaded : additionalDetails.trim() === ""}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const ReclaimSDK = (): any => {
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

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: Colors.brand.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default Index;