import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Bell, ArrowLeft, Info, ShieldAlert, CreditCard } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { DASHBOARD_DATA } from '../constants/mockData';
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
    const navigation = useNavigation();
    const notifications = DASHBOARD_DATA.notifications; // mockData'dan gelen liste

    const getIcon = (type) => {
        switch (type) {
            case 'transfer': return <CreditCard size={20} color={COLORS.primary} />;
            case 'security': return <ShieldAlert size={20} color="#F2994A" />;
            default: return <Info size={20} color={COLORS.textLight} />;
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, !item.isRead && styles.unreadCard]}>
            <View style={styles.iconContainer}>{getIcon(item.type)}</View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            {!item.isRead && <View style={styles.unreadDot} />}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bildirimler</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingHorizontal: 20, marginBottom: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    list: { paddingHorizontal: 20 },
    card: { backgroundColor: '#FFF', padding: 15, borderRadius: 16, flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
    unreadCard: { borderLeftWidth: 4, borderLeftColor: COLORS.primary },
    iconContainer: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    textContainer: { flex: 1 },
    title: { fontSize: 15, fontWeight: 'bold', color: COLORS.textDark },
    message: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
    time: { fontSize: 11, color: '#999', marginTop: 6 },
    unreadDot: { width: 8, height: 8, backgroundColor: COLORS.primary, borderRadius: 4 }
});

export default Notifications;