import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    LogOut,
    Calendar,
    ShieldCheck,
    CreditCard,
    RefreshCcw,
    Users,
    ChevronRight,
    User
} from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useUser } from '../context/UserContext'; // Global state bağlantısı

const Profile = () => {
    const navigation = useNavigation();
    const { userName } = useUser(); // Giriş ekranında yazdığın ismi buradan çekiyoruz

    const userEmail = "beyza@lyrabit.com";
    const joinedDate = "Ocak 2026";

    const menuItems = [
        {
            id: 'cards',
            title: 'Kartlarım',
            subTitle: 'Sanal kartlar ve limit yönetimi',
            icon: <CreditCard size={22} color={COLORS.primary} />,
            screen: 'MyCards'
        },
        {
            id: 'rules',
            title: 'Otomatik Kurallar',
            subTitle: 'Döviz eşiği ve otomatik alım/satım',
            icon: <RefreshCcw size={22} color="#9B51E0" />,
            screen: 'AutoRules'
        },
        {
            id: 'group',
            title: 'Ortak Cüzdan (Group Wallet)',
            subTitle: 'Bodrum Tatili 2026 ve diğer gruplar',
            icon: <Users size={22} color="#007AFF" />,
            screen: 'GroupWallet'
        },
    ];

    const handleLogout = () => {
        // Oturumu kapatınca giriş (Auth) ekranına yönlendirir
        navigation.replace('Auth');
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.headerTitle}>Profil</Text>

            {/* Profil Üst Bölümü */}
            <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    <User size={50} color={COLORS.primary} />
                </View>

                {/* Dinamik İsim */}
                <Text style={styles.name}>{userName}</Text>

                {/* İsmin hemen altındaki Email */}
                <Text style={styles.emailText}>{userEmail}</Text>

                <View style={styles.verifiedBadge}>
                    <ShieldCheck size={14} color={COLORS.success} />
                    <Text style={styles.verifiedText}>Doğrulanmış Hesap</Text>
                </View>
            </View>

            {/* Özellikler Menüsü */}
            <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Hesap Özellikleri</Text>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.menuItem}
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <View style={styles.menuLeft}>
                            <View style={styles.iconBg}>{item.icon}</View>
                            <View>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubTitle}>{item.subTitle}</Text>
                            </View>
                        </View>
                        <ChevronRight size={20} color={COLORS.textLight} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Genel Bilgiler */}
            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Calendar size={18} color={COLORS.textLight} />
                    <Text style={styles.infoText}>{joinedDate} katıldı</Text>
                </View>
            </View>

            {/* Çıkış Butonu */}
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <LogOut size={20} color={COLORS.danger} />
                <Text style={styles.logoutText}>Oturumu Kapat</Text>
            </TouchableOpacity>

            <View style={{ height: 50 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB', padding: 20 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
    profileCard: { backgroundColor: '#FFF', padding: 25, borderRadius: 30, alignItems: 'center', marginBottom: 20, elevation: 2 },
    avatarContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    name: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
    emailText: { fontSize: 14, color: COLORS.textLight, marginTop: 2, marginBottom: 10 },
    verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    verifiedText: { fontSize: 11, color: '#2E7D32', fontWeight: 'bold', marginLeft: 5 },
    menuSection: { marginBottom: 25 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textLight, marginBottom: 15, marginLeft: 5 },
    menuItem: { backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 20, marginBottom: 12, elevation: 1 },
    menuLeft: { flexDirection: 'row', alignItems: 'center' },
    iconBg: { width: 45, height: 45, borderRadius: 14, backgroundColor: '#F8F9FE', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    menuTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textDark },
    menuSubTitle: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
    infoSection: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center' },
    infoText: { marginLeft: 15, fontSize: 14, color: COLORS.textDark },
    logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 },
    logoutText: { color: COLORS.danger, fontWeight: 'bold', marginLeft: 10, fontSize: 15 }
});

export default Profile;