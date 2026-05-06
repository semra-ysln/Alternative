import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Plus, Info, TrendingUp, ChevronLeft } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const AutoRules = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Üst Bar */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={28} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.title}>Otomatik Kurallar</Text>
                <TouchableOpacity style={styles.plusBtn}>
                    <Plus size={20} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Canlı Kurlar (Görseldeki gibi) */}
            <View style={styles.liveRates}>
                <View style={styles.rateCard}>
                    <Text style={styles.rateLabel}>US USD/TRY</Text>
                    <Text style={styles.rate}>40.50 TL</Text>
                    <Text style={[styles.change, { color: COLORS.success }]}>+1.84%</Text>
                </View>
                <View style={styles.rateCard}>
                    <Text style={styles.rateLabel}>EU EUR/TRY</Text>
                    <Text style={styles.rate}>43.20 TL</Text>
                    <Text style={[styles.change, { color: COLORS.success }]}>+0.95%</Text>
                </View>
            </View>

            {/* Grafik Alanı (image_b11c77.png Analizi) */}
            <View style={styles.chartArea}>
                <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>USD/TRY • Son 30 Gün</Text>
                    <View style={styles.legend}><View style={styles.dot} /><Text style={styles.dotText}>Kur - Eşik</Text></View>
                </View>

                {/* Grafik Placeholder - Çizgi Efekti */}
                <View style={styles.lineChart}>
                    <TrendingUp size={100} color={COLORS.primary} opacity={0.2} />
                </View>

                {/* Eşik Çizgisi */}
                <View style={styles.thresholdLine}>
                    <View style={styles.dashedLine} />
                    <View style={styles.thresholdBadge}>
                        <Text style={styles.thresholdText}>40 TL • Üst</Text>
                    </View>
                </View>
            </View>

            {/* Bilgi Kutusu */}
            <View style={styles.infoBox}>
                <View style={styles.infoIconRow}>
                    <Info size={18} color={COLORS.primary} />
                    <Text style={styles.infoTitle}>Kurallar nasıl çalışır?</Text>
                </View>
                <Text style={styles.infoText}>
                    Belirlediğin eşiğe (örn. USD/TRY 40 TL üstüne çıkarsa) ulaşıldığında belirttiğin tutarda otomatik döviz alımı tetiklenir. Yatırım tavsiyesi değil, otomatik takip mekanizmasıdır.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB', paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, marginBottom: 25 },
    title: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark },
    plusBtn: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 12, elevation: 3 },

    liveRates: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    rateCard: { backgroundColor: '#FFF', width: (width - 55) / 2, padding: 15, borderRadius: 20, elevation: 1 },
    rateLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.textLight, marginBottom: 5 },
    rate: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark },
    change: { fontSize: 10, fontWeight: 'bold', marginTop: 4 },

    chartArea: { backgroundColor: '#FFF', padding: 20, borderRadius: 24, marginBottom: 25, elevation: 1 },
    chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    chartTitle: { fontSize: 14, fontWeight: 'bold' },
    legend: { flexDirection: 'row', alignItems: 'center' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginRight: 5 },
    dotText: { fontSize: 10, color: COLORS.textLight },
    lineChart: { height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FE', borderRadius: 16 },

    thresholdLine: { flexDirection: 'row', alignItems: 'center', marginTop: -40, marginBottom: 40 },
    dashedLine: { flex: 1, height: 1, borderWidth: 1, borderColor: COLORS.success, borderStyle: 'dashed', borderRadius: 1 },
    thresholdBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginLeft: 10 },
    thresholdText: { fontSize: 11, color: '#2E7D32', fontWeight: 'bold' },

    infoBox: { backgroundColor: '#F0F4FF', padding: 20, borderRadius: 24, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
    infoIconRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    infoTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary, marginLeft: 10 },
    infoText: { fontSize: 12, color: '#475569', lineHeight: 18 }
});

// BU SATIR HATA ALMANI ENGELLER
export default AutoRules;