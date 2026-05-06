import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bell, Plus, Send, ShieldCheck, BrainCircuit, Music, Video, Cloud, Zap } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { DASHBOARD_DATA } from '../constants/mockData';
import { useUser } from '../context/UserContext'; // Global state bağlantısı

const { width } = Dimensions.get('window');

const Dashboard = () => {
    const data = DASHBOARD_DATA;
    const navigation = useNavigation();
    const { userName } = useUser(); // Giriş ekranından gelen isim

    // Abonelik İkon Belirleyici
    const getSubIcon = (iconName) => {
        switch (iconName) {
            case 'music': return <Music size={18} color={COLORS.primary} />;
            case 'video': return <Video size={18} color="#E50914" />;
            case 'cloud': return <Cloud size={18} color="#007AFF" />;
            default: return <Zap size={18} color={COLORS.primary} />;
        }
    };

    const renderWalletCard = ({ item }) => (
        <View style={styles.mainCard}>
            <Text style={styles.cardLabel}>{item.label} ({item.currency})</Text>
            <Text style={styles.balance}>
                {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: item.currency
                }).format(item.balance)}
            </Text>

            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={styles.actionBtnWhite}
                    onPress={() => navigation.navigate('Transfer', { mode: 'TOPUP', currency: item.currency })}
                >
                    <Plus size={20} color={COLORS.primary} />
                    <Text style={styles.btnTextBlue}>Para Yükle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionBtnDark}
                    onPress={() => navigation.navigate('Transfer', { mode: 'TRANSFER', currency: item.currency })}
                >
                    <Send size={18} color={COLORS.white} />
                    <Text style={styles.btnTextWhite}>Para Gönder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header - Dinamik İsim Buraya Geliyor */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Merhaba, {userName}👋</Text>
                    <Text style={styles.brandText}>LyraBit</Text>
                </View>
                <TouchableOpacity
                    style={styles.notificationBtn}
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <Bell color="#000" size={24} />
                    {data.securityWarning && <View style={styles.redDot} />}
                </TouchableOpacity>
            </View>

            {/* Cüzdanlar Carousel */}
            <FlatList
                data={data.wallets}
                renderItem={renderWalletCard}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.walletListContent}
            />

            {/* AI Koçu */}
            <TouchableOpacity style={styles.aiCoachCard} onPress={() => navigation.navigate('Insights')}>
                <View style={styles.aiHeader}>
                    <View style={styles.aiIconRow}>
                        <BrainCircuit size={22} color="#FFF" />
                        <Text style={styles.aiTitle}>LyraBit AI Koçu</Text>
                    </View>
                    <View style={styles.fraudBadge}>
                        <Text style={styles.fraudText}>Fraud Koruması Aktif</Text>
                    </View>
                </View>
                <Text style={styles.aiMessage}>"{data.insights}"</Text>
            </TouchableOpacity>

            {/* Bütçe ve Güvenlik Widget'ları */}
            <View style={styles.rowWidgets}>
                <TouchableOpacity style={styles.smallWidget} onPress={() => navigation.navigate('Insights')}>
                    <Text style={styles.widgetLabel}>Aylık Bütçe</Text>
                    <Text style={styles.widgetValue}>{data.budgetSummary.spent.toLocaleString()} ₺</Text>
                    <View style={styles.miniProgressBg}>
                        <View style={[styles.miniProgressFill, { width: `${data.budgetSummary.usagePercentage}%` }]} />
                    </View>
                    <Text style={styles.miniText}>%{data.budgetSummary.usagePercentage} kullanıldı</Text>
                </TouchableOpacity>

                <View style={[styles.smallWidget, { backgroundColor: '#E8F5E9' }]}>
                    <View style={styles.securityHeader}>
                        <ShieldCheck size={18} color="#2E7D32" />
                        <Text style={styles.securityTitle}>Güvenli</Text>
                    </View>
                    <Text style={styles.securityScore}>98</Text>
                    <Text style={styles.miniText}>Güvenlik Skoru</Text>
                </View>
            </View>

            {/* Yaklaşan Abonelikler */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Yaklaşan Abonelikler</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')}>
                    <Text style={styles.seeAllText}>Tümü →</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.subscriptionMiniCard}>
                {data.subscriptions.slice(0, 3).map((sub, index) => (
                    <View key={sub.id} style={[styles.subItem, index !== 0 && { marginTop: 15 }]}>
                        <View style={styles.subLeft}>
                            <View style={styles.subIconBg}>{getSubIcon(sub.icon)}</View>
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.subName}>{sub.name}</Text>
                                <Text style={styles.subDateInfo}>{sub.dateInfo}</Text>
                            </View>
                        </View>
                        <Text style={styles.subPrice}>
                            {typeof sub.price === 'number' ? sub.price.toFixed(2).replace('.', ',') : sub.price} TL
                        </Text>
                    </View>
                ))}
                <View style={styles.subFooter}>
                    <Text style={styles.subFooterText}>{data.subscriptionSummary.period}</Text>
                    <Text style={styles.subTotalText}>{data.subscriptionSummary.total}</Text>
                </View>
            </View>

            {/* Son İşlemler */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Son İşlemler</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
                    <Text style={styles.seeAll}>Tümünü Gör</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.transactionList}>
                {data.recentTransactions.slice(0, 3).map((item) => (
                    <View key={item.id} style={styles.transactionItem}>
                        <View style={styles.transLeft}>
                            <View style={styles.iconCircle}>
                                <Text style={{ fontSize: 20 }}>{item.category === 'restaurant' ? '🍴' : '💸'}</Text>
                            </View>
                            <View>
                                <Text style={styles.transTitle}>{item.title}</Text>
                                <Text style={styles.transDate}>{item.date}</Text>
                            </View>
                        </View>
                        <Text style={[styles.transAmount, { color: item.amount > 0 ? COLORS.success : COLORS.textDark }]}>
                            {item.amount > 0 ? `+${item.amount}` : item.amount} TL
                        </Text>
                    </View>
                ))}
            </View>
            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

