import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { DASHBOARD_DATA } from '../constants/mockData';

const Activity = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Tüm işlemleri simüle edelim (Furkan'ın listesindeki status enum'larına uygun)
    const transactions = DASHBOARD_DATA.recentTransactions;

    const renderItem = ({ item }) => {
        const isSent = item.amount < 0;

        return (
            <TouchableOpacity style={styles.card}>
                <View style={styles.leftSection}>
                    <View style={[styles.iconContainer, { backgroundColor: isSent ? '#FEEFEF' : '#E8F5E9' }]}>
                        {isSent ?
                            <ArrowUpRight size={20} color={COLORS.danger} /> :
                            <ArrowDownLeft size={20} color={COLORS.success} />
                        }
                    </View>
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.date} • {item.category}</Text>
                    </View>
                </View>
                <View style={styles.rightSection}>
                    <Text style={[styles.amount, { color: isSent ? COLORS.textDark : COLORS.success }]}>
                        {isSent ? item.amount : `+${item.amount}`} TL
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: item.status === 'FlaggedForReview' ? '#FFF4E5' : '#F1F3F4' }]}>
                        <Text style={[styles.statusText, { color: item.status === 'FlaggedForReview' ? '#B7791F' : '#5F6368' }]}>
                            {item.status === 'FlaggedForReview' ? 'İnceleniyor' : 'Tamamlandı'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>İşlem Geçmişi</Text>

            {/* Arama ve Filtreleme Barı */}
            <View style={styles.searchBar}>
                <Search size={20} color={COLORS.textLight} />
                <TextInput
                    style={styles.input}
                    placeholder="İşlem ara..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.filterBtn}>
                    <Filter size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 50, marginBottom: 20 },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        borderRadius: 16,
        marginBottom: 20,
        height: 55,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    input: { flex: 1, marginLeft: 10, fontSize: 16 },
    filterBtn: { padding: 5 },
    card: {
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    leftSection: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    title: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
    subtitle: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
    rightSection: { alignItems: 'flex-end' },
    amount: { fontSize: 16, fontWeight: 'bold' },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 6 },
    statusText: { fontSize: 10, fontWeight: '700' }
});

export default Activity;