import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Lightbulb, Droplets, Flame, Smartphone, ChevronRight, Zap, Wifi, Tv, Car } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BillsScreen = () => {
    const navigation = useNavigation();

    // Görseldeki (image_b201ee.png) özet verileri
    const summaries = [
        { id: '1', label: 'BEKLEYEN', amount: '1.318,80 TL', sub: '3 fatura bekliyor', color: '#FFFBEB' },
        { id: '2', label: 'BU AY ÖDENEN', amount: '623,90 TL', sub: '3 fatura ödendi', color: '#FFF' },
        { id: '3', label: 'OTOMATİK', amount: '2', sub: 'Aktif sözleşme', color: '#FFF' },
    ];

    const bills = [
        { id: 'b1', provider: 'BEDAŞ', date: '2026-05-12', amount: '487,50 TL', icon: 'lightbulb', color: '#FEF3C7' },
        { id: 'b2', provider: 'İSKİ', date: '2026-05-15', amount: '142,30 TL', icon: 'droplets', color: '#E0F2FE' },
        { id: 'b3', provider: 'İGDAŞ', date: '2026-05-20', amount: '689,00 TL', icon: 'flame', color: '#FFEDD5' },
    ];

    const getIcon = (name) => {
        const props = { size: 24, color: COLORS.primary };
        switch (name) {
            case 'lightbulb': return <Lightbulb {...props} color="#D97706" />;
            case 'droplets': return <Droplets {...props} color="#0284C7" />;
            case 'flame': return <Flame {...props} color="#EA580C" />;
            default: return <Zap {...props} />;
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Ödemeler</Text>
                <Text style={styles.subtitle}>Fatura ve abonelik ödemelerin tek yerde.</Text>
            </View>

            {/* Üst Özet Kartları */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.summaryContainer}>
                {summaries.map(item => (
                    <View key={item.id} style={[styles.summaryCard, { backgroundColor: item.color }]}>
                        <Text style={styles.summaryLabel}>{item.label}</Text>
                        <Text style={styles.summaryAmount}>{item.amount}</Text>
                        <Text style={styles.summarySub}>{item.sub}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Hızlı Ödeme Kategorileri */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Hızlı Ödeme</Text>
                {/* BillsScreen.js içindeki Grid bölümünü bu şekilde güncelle: */}
                <View style={styles.grid}>
                    {[
                        { n: 'BEDAŞ', i: 'lightbulb', c: '#FEF3C7', amt: '487,50' },
                        { n: 'İSKİ', i: 'droplets', c: '#E0F2FE', amt: '142,30' },
                        { n: 'İGDAŞ', i: 'flame', c: '#FFEDD5', amt: '689,00' },
                        { n: 'Turkcell', i: 'smartphone', c: '#DBEAFE', amt: '125,00' },
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.gridItem}
                            onPress={() => navigation.navigate('Transfer', {
                                mode: 'BILL',
                                receiver: item.n,
                                amount: item.amt,
                                icon: item.i
                            })}
                        >
                            <View style={[styles.iconBox, { backgroundColor: item.c }]}>
                                {/* getIcon fonksiyonunu burada kullanıyoruz */}
                                {getIcon(item.i)}
                            </View>
                            <Text style={styles.gridText}>{item.n}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Faturalarım Listesi */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Faturalarım</Text>
                {bills.map(bill => (
                    <View key={bill.id} style={styles.billCard}>
                        <View style={styles.billLeft}>
                            <View style={[styles.billIcon, { backgroundColor: bill.color }]}>
                                {getIcon(bill.icon)}
                            </View>
                            <View>
                                <Text style={styles.provider}>{bill.provider}</Text>
                                <Text style={styles.date}>Son: {bill.date}</Text>
                            </View>
                        </View>
                        <View style={styles.billRight}>
                            <Text style={styles.amount}>{bill.amount}</Text>
                            <TouchableOpacity
                                style={styles.payBtn}
                                onPress={() => navigation.navigate('Transfer', {
                                    mode: 'BILL',
                                    receiver: bill.provider,
                                    amount: bill.amount.split(' ')[0],
                                    icon: bill.icon
                                })}
                            >
                                <Text style={styles.payBtnText}>Öde</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB' },
    header: { padding: 25, marginTop: 40 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1E293B' },
    subtitle: { fontSize: 13, color: '#64748B', marginTop: 5 },
    summaryContainer: { paddingLeft: 25, marginBottom: 25 },
    summaryCard: { width: 150, padding: 20, borderRadius: 24, marginRight: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    summaryLabel: { fontSize: 10, fontWeight: 'bold', color: '#92400E' },
    summaryAmount: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
    summarySub: { fontSize: 10, color: '#64748B' },
    section: { paddingHorizontal: 25, marginBottom: 25 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    grid: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 20, borderRadius: 24 },
    gridItem: { alignItems: 'center', width: '22%' },
    iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    gridText: { fontSize: 11, fontWeight: '600', color: '#1E293B' },
    billCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    billLeft: { flexDirection: 'row', alignItems: 'center' },
    billIcon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    provider: { fontSize: 15, fontWeight: 'bold' },
    date: { fontSize: 11, color: '#64748B', marginTop: 2 },
    billRight: { alignItems: 'flex-end' },
    amount: { fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
    payBtn: { backgroundColor: '#1A5CFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
    payBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 }
});

export default BillsScreen;