// Stiller aynı kalıyor (userName karşılama metni welcomeText stilini kullanıyor)
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, paddingHorizontal: 20, alignItems: 'center', marginBottom: 20 },
    welcomeText: { color: COLORS.textLight, fontSize: 14 },
    brandText: { color: COLORS.primary, fontSize: 24, fontWeight: 'bold' },
    notificationBtn: { padding: 10, backgroundColor: COLORS.white, borderRadius: 12, elevation: 2 },
    redDot: { position: 'absolute', top: 10, right: 10, width: 10, height: 10, backgroundColor: COLORS.danger, borderRadius: 5, borderWidth: 2, borderColor: COLORS.white },
    walletListContent: { paddingHorizontal: 10, paddingBottom: 20 },
    mainCard: { backgroundColor: COLORS.primary, borderRadius: 30, padding: 25, width: width - 40, marginHorizontal: 10, elevation: 10 },
    cardLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
    balance: { color: COLORS.white, fontSize: 34, fontWeight: '800', marginVertical: 15 },
    cardActions: { flexDirection: 'row', justifyContent: 'space-between' },
    actionBtnWhite: { backgroundColor: COLORS.white, flexDirection: 'row', padding: 14, borderRadius: 16, flex: 0.48, justifyContent: 'center', alignItems: 'center' },
    actionBtnDark: { backgroundColor: COLORS.secondary, flexDirection: 'row', padding: 14, borderRadius: 16, flex: 0.48, justifyContent: 'center', alignItems: 'center' },
    btnTextBlue: { color: COLORS.primary, fontWeight: '700', marginLeft: 8 },
    btnTextWhite: { color: COLORS.white, fontWeight: '700', marginLeft: 8 },
    aiCoachCard: { backgroundColor: '#6C5CE7', marginHorizontal: 20, borderRadius: 24, padding: 20, marginBottom: 20 },
    aiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    aiIconRow: { flexDirection: 'row', alignItems: 'center' },
    aiTitle: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 },
    fraudBadge: { backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    fraudText: { color: '#FFF', fontSize: 10, fontWeight: '600' },
    aiMessage: { color: '#FFF', fontSize: 13, lineHeight: 20, opacity: 0.9 },
    rowWidgets: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 25 },
    smallWidget: { backgroundColor: '#FFF', width: (width - 55) / 2, borderRadius: 24, padding: 15, elevation: 3 },
    widgetLabel: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
    widgetValue: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
    miniProgressBg: { height: 6, backgroundColor: '#F0F4FF', borderRadius: 3, overflow: 'hidden' },
    miniProgressFill: { height: '100%', backgroundColor: COLORS.primary },
    miniText: { fontSize: 10, color: COLORS.textLight, marginTop: 6 },
    securityHeader: { flexDirection: 'row', alignItems: 'center' },
    securityTitle: { fontSize: 12, color: '#2E7D32', fontWeight: 'bold', marginLeft: 5 },
    securityScore: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginVertical: 4 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 15, alignItems: 'center' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold' },
    seeAll: { color: COLORS.primary, fontWeight: '600' },
    seeAllText: { color: COLORS.primary, fontWeight: '700' },
    subscriptionMiniCard: { backgroundColor: '#FFF', marginHorizontal: 20, padding: 20, borderRadius: 24, elevation: 2 },
    subItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    subLeft: { flexDirection: 'row', alignItems: 'center' },
    subIconBg: { width: 40, height: 40, backgroundColor: '#F8F9FE', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    subName: { fontWeight: 'bold', fontSize: 14, color: COLORS.textDark },
    subDateInfo: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
    subPrice: { fontWeight: '800', fontSize: 14, color: COLORS.textDark },
    subFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F0F0F0', alignItems: 'center' },
    subFooterText: { fontSize: 12, color: COLORS.textLight },
    subTotalText: { fontSize: 16, fontWeight: 'bold', color: '#6C5CE7' },
    transactionList: { paddingHorizontal: 20 },
    transactionItem: { backgroundColor: '#FFF', padding: 15, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    transLeft: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F8F9FE', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    transTitle: { fontSize: 15, fontWeight: 'bold' },
    transDate: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
    transAmount: { fontSize: 16, fontWeight: 'bold' }
});

export default Dashboard;