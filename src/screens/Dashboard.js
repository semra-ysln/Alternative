import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LayoutGrid, Bell, Plus, Send, AlertTriangle, TrendingDown } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { DASHBOARD_DATA } from '../constants/mockData';

const Dashboard = () => {
    const data = DASHBOARD_DATA;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* 1. Header & Profil */}
            <View style={styles.header}>
                <View style={styles.profileSection}>
                    <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
                    <View>
                        <Text style={styles.welcomeText}>Merhaba, Furkan👋</Text>
                        <Text style={styles.brandText}>LyraBit</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                    <Bell color="#000" size={24} />
                    {/* Security Alert Badge */}
                    {data.securityWarning && <View style={styles.redDot} />}
                </TouchableOpacity>
            </View>

            {/* 2. Cüzdan Kartı (P0) */}
            <View style={styles.mainCard}>
                <Text style={styles.cardLabel}>Ana Cüzdan (TL)</Text>
                <Text style={styles.balance}>
                    {Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(data.wallet.balance)}
                </Text>

                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.actionBtnWhite}>
                        <Plus size={20} color={COLORS.primary} />
                        <Text style={styles.btnTextBlue}>Para Yükle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtnDark}>
                        <Send size={18} color={COLORS.white} />
                        <Text style={styles.btnTextWhite}>Para Gönder</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 3. Smart Insights & Security Banner (LyraBit Farkı ⭐️) */}
            <View style={styles.insightsContainer}>
                <View style={[styles.insightCard, { borderLeftColor: COLORS.success }]}>
                    <TrendingDown size={20} color={COLORS.success} />
                    <Text style={styles.insightText}>{data.insights}</Text>
                </View>

                {data.securityWarning && (
                    <TouchableOpacity style={[styles.insightCard, { borderLeftColor: COLORS.danger, marginTop: 10 }]}>
                        <AlertTriangle size={20} color={COLORS.danger} />
                        <Text style={[styles.insightText, { color: COLORS.danger }]}>{data.securityWarning}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* 4. Son İşlemler (P0) */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Son İşlemler</Text>
                <TouchableOpacity><Text style={styles.seeAll}>Tümünü Gör</Text></TouchableOpacity>
            </View>

            {data.recentTransactions.map((item) => (
                <View key={item.id} style={styles.transactionItem}>
                    <View style={styles.transLeft}>
                        <View style={styles.iconCircle}>
                            {/* Backend'den gelen kategori ismine göre ikon atanacak */}
                            <LayoutGrid size={20} color={COLORS.primary} />
                        </View>
                        <View>
                            <Text style={styles.transTitle}>{item.title}</Text>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.transRight}>
                        <Text style={[styles.transAmount, { color: item.amount > 0 ? COLORS.success : COLORS.textDark }]}>
                            {item.amount > 0 ? `+ ${item.amount}` : item.amount} TL
                        </Text>
                        <Text style={styles.transDate}>{item.date} • {item.status === 'FlaggedForReview' ? 'İnceleniyor' : 'Tamamlandı'}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, alignItems: 'center' },
    profileSection: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
    welcomeText: { color: COLORS.textLight, fontSize: 14 },
    brandText: { color: COLORS.primary, fontSize: 22, fontWeight: 'bold' },
    notificationBtn: { padding: 10, backgroundColor: COLORS.white, borderRadius: 12 },
    redDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, backgroundColor: COLORS.danger, borderRadius: 4, borderWidth: 1, borderColor: COLORS.white },
    mainCard: { backgroundColor: COLORS.primary, borderRadius: 28, padding: 25, marginTop: 25 },
    balance: { color: COLORS.white, fontSize: 32, fontWeight: '800', marginVertical: 12 },
    cardActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
    actionBtnWhite: { backgroundColor: COLORS.white, flexDirection: 'row', padding: 15, borderRadius: 16, flex: 0.48, justifyContent: 'center', alignItems: 'center' },
    actionBtnDark: { backgroundColor: COLORS.secondary, flexDirection: 'row', padding: 15, borderRadius: 16, flex: 0.48, justifyContent: 'center', alignItems: 'center' },
    btnTextBlue: { color: COLORS.primary, fontWeight: '700', marginLeft: 8 },
    btnTextWhite: { color: COLORS.white, fontWeight: '700', marginLeft: 8 },
    insightsContainer: { marginTop: 25 },
    insightCard: { backgroundColor: COLORS.white, padding: 15, borderRadius: 16, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 4 },
    insightText: { marginLeft: 10, fontSize: 13, color: COLORS.textDark, fontWeight: '500' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 15, alignItems: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold' },
    seeAll: { color: COLORS.primary, fontWeight: '600' },
    transactionItem: { backgroundColor: COLORS.white, padding: 15, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    transLeft: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    transTitle: { fontSize: 15, fontWeight: 'bold' },
    categoryBadge: { backgroundColor: '#F0F4FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 4, alignSelf: 'flex-start' },
    categoryText: { fontSize: 10, color: COLORS.primary, fontWeight: '700' },
    transRight: { alignItems: 'flex-end' },
    transAmount: { fontSize: 15, fontWeight: 'bold' },
    transDate: { fontSize: 11, color: COLORS.textLight, marginTop: 4 }
});

export default Dashboard;