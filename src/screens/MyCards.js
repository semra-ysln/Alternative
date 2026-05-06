import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import { Plus, Eye, Snowflake, CreditCard, ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MyCards = () => {
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Başlangıç Kartları
    const [cards, setCards] = useState([
        { id: '1', name: 'ANA KART', last: '1820', color: '#1A5CFF', number: '5294 7621 9034 1820', expiry: '08/29', brand: 'Mastercard', frozen: false },
        { id: '2', name: 'TRENDYOL SANAL', last: '8812', color: '#9B51E0', number: '4111 2222 3333 8812', expiry: '11/28', brand: 'Visa', frozen: false },
    ]);

    // RASTGELE KART OLUŞTURMA FONKSİYONU
    const addNewCard = () => {
        const colors = ['#EF4444', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'];
        const brands = ['Mastercard', 'Visa', 'Troy'];
        const names = ['Hepsiburada Sanal', 'Oyun Kartı', 'Yurt Dışı Alışveriş', 'Abonelik Kartı', 'Market Sanal'];

        // Rastgele Veri Üretimi
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomBrand = brands[Math.floor(Math.random() * brands.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomNum = Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000)).join(' ');
        const randomLast = randomNum.slice(-4);

        const newCard = {
            id: Math.random().toString(),
            name: randomName.toUpperCase(),
            last: randomLast,
            color: randomColor,
            number: randomNum,
            expiry: '12/30',
            brand: randomBrand,
            frozen: false
        };

        setCards(prev => [...prev, newCard]);

        // Yeni karta otomatik kaydır (Opsiyonel)
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);

        Alert.alert("Başarılı", `${randomName} başarıyla oluşturuldu!`);
    };

    const handleFreeze = (id) => {
        Alert.alert(
            "Kart Yönetimi",
            "Bu kart üzerinde ne yapmak istersiniz?",
            [
                { text: "İptal", style: "cancel" },
                {
                    text: "Kartı Sil",
                    onPress: () => {
                        setCards(prev => prev.filter(c => c.id !== id));
                        setActiveIndex(0);
                    },
                    style: "destructive"
                },
                {
                    text: cards.find(c => c.id === id).frozen ? "Çöz" : "Dondur",
                    onPress: () => setCards(prev => prev.map(c => c.id === id ? { ...c, frozen: !c.frozen } : c))
                }
            ]
        );
    };

    const renderCard = ({ item }) => (
        <View style={[styles.cardVisual, { backgroundColor: item.frozen ? '#94A3B8' : item.color }]}>
            <View style={styles.cardTop}>
                <View>
                    <Text style={styles.cardVisualLabel}>{item.name}</Text>
                    <Text style={styles.cardBrand}>{item.brand}</Text>
                </View>
                {item.frozen ? <Snowflake size={24} color="#FFF" /> : <ShieldCheck size={24} color="rgba(255,255,255,0.7)" />}
            </View>
            <Text style={styles.cardNumber}>{item.number}</Text>
            <View style={styles.cardFooter}>
                <View>
                    <Text style={styles.footerLabel}>SON K.T.</Text>
                    <Text style={styles.footerValue}>{item.expiry}</Text>
                </View>
                <Text style={styles.lyraText}>LyraBit</Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><ChevronLeft size={28} color={COLORS.textDark} /></TouchableOpacity>
                <Text style={styles.title}>Kartlarım</Text>
                {/* ARTI BUTONU ARTIK FONKSİYONEL */}
                <TouchableOpacity style={styles.newCardBtn} onPress={addNewCard}>
                    <Plus size={18} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={cards}
                renderItem={renderCard}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={(e) => {
                    const x = e.nativeEvent.contentOffset.x;
                    setActiveIndex(Math.round(x / (width - 40)));
                }}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            />

            <View style={styles.dotsRow}>
                {cards.map((_, i) => (
                    <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
                ))}
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionBtn}>
                    <Eye size={18} color={COLORS.textDark} />
                    <Text style={styles.actionText}>Detay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionBtn, cards[activeIndex]?.frozen && styles.frozenActiveBtn]}
                    onPress={() => cards[activeIndex] && handleFreeze(cards[activeIndex].id)}
                >
                    <Snowflake size={18} color={cards[activeIndex]?.frozen ? COLORS.danger : COLORS.primary} />
                    <Text style={[styles.actionText, { color: cards[activeIndex]?.frozen ? COLORS.danger : COLORS.primary }]}>
                        {cards[activeIndex]?.frozen ? 'Kartı Çöz' : 'Dondur / Sil'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.limitSection}>
                <Text style={styles.limitLabel}>Harcama Limiti</Text>
                <View style={styles.limitBarBg}><View style={[styles.limitBarFill, { width: '45%' }]} /></View>
                <Text style={styles.limitSub}>Toplam limitin %45'i kullanıldı.</Text>
            </View>

            <View style={styles.listSection}>
                <Text style={styles.listTitle}>KART LİSTESİ ({cards.length})</Text>
                {cards.map((card) => (
                    <View key={card.id} style={styles.cardListItem}>
                        <View style={[styles.iconBox, { backgroundColor: card.color }]}><CreditCard size={20} color="#FFF" /></View>
                        <Text style={styles.cardName}>{card.name}</Text>
                        <Text style={styles.cardLast}>**** {card.last}</Text>
                    </View>
                ))}
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 60, paddingHorizontal: 20, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    newCardBtn: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 12 },
    cardVisual: { width: width - 40, height: 200, borderRadius: 28, padding: 25, marginRight: 20, elevation: 5 },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
    cardVisualLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 'bold' },
    cardBrand: { color: '#FFF', fontSize: 12, fontWeight: '600' },
    cardNumber: { color: '#FFF', fontSize: 20, fontWeight: 'bold', letterSpacing: 2, marginVertical: 30 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    footerLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 9 },
    footerValue: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
    lyraText: { color: '#FFF', fontSize: 18, fontStyle: 'italic' },
    dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#CBD5E1', marginHorizontal: 3 },
    activeDot: { width: 20, backgroundColor: COLORS.primary },
    cardActions: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
    actionBtn: { flexDirection: 'row', backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, alignItems: 'center', marginHorizontal: 8, elevation: 2 },
    frozenActiveBtn: { borderColor: COLORS.danger, borderWidth: 1 },
    actionText: { fontSize: 13, fontWeight: 'bold', marginLeft: 8 },
    limitSection: { padding: 20, backgroundColor: '#FFF', margin: 20, borderRadius: 24 },
    limitLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
    limitBarBg: { height: 6, backgroundColor: '#F1F5F9', borderRadius: 3 },
    limitBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
    limitSub: { fontSize: 11, color: '#64748B', marginTop: 8 },
    listSection: { paddingHorizontal: 20 },
    listTitle: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8', marginBottom: 15 },
    cardListItem: { backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 20, marginBottom: 10 },
    iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    cardName: { flex: 1, fontSize: 14, fontWeight: '600' },
    cardLast: { fontSize: 12, color: '#64748B' }
});

export default MyCards;