import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from 'expo-av';
import { Colors } from "@/constants/Colors";

const VoteScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Live");
  const [videoError, setVideoError] = useState(null);

  const handleVideoError = (error: any) => {
    console.error("Video Error:", error);
    setVideoError(error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vote for the Future</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {["Live", "Upcoming", "Completed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === "Live" && (
        <View style={styles.proposalCard}>
          <View style={styles.dateContainer}>
            <Ionicons name="time-outline" size={18} color="#666" />
            <Text style={styles.dateText}>27/09/2024 - 04/09/2024</Text>
            <View style={styles.liveTag}>
              <Text style={styles.liveTagText}>Live</Text>
            </View>
          </View>

          <Text style={styles.proposalTitle}>
            Introduce Driver Levels with Perks
          </Text>

          <View style={styles.videoContainer}>
            <Video
              source={{ uri: 'https://ik.imagekit.io/quackmagic/nimmatoken/Driver.mp4?updatedAt=1728123124536' }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onError={handleVideoError}
            />
            {videoError && (
              <Text style={styles.errorText}>Error loading video: {videoError}</Text>
            )}
          </View>

          <Text style={styles.questionText}>Do you agree?</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.voteButton}>
              <Text style={styles.voteButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.voteButton, styles.noButton]}>
              <Text style={styles.voteButtonText}>No</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultsContainer}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Yes Votes</Text>
              <Text style={styles.resultLabel}>No Votes</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultValue}>1,111,111</Text>
              <Text style={styles.resultValue}>222</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultPercentage}>99.0%</Text>
              <Text style={styles.resultPercentage}>1.0%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "99%" }]} />
            </View>
          </View>

          <View style={styles.quorumContainer}>
            <Text style={styles.quorumTitle}>Approval Quorum</Text>
            <Text style={styles.quorumText}>
              1,111,111 more YES votes required
            </Text>
            <View style={styles.quorumProgressBar}>
              <View style={[styles.quorumProgressFill, { width: "50%" }]} />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.brand.primary,
  },
  tabText: {
    color: "#666",
  },
  activeTabText: {
    color: Colors.brand.primary,
    fontWeight: "bold",
  },
  proposalCard: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 8,
    color: "#666",
  },
  liveTag: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  liveTagText: {
    color: "white",
    fontSize: 12,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  proposalDescription: {
    color: "#666",
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  voteButton: {
    width: "48%",
    backgroundColor: Colors.brand.primary,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noButton: {
    width: "48%",
    backgroundColor: Colors.brand.primary,
  },
  voteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  resultsContainer: {
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  resultLabel: {
    color: "#666",
  },
  resultValue: {
    fontWeight: "bold",
  },
  resultPercentage: {
    color: "#666",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.brand.primary,
  },
  quorumContainer: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
  },
  quorumTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  quorumText: {
    color: "#666",
    marginBottom: 8,
  },
  quorumProgressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  quorumProgressFill: {
    height: "100%",
    backgroundColor: Colors.brand.primary,
  },
  video: {
    width: '100%',
    height: "80%",
    marginBottom: 16,
  },

  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',  // Light grey background to see the container
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },

});

export default VoteScreen;
