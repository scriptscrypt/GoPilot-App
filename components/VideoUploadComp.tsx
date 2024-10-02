import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import ImageKit from 'imagekit-javascript';
// Note: You should move this to a secure server-side implementation
const imagekit = new ImageKit({
  publicKey: "your_public_key",
  urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
  // authenticationEndpoint: "http://www.yourserver.com/auth",
});

const InstagramLikeVideoUpload: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>();
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [additionalText, setAdditionalText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const cameraRef = useRef<typeof Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleRecordVideo = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      try {
        console.log("cameraRef?.current");
        console.log(cameraRef?.current);
        const video = await cameraRef?.current?.recordAsync();
        setVideoUri(video.uri);
        setCurrentStep(2);
      } catch (error) {
        console.error("Error recording video:", error);
      } finally {
        setIsRecording(false);
      }
    }
  };

  const handleStopRecording = () => {
    if (cameraRef.current) {
      setIsRecording(false);
      cameraRef?.current?.stopRecording();
    }
  };

  const handleUploadVideo = async () => {
    if (videoUri) {
      setIsUploading(true);
      try {
        const manipulatedVideo = await ImageManipulator.manipulateAsync(
          videoUri,
          [],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        
        const base64Video = await FileSystem.readAsStringAsync(manipulatedVideo.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Note: This is a simplified example. In a real app, you should implement
        // server-side authentication and upload directly to ImageKit from the client.
        const uploadResponse = await imagekit.upload({
          file: base64Video,
          fileName: "video.mp4",
          tags: ["video", "upload"],
          useUniqueFileName: true,
          // Add these properties to satisfy the UploadOptions type
          signature: "your_signature",
          token: "your_token",
          expire: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
        });

        console.log("Upload successful:", uploadResponse);
        setCurrentStep(3);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const renderBottomSheetContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Record a Video</Text>
            {hasPermission === null ? (
              <Text>Requesting camera permission...</Text>
            ) : hasPermission === false ? (
              <Text>No access to camera</Text>
            ) : (
              <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                  <Button
                    title={isRecording ? "Stop Recording" : "Start Recording"}
                    onPress={isRecording ? handleStopRecording : handleRecordVideo}
                  />
                </View>
              </Camera>
            )}
          </View>
        );
      case 2:
        return (
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Preview and Add Text</Text>
            {videoUri && (
              <Video
                source={{ uri: videoUri }}
                style={styles.videoPreview}
                useNativeControls
                resizeMode="contain"
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Add text to your video"
              value={additionalText}
              onChangeText={setAdditionalText}
            />
            <Button title="Upload Video" onPress={handleUploadVideo} disabled={isUploading} />
            {isUploading && <Text>Uploading...</Text>}
          </View>
        );
      case 3:
        return (
          <View style={styles.bottomSheetContent}>
            <Text style={styles.bottomSheetTitle}>Upload Complete!</Text>
            <Text>Your video has been uploaded successfully.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderBottomSheetContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  camera: {
    width: '100%',
    height: 300,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  videoPreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default InstagramLikeVideoUpload;