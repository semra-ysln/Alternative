import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LayoutGrid, Sparkles, AlertTriangle, Lightbulb, TrendingDown, Clock } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { DASHBOARD_DATA } from '../constants/mockData';

const { width } = Dimensions.get('window');

const AIInsights = () => {
    const [activeTab, setActiveTab] = useState('budget');
    const data = DASHBOARD_DATA;

    // Kategori Grafiği için Bar Render (image_b17d96.png)
    const renderCategoryBar = (item) => {
        const percentage = Math.min((item.spent / item.limit) * 100, 100);
        return (
            <View style={styles.categoryRow} key={item.name}>
                <View style={styles.categoryHeader}>
                    <View style={styles.labelRow}>
                        <Text style={styles.categoryName}>{item.name}</Text>
                        {item.spent > item.limit && <Text style={styles.overBudgetLabel}>BÜTÇE AŞILDI</Text>}
                    </View>
                    <Text style={styles.categoryValue}>{item.spent.toLocaleString()} TL</Text>
                </View>
                <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: item.color }]} />
                </View>
            </View>
        );
    };

    // Aylık Trend Grafiği (image_b17d96.png - Son 6 Ay)
    const renderTrendChart = () => {
        const months = ['Ara', 'Oca', 'Şub', 'Mar', 'Nis', 'May'];
        const values = [40, 55, 45, 60, 30, 85]; // Mock trend verileri

        return (
            <View style={styles.trendContainer}>
                {months.map((month, i) => (
                    <View key={month} style={styles.trendColumn}>
                        <View style={styles.trendBarBg}>
                            <View style={[styles.trendBarFill, { height: `${values[i]}%`, backgroundColor: i === 5 ? COLORS.primary : '#E2E8F0' }]} />
                        </View>
                        <Text style={styles.trendLabel}>{month}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const BudgetView = () => (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Mavi Bütçe Paneli */}
            <View style={styles.blueCard}>
                <View style={styles.blueHeader}>
                    <View><Text style={styles.blueLabel}>AYLIK BÜTÇE</Text><Text style={styles.bluePrice}>15.000 TL</Text></View>
                    <View style={{ alignItems: 'flex-end' }}><Text style={styles.blueLabel}>KALAN</Text><Text style={styles.bluePrice}>2.836 TL</Text></View>
                </View>
                <View style={styles.mainProgressBg}><View style={[styles.mainProgressFill, { width: '81%' }]} /></View>
                <Text style={styles.blueFooter}>19 gün için günlük güvenli: 149 TL</Text>
            </View>

            {/* Kategori Limitleri */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Kategori Limitleri</Text>
                {data.categoryLimits.map(renderCategoryBar)}
            </View>
        </ScrollView>
    );

    const InsightsView = () => (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Analiz Özet Kartları */}
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statTitle}>BU AY TOPLAM</Text>
                    <Text style={styles.statValue}>11.684 TL</Text>
                    <Text style={styles.statSub}>Bütçenin %97'si</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statTitle}>TASARRUF HEDEFİ</Text>
                    <Text style={styles.statValue}>5.000 TL</Text>
                    <Text style={[styles.statSub, { color: COLORS.primary }]}>%64 biriktirildi</Text>
                </View>
            </View>

            {/* Harcama Trendi Grafiği */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Son 6 Ay Harcama Trendi</Text>
                {renderTrendChart()}
            </View>

            {/* Senin İçin Notlar (image_b17d96.png) */}
            <Text style={styles.cardTitle}>Senin İçin Notlar</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                <View style={[styles.noteCard, { backgroundColor: '#FFFBEB' }]}>
                    <AlertTriangle size={20} color="#D97706" />
                    <Text style={styles.noteTitle}>Yemek bütçeni aşıyorsun</Text>
                    <Text style={styles.noteText}>Dışarıda harcaman 750 TL üzerinde. Evde yemek yaparak tasarruf edebilirsin.</Text>
                </View>
                <View style={[styles.noteCard, { backgroundColor: '#F0F7FF' }]}>
                    <Lightbulb size={20} color="#007AFF" />
                    <Text style={[styles.noteTitle, { color: '#007AFF' }]}>Abonelik Analizi</Text>
                    <Text style={styles.noteText}>Spotify ve Netflix toplam 319,80 TL/ay. Yıllık plana geçmek %20 kazandırır.</Text>
                </View>
            </ScrollView>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <Text style={styles.mainTitle}>Finansal Analiz</Text>
                <View style={styles.segmentedControl}>
                    <TouchableOpacity onPress={() => setActiveTab('budget')} style={[styles.segBtn, activeTab === 'budget' && styles.segBtnActive]}>
                        <Text style={[styles.segText, activeTab === 'budget' && styles.segTextActive]}>Bütçe</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('insights')} style={[styles.segBtn, activeTab === 'insights' && styles.segBtnActive]}>
                        <Text style={[styles.segText, activeTab === 'insights' && styles.segTextActive]}>Analiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {activeTab === 'budget' ? <BudgetView /> : <InsightsView />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB' },
    topHeader: { paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#FFF', paddingBottom: 20 },
    mainTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
    segmentedControl: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4 },
    segBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
    segBtnActive: { backgroundColor: '#FFF', elevation: 2 },
    segText: { fontWeight: '600', color: '#64748B' },
    segTextActive: { color: COLORS.primary },
    content: { padding: 20 },
    blueCard: { backgroundColor: COLORS.primary, borderRadius: 24, padding: 20, marginBottom: 20 },
    blueHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    blueLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 'bold' },
    bluePrice: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 5 },
    mainProgressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginVertical: 15 },
    mainProgressFill: { height: '100%', backgroundColor: '#FFF', borderRadius: 4 },
    blueFooter: { color: '#FFF', fontSize: 11, textAlign: 'center', opacity: 0.9 },
    card: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20, elevation: 1 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
    categoryRow: { marginBottom: 18 },
    categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    labelRow: { flexDirection: 'row', alignItems: 'center' },
    categoryName: { fontSize: 14, fontWeight: '600' },
    overBudgetLabel: { fontSize: 9, color: '#D97706', fontWeight: 'bold', marginLeft: 10, backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    categoryValue: { fontSize: 14, fontWeight: 'bold' },
    barBg: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3 },
    barFill: { height: '100%', borderRadius: 3 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    statBox: { width: (width - 55) / 2, backgroundColor: '#FFF', padding: 15, borderRadius: 20 },
    statTitle: { fontSize: 10, color: '#64748B', fontWeight: 'bold' },
    statValue: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
    statSub: { fontSize: 10, color: '#64748B' },
    trendContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120, paddingTop: 10 },
    trendColumn: { alignItems: 'center', width: (width - 100) / 6 },
    trendBarBg: { height: 80, width: 12, backgroundColor: '#F1F5F9', borderRadius: 6, justifyContent: 'flex-end' },
    trendBarFill: { width: '100%', borderRadius: 6 },
    trendLabel: { fontSize: 10, color: '#64748B', marginTop: 8 },
    noteCard: { width: 260, padding: 20, borderRadius: 24, marginRight: 15 },
    noteTitle: { fontSize: 15, fontWeight: 'bold', marginVertical: 8, color: '#D97706' },
    noteText: { fontSize: 12, color: '#1E293B', lineHeight: 18 }
});

export default AIInsights;