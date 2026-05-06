import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ArrowLeft, Music, Video, Cloud, Zap } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { DASHBOARD_DATA } from '../constants/mockData';
import { useNavigation } from '@react-navigation/native';

const Subscriptions = () => {
    const navigation = useNavigation();
    const data = DASHBOARD_DATA;

    const getSubIcon = (iconName) => {
        switch (iconName) {
            case 'music': return <Music size={24} color={COLORS.primary} />;
            case 'video': return <Video size={24} color="#E50914" />;
            case 'cloud': return <Cloud size={24} color="#007AFF" />;
            default: return <Zap size={24} color={COLORS.primary} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Aboneliklerim</Text>
            </View>

            <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>{data.subscriptionSummary.period} Toplam</Text>
                <Text style={styles.summaryTotal}>{data.subscriptionSummary.total}</Text>
            </View>

            <FlatList
                data={data.subscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.subItem}>
                        <View style={styles.subLeft}>
                            <View style={styles.iconBg}>{getSubIcon(item.icon)}</View>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.subName}>{item.name}</Text>
                                <Text style={styles.subDate}>{item.dateInfo}</Text>
                            </View>
                        </View>
                        <Text style={styles.subPrice}>{item.price.toFixed(2).replace('.', ',')} TL</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', marginTop: 50, marginBottom: 20 },
    backBtn: { padding: 8, backgroundColor: '#FFF', borderRadius: 12 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
    summaryCard: { backgroundColor: COLORS.primary, padding: 25, borderRadius: 24, marginBottom: 20 },
    summaryLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
    summaryTotal: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
    subItem: { backgroundColor: '#FFF', padding: 15, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    subLeft: { flexDirection: 'row', alignItems: 'center' },
    iconBg: { width: 45, height: 45, backgroundColor: '#F8F9FE', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    subName: { fontSize: 16, fontWeight: 'bold' },
    subDate: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
    subPrice: { fontSize: 16, fontWeight: 'bold' }
});

export default Subscriptions;