import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PieChart, BarChart } from "react-native-chart-kit";
import { COLORS } from '../constants/theme';

const screenWidth = Dimensions.get("window").width;

const AIInsights = () => {
    const pieData = [
        { name: "Yemek", population: 4500, color: "#1A5CFF", legendFontColor: "#7F7F7F" },
        { name: "Abonelik", population: 280, color: "#F2C94C", legendFontColor: "#7F7F7F" },
        { name: "Ulaşım", population: 1200, color: "#27AE60", legendFontColor: "#7F7F7F" },
        { name: "Kira", population: 15000, color: "#EB5757", legendFontColor: "#7F7F7F" },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>AI Analiz & Bütçe</Text>

            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Kategori Bazlı Dağılım</Text>
                <PieChart
                    data={pieData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />
            </View>

            <View style={styles.subscriptionCard}>
                <Text style={styles.subTitle}>Abonelik Takibi</Text>
                <Text style={styles.subAmount}>Aylık gideriniz: 274 TL</Text>
                <Text style={styles.subList}>Spotify, Netflix ve iCloud tespit edildi.</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
    chartCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 15, marginBottom: 20 },
    chartTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginLeft: 10 },
    subscriptionCard: { backgroundColor: COLORS.secondary, padding: 20, borderRadius: 24 },
    subTitle: { color: '#FFF', fontSize: 14, opacity: 0.8 },
    subAmount: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
    subList: { color: '#FFF', fontSize: 12, opacity: 0.7 }
});

export default AIInsights;