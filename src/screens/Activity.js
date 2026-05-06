import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    ArrowUpRight,
    ArrowDownLeft,
    X,
    Send,
    Search,
    ShieldCheck,
    Clock,
    CheckCircle2,
    Calendar,
    Activity as ActivityIcon
} from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { DASHBOARD_DATA } from '../constants/mockData';

const Activity = () => {
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(DASHBOARD_DATA.recentTransactions);

    const [pendingAction, setPendingAction] = useState({
        id: 'p1',
        title: 'Bilinmeyen Hesap',
        amount: -50000.00,
        score: 85,
        category: 'Transfer'
    });

    useEffect(() => {
        const filtered = DASHBOARD_DATA.recentTransactions.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTransactions(filtered);
    }, [searchQuery]);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemCard} onPress={() => handleItemPress(item)}>
            <View style={[styles.iconCircle, { backgroundColor: item.amount < 0 ? '#FFF0F0' : '#F0FFF4' }]}>
                {item.amount < 0 ?
                    <ArrowUpRight size={20} color={COLORS.danger} /> :
                    <ArrowDownLeft size={20} color={COLORS.success} />
                }
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <Text style={[styles.itemAmount, { color: item.amount < 0 ? COLORS.textDark : COLORS.success }]}>
                {item.amount.toLocaleString()} ₺
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>İşlem Geçmişi</Text>

            <View style={styles.searchContainer}>
                <Search size={20} color={COLORS.textLight} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="İşlem ara..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {pendingAction && (
                <View style={styles.pendingPanel}>
                    <View style={styles.pendingHeader}>
                        <Clock size={18} color="#D4A017" />
                        <Text style={styles.pendingHeaderText}>1 bekleyen onay</Text>
                    </View>
                    <Text style={styles.pendingDescription}>
                        Yüksek risk skoru aldığı için incelemeye düşen transferler.
                    </Text>
                    <View style={styles.pendingActionRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.pendingTitle}>{pendingAction.title}</Text>
                            <Text style={styles.pendingSubtitle}>{pendingAction.amount.toLocaleString()} TL • skor {pendingAction.score}</Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.approveBtn} onPress={() => setPendingAction(null)}>
                                <CheckCircle2 size={16} color="#FFF" />
                                <Text style={styles.approveBtnText}>Onayla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPendingAction(null)}>
                                <Text style={styles.cancelBtnText}>İptal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            <FlatList
                data={filteredTransactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTopRow}>
                            <View style={styles.securityBadge}>
                                <ShieldCheck size={16} color="#2E7D32" />
                                <Text style={styles.securityText}>İşlem Güvenli</Text>
                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X size={24} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>
                        {selectedItem && (
                            <View style={styles.receiptContainer}>
                                <Text style={styles.receiptTitle}>{selectedItem.title}</Text>
                                <Text style={[styles.receiptAmount, { color: selectedItem.amount < 0 ? COLORS.textDark : COLORS.success }]}>
                                    {selectedItem.amount.toLocaleString()} ₺
                                </Text>
                                <View style={styles.divider} />
                                <View style={styles.receiptRow}>
                                    <Text style={styles.rowLabel}>Tarih</Text>
                                    <Text style={styles.rowValue}>{selectedItem.date}</Text>
                                </View>
                                <TouchableOpacity style={styles.repeatBtn} onPress={() => setModalVisible(false)}>
                                    <Send size={18} color="#FFF" />
                                    <Text style={styles.repeatBtnText}>İşlemi Tekrarla</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// BURASI ÇOK ÖNEMLİ: styles nesnesi eksiksiz olmalı
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 60, marginBottom: 15 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 15, paddingHorizontal: 15, marginBottom: 20, height: 50, elevation: 2 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, fontSize: 16, color: COLORS.textDark },
    pendingPanel: { backgroundColor: '#FFFBEB', borderRadius: 24, padding: 20, marginBottom: 25, borderWidth: 1, borderColor: '#FEF3C7' },
    pendingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    pendingHeaderText: { color: '#92400E', fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
    pendingDescription: { color: '#B45309', fontSize: 11, lineHeight: 16, marginBottom: 15 },
    pendingActionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    pendingTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textDark },
    pendingSubtitle: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
    buttonGroup: { flexDirection: 'row', alignItems: 'center' },
    approveBtn: { backgroundColor: '#10B981', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, marginRight: 10 },
    approveBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13, marginLeft: 6 },
    cancelBtn: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFF' },
    cancelBtnText: { color: COLORS.textDark, fontWeight: '600', fontSize: 13 },
    list: { paddingBottom: 20 },
    itemCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    iconCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    itemDetails: { flex: 1 },
    itemTitle: { fontSize: 16, fontWeight: 'bold' },
    itemDate: { fontSize: 12, color: COLORS.textLight, marginTop: 4 },
    itemAmount: { fontSize: 16, fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#FFF', borderRadius: 32, padding: 24, width: '90%' },
    modalTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    securityBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    securityText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold', marginLeft: 6 },
    receiptContainer: { alignItems: 'center' },
    receiptTitle: { fontSize: 20, fontWeight: 'bold' },
    receiptAmount: { fontSize: 32, fontWeight: '800', marginTop: 10 },
    divider: { width: '100%', height: 1, backgroundColor: '#F0F0F0', marginVertical: 20, borderStyle: 'dashed', borderWidth: 1, borderRadius: 1 },
    receiptRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
    rowLabel: { fontSize: 14, color: COLORS.textLight },
    rowValue: { fontSize: 14, fontWeight: 'bold' },
    repeatBtn: { backgroundColor: COLORS.primary, flexDirection: 'row', width: '100%', padding: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    repeatBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 }
});

// BU SATIRI UNUTMA:
export default Activity;