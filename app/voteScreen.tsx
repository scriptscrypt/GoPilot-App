import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VoteScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Live');

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
        {['Live', 'Upcoming', 'Completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.proposalCard}>
        <View style={styles.dateContainer}>
          <Ionicons name="time-outline" size={18} color="#666" />
          <Text style={styles.dateText}>27/09/2024 - 04/09/2024</Text>
          <View style={styles.liveTag}>
            <Text style={styles.liveTagText}>Live</Text>
          </View>
        </View>

        <Text style={styles.proposalTitle}>Introduce Driver Levels with Perks</Text>
        <Text style={styles.proposalDescription}>
          Create a tiered system for drivers (Bronze, Silver, Gold, Platinum) based on ride
          completions and ratings, with increasing perks at each level.
        </Text>

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
            <View style={[styles.progressFill, { width: '99%' }]} />
          </View>
        </View>

        <View style={styles.quorumContainer}>
          <Text style={styles.quorumTitle}>Approval Quorum</Text>
          <Text style={styles.quorumText}>1,111,111 more YES votes required</Text>
          <View style={styles.quorumProgressBar}>
            <View style={[styles.quorumProgressFill, { width: '50%' }]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  proposalCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    marginLeft: 8,
    color: '#666',
  },
  liveTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  liveTagText: {
    color: 'white',
    fontSize: 12,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  proposalDescription: {
    color: '#666',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  voteButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
  },
  noButton: {
    backgroundColor: '#FF3B30',
  },
  voteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  resultLabel: {
    color: '#666',
  },
  resultValue: {
    fontWeight: 'bold',
  },
  resultPercentage: {
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  quorumContainer: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
  },
  quorumTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quorumText: {
    color: '#666',
    marginBottom: 8,
  },
  quorumProgressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  quorumProgressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
});

export default VoteScreen;