import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LogOut, User, Mail, Calendar, ShieldCheck } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

const Profile = () => {
    const user = {
        fullName: "Beyza Ferhan Bağdatlıoğlu",
        username: "beyza_ferhan",
        email: "beyza@lyrabit.com",
        joinedDate: "Ocak 2026"
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Profil</Text>

            <View style={styles.profileCard}>
                <Image source={{ uri: 'https://i.pravatar.cc/150' }} style={styles.avatar} />
                <Text style={styles.name}>{user.fullName}</Text>
                <Text style={styles.username}>@{user.username}</Text>
            </View>

            {/* Bilgi Listesi */}
            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Mail size={20} color={COLORS.textLight} />
                    <Text style={styles.infoText}>{user.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Calendar size={20} color={COLORS.textLight} />
                    <Text style={styles.infoText}>{user.joinedDate} tarihinde katıldı</Text>
                </View>
                <View style={styles.infoRow}>
                    <ShieldCheck size={20} color={COLORS.success} />
                    <Text style={[styles.infoText, { color: COLORS.success }]}>Hesap Doğrulandı</Text>
                </View>
            </View>

            {/* Çıkış Yap Butonu */}
            <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => console.log("Token siliniyor, login'e yönlendiriliyor...")}
            >
                <LogOut size={20} color={COLORS.danger} />
                <Text style={styles.logoutText}>Çıkış Yap</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 50, marginBottom: 20 },
    profileCard: { backgroundColor: '#FFF', padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 20 },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
    name: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
    username: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
    infoSection: { backgroundColor: '#FFF', borderRadius: 24, padding: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 10 },
    infoText: { marginLeft: 15, fontSize: 16, color: COLORS.textDark },
    logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 30, padding: 15 },
    logoutText: { color: COLORS.danger, fontWeight: 'bold', marginLeft: 10, fontSize: 16 }
});

export default Profile;