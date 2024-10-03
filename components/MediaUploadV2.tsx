import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ImageKit from "imagekit-javascript";
import { apiUploadBase64ImageKit } from "@/services/imageKit";

const MediaUploadV2: React.FC = () => {
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (mediaUri) {
      setIsUploading(true);
      try {
        const base64Media = await FileSystem.readAsStringAsync(mediaUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log(base64Media);
        // send this to backend
        const result = await apiUploadBase64ImageKit(base64Media, "testFile");
        console.log(result?.url);
        setMediaUri(result?.url || "");
        setTitle("");
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    } else {
      alert("Please select a media file first.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick media from device" onPress={pickMedia} />
      {mediaUri && <Text style={styles.mediaSelected}>Media selected</Text>}
      <TextInput
        style={styles.input}
        placeholder="Enter title for your media"
        value={title}
        onChangeText={setTitle}
      />
      <Button
        title="Upload Media"
        onPress={handleUpload}
        disabled={isUploading || !mediaUri}
      />
      {isUploading && <Text>Uploading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  mediaSelected: {
    marginTop: 10,
    color: "green",
  },
});

export default MediaUploadV2;
