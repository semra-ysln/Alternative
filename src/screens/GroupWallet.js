import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft, Plus, Users, ArrowUpRight, TrendingUp } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GroupWallet = () => {
    const navigation = useNavigation();

    const members = [
        { id: '1', name: 'Furkan B.', amount: '5.000 TL', handle: '@furkan' },
        { id: '2', name: 'Ayşe K.', amount: '5.000 TL', handle: '@ayse' },
        { id: '3', name: 'Mehmet D.', amount: '4.500 TL', handle: '@mehmet' },
        { id: '4', name: 'Semra Y.', amount: '4.250 TL', handle: '@semra' },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Üst Bar */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={28} color={COLORS.textDark} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Group Wallet</Text>
                    <Text style={styles.subTitle}>Arkadaşlarınla ortak hedef belirle.</Text>
                </View>
                <TouchableOpacity style={styles.newGroupBtn}>
                    <Plus size={18} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Ana Grup Kartı (image_b11c35.png Esintili) */}
            <View style={styles.mainGroupCard}>
                <View style={styles.groupHeader}>
                    <View style={styles.groupIconBg}>
                        <TrendingUp size={24} color="#FFF" />
                    </View>
                    <View>
                        <Text style={styles.groupLabel}>GRUP CÜZDAN</Text>
                        <Text style={styles.groupName}>Bodrum Tatili 2026</Text>
                    </View>
                </View>

                <View style={styles.amountSection}>
                    <Text style={styles.totalAmount}>18.750 TL</Text>
                    <Text style={styles.goalText}>Hedef: 24.000 TL • %78 tamamlandı</Text>
                </View>

                <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: '78%' }]} />
                </View>

                <View style={styles.groupButtons}>
                    <TouchableOpacity style={styles.katkiBtn}>
                        <ArrowUpRight size={18} color="#FFF" />
                        <Text style={styles.katkiText}>Katkı Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.davetBtn}>
                        <Text style={styles.davetText}>+ Üye Davet Et</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Alt Bölüm: Üyeler ve Son Aktivite */}
            <View style={styles.detailRow}>
                {/* Üyeler Listesi */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Users size={16} color={COLORS.textLight} />
                        <Text style={styles.sectionLabel}>Üyeler ({members.length})</Text>
                    </View>
                    <View style={styles.cardList}>
                        {members.map(member => (
                            <View key={member.id} style={styles.memberItem}>
                                <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>{member.name[0]}</Text></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.memberName}>{member.name}</Text>
                                    <Text style={styles.memberAmount}>{member.amount}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Son Aktivite */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionLabel}>Son Aktivite</Text>
                    </View>
                    <View style={styles.activityCard}>
                        <View style={styles.activityItem}>
                            <Text style={styles.activityUser}>@ayse katkı yaptı</Text>
                            <Text style={styles.activityAmount}>+1.500 TL</Text>
                            <Text style={styles.activityDate}>2 saat önce</Text>
                        </View>
                        <View style={styles.activityItem}>
                            <Text style={styles.activityUser}>@mehmet katkı yaptı</Text>
                            <Text style={styles.activityAmount}>+2.000 TL</Text>
                            <Text style={styles.activityDate}>Dün</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB', paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 60, marginBottom: 25 },
    title: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark },
    subTitle: { fontSize: 11, color: COLORS.textLight },
    newGroupBtn: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 12 },

    mainGroupCard: { backgroundColor: COLORS.primary, borderRadius: 28, padding: 25, elevation: 8, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
    groupHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
    groupIconBg: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    groupLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 'bold' },
    groupName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    amountSection: { marginBottom: 15 },
    totalAmount: { color: '#FFF', fontSize: 32, fontWeight: '800' },
    goalText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 5 },
    progressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4, marginVertical: 15 },
    progressFill: { height: '100%', backgroundColor: '#FFF', borderRadius: 4 },
    groupButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    katkiBtn: { flex: 1, backgroundColor: '#FFF', flexDirection: 'row', padding: 14, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
    katkiText: { color: '#FFF', fontWeight: 'bold', marginLeft: 8 },
    davetBtn: { flex: 1, backgroundColor: '#FFF', padding: 14, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    davetText: { color: COLORS.primary, fontWeight: 'bold' },

    detailRow: { marginTop: 25 },
    section: { marginBottom: 25 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    sectionLabel: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginLeft: 8 },
    cardList: { backgroundColor: '#FFF', borderRadius: 24, padding: 15 },
    memberItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    avatarPlaceholder: { width: 35, height: 35, borderRadius: 12, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { color: COLORS.primary, fontWeight: 'bold' },
    memberName: { fontSize: 14, fontWeight: '600' },
    memberAmount: { fontSize: 12, color: COLORS.textLight },

    activityCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20 },
    activityItem: { borderLeftWidth: 2, borderLeftColor: COLORS.success, paddingLeft: 15, marginBottom: 20 },
    activityUser: { fontSize: 13, fontWeight: '600' },
    activityAmount: { fontSize: 14, fontWeight: 'bold', color: COLORS.success, marginVertical: 2 },
    activityDate: { fontSize: 10, color: COLORS.textLight }
});

export default GroupWallet;