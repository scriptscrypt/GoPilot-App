import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, XAxis, YAxis, Grid } from "recharts";

const EarningsScreen = () => {
  const [timeRange, setTimeRange] = useState("Week");

  const earningsData = [
    { day: <Text>Mo</Text>, earnings: 1500 },
    { day: <Text>Mo</Text>, earnings: 2000 },
    { day: <Text>Mo</Text>, earnings: 800 },
    // { day: "Th", earnings: 1700 },
    // { day: "Fr", earnings: 2100 },
    // { day: "Sa", earnings: 900 },
    // { day: "Su", earnings: 1600 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Earnings</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.dateRange}>Jun 19 - Jun 25</Text>
          <View style={styles.earningsRow}>
            <Text style={styles.earningsAmount}>₹ 21,44,988</Text>
            <Text style={styles.tokenAmount}>40 $NMT</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Rides completed</Text>
              <Text style={styles.statValue}>123</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Online</Text>
              <Text style={styles.statValue}>23h 39m</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.timeRangeSelector}>
            {["Day", "Week", "Month"].map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeRangeButton,
                  timeRange === range && styles.activeTimeRange,
                ]}
                onPress={() => setTimeRange(range)}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    timeRange === range && styles.activeTimeRangeText,
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.chart}>
            <BarChart
              title={"Total Earnings"}
              data={earningsData}
              width={300}
              height={200}
              // yAxisLabel={<Text>Earnings</Text>}
              yAxisLabel={"Earnings"}
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Detail</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentRidesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Rides</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rideCard}>
            <Text style={styles.rideDate}>yesterday</Text>
            <Text style={styles.rideDate}>17/06/2023</Text>
            <View style={styles.rideDetails}>
              <Ionicons name="receipt-outline" size={24} color="#007AFF" />
              <View style={styles.rideInfo}>
                <Text style={styles.rideDestination}>National College</Text>
                <View style={styles.rideAmounts}>
                  <Text style={styles.rideAmount}>₹300</Text>
                  <View style={styles.tokenBadge}>
                    <Text style={styles.tokenBadgeText}>72.64</Text>
                    <Ionicons name="car-outline" size={16} color="#007AFF" />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rideDetails}>
              <Ionicons name="receipt-outline" size={24} color="#007AFF" />
              <View style={styles.rideInfo}>
                <Text style={styles.rideDestination}>Indiranagar</Text>
                <View style={styles.rideAmounts}>
                  <Text style={styles.rideAmount}>₹240</Text>
                  <View style={styles.tokenBadge}>
                    <Text style={styles.tokenBadgeText}>32.16</Text>
                    <Ionicons name="car-outline" size={16} color="#007AFF" />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    backgroundColor: "#007AFF",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  earningsCard: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dateRange: {
    color: "white",
    fontSize: 14,
  },
  earningsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  tokenAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  statItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    color: "white",
    fontSize: 12,
  },
  statValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  timeRangeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    padding: 4,
  },
  timeRangeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeTimeRange: {
    backgroundColor: "white",
  },
  timeRangeText: {
    color: "#666",
  },
  activeTimeRangeText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  chart: {
    alignItems: "center",
    marginTop: 16,
  },
  detailButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 16,
  },
  detailButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  recentRidesSection: {
    margin: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#007AFF",
  },
  rideCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
  },
  rideDate: {
    color: "#666",
    marginBottom: 4,
  },
  rideDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  rideInfo: {
    marginLeft: 12,
    flex: 1,
  },
  rideDestination: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rideAmounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  rideAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tokenBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F2FF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  tokenBadgeText: {
    color: "#007AFF",
    marginRight: 4,
  },
});

export default EarningsScreen;
