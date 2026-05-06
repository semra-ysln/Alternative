import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { Send, ShieldAlert, CheckCircle2, Plus, CreditCard, Lightbulb, Droplets, Flame, Smartphone } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Payments = () => {
    const route = useRoute();
    const navigation = useNavigation();

    // Parametreleri yakalıyoruz (mode: 'TRANSFER', 'TOPUP' veya 'BILL')
    // BillsScreen'den gelen 'icon' parametresini de ekledik.
    const { mode, currency = 'TRY', receiver = '', description = '', amount = '', icon = '' } = route.params || {};

    const isTopUp = mode === 'TOPUP';
    const isBill = mode === 'BILL';

    const [form, setForm] = useState({
        receiver: receiver,
        amount: amount,
        description: description,
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [status, setStatus] = useState('idle');

    // Dinamik Veri Senkronizasyonu
    useEffect(() => {
        setForm(prev => ({
            ...prev,
            receiver: receiver || prev.receiver,
            // Eğer faturaysa otomatik açıklama oluşturur
            description: isBill ? `${receiver} Fatura Ödemesi` : (description || prev.description),
            amount: amount || prev.amount
        }));
    }, [receiver, description, amount, isBill]);

    // BillsScreen'den gelen ikon ismine göre doğru ikonu render eden fonksiyon
    const getBillIcon = (iconName) => {
        const props = { size: 30, color: COLORS.primary };
        switch (iconName) {
            case 'lightbulb': return <Lightbulb {...props} color="#D97706" />;
            case 'droplets': return <Droplets {...props} color="#0284C7" />;
            case 'flame': return <Flame {...props} color="#EA580C" />;
            case 'smartphone': return <Smartphone {...props} color="#1A5CFF" />;
            default: return <CreditCard {...props} />;
        }
    };

    const handleAction = () => {
        if (isTopUp && (!form.cardNumber || !form.amount)) {
            return Alert.alert("Hata", "Lütfen kart ve tutar bilgilerini girin.");
        }

        setStatus('loading');
        setTimeout(() => {
            if (parseFloat(form.amount) > 20000) {
                setStatus('flagged');
                Alert.alert("Güvenlik İncelemesi", "Yüksek tutarlı işlem LyraBit AI tarafından incelemeye alındı.");
            } else {
                setStatus('completed');
            }
        }, 1500);
    };

    if (status === 'completed') return (
        <View style={styles.resultContainer}>
            <View style={styles.successCircle}>
                <CheckCircle2 size={80} color={COLORS.success} />
            </View>
            <Text style={styles.resultTitle}>
                {isTopUp ? 'Yükleme Başarılı!' : isBill ? 'Fatura Ödendi!' : 'Transfer Başarılı!'}
            </Text>
            <Text style={styles.resultSub}>İşlem LyraBit güvencesiyle tamamlandı.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
                <Text style={styles.btnTextWhite}>Dashboard'a Dön</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    {isTopUp ? 'Para Yükle' : isBill ? 'Fatura Ödeme' : 'Para Gönder'}
                </Text>
                <View style={styles.securityBadge}>
                    <ShieldAlert size={14} color={COLORS.success} />
                    <Text style={styles.securityText}>256-bit SSL Güvenli</Text>
                </View>
            </View>

            {/* Dinamik Başlık Kartı: Kurum İsmi ve İkon */}
            {(isBill || !isTopUp) && (
                <View style={styles.infoCard}>
                    <View style={styles.infoIconBg}>
                        {isBill ? getBillIcon(icon) : <CreditCard size={30} color={COLORS.primary} />}
                    </View>
                    <View style={styles.infoTextGroup}>
                        <Text style={styles.infoLabel}>{isBill ? 'Fatura Kurumu' : 'Alıcı'}</Text>
                        <Text style={styles.infoValue}>{form.receiver || 'Belirtilmedi'}</Text>
                    </View>
                </View>
            )}

            <View style={styles.formCard}>
                {isTopUp ? (
                    <View style={styles.cardSection}>
                        <Text style={styles.label}>Kart Numarası</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0000 0000 0000 0000"
                            keyboardType="numeric"
                            value={form.cardNumber}
                            onChangeText={(v) => setForm({ ...form, cardNumber: v })}
                        />
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={styles.label}>AA / YY</Text>
                                <TextInput style={styles.input} placeholder="MM/YY" value={form.expiry} onChangeText={(v) => setForm({ ...form, expiry: v })} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>CVV</Text>
                                <TextInput style={styles.input} placeholder="***" secureTextEntry value={form.cvv} onChangeText={(v) => setForm({ ...form, cvv: v })} />
                            </View>
                        </View>
                    </View>
                ) : !isBill && (
                    <View style={styles.cardSection}>
                        <Text style={styles.label}>Alıcı Bilgisi</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Kullanıcı adı veya IBAN"
                            value={form.receiver}
                            onChangeText={(v) => setForm({ ...form, receiver: v })}
                        />
                    </View>
                )}

                <Text style={styles.label}>Tutar ({currency})</Text>
                <View style={styles.amountInputWrapper}>
                    <TextInput
                        style={[styles.input, styles.amountInput]}
                        keyboardType="numeric"
                        placeholder="0.00"
                        value={form.amount}
                        onChangeText={(v) => setForm({ ...form, amount: v })}
                    />
                    <View style={styles.currencyBadge}>
                        <Text style={styles.currencySymbol}>{currency === 'TRY' ? '₺' : '$'}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.actionBtn, isTopUp && { backgroundColor: COLORS.secondary }]}
                    onPress={handleAction}
                    disabled={status === 'loading'}
                >
                    <Text style={styles.btnTextWhite}>
                        {status === 'loading' ? 'İşlem Sürüyor...' : isBill ? 'Ödemeyi Onayla' : 'Güvenli Transfer'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FB', padding: 20 },
    headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 25 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1E293B' },
    securityBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
    securityText: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold', marginLeft: 5 },
    infoCard: { backgroundColor: '#FFF', flexDirection: 'row', padding: 20, borderRadius: 24, alignItems: 'center', marginBottom: 20, elevation: 2 },
    infoIconBg: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#F8F9FE', justifyContent: 'center', alignItems: 'center' },
    infoTextGroup: { marginLeft: 15 },
    infoLabel: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
    infoValue: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
    formCard: { backgroundColor: '#FFF', padding: 25, borderRadius: 30, elevation: 4 },
    label: { fontSize: 13, color: '#64748B', marginBottom: 10, fontWeight: '600' },
    input: { backgroundColor: '#F8F9FE', borderRadius: 15, padding: 16, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#E2E8F0' },
    row: { flexDirection: 'row' },
    amountInputWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    amountInput: { flex: 1, marginBottom: 0, fontSize: 24, fontWeight: 'bold' },
    currencyBadge: { backgroundColor: '#F1F5F9', height: 58, width: 58, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
    currencySymbol: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
    actionBtn: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 10 },
    btnTextWhite: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
    successCircle: { padding: 20, backgroundColor: '#F0FFF4', borderRadius: 50, marginBottom: 20 },
    resultTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
    resultSub: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 10 },
    btnBack: { backgroundColor: COLORS.primary, width: '100%', padding: 18, borderRadius: 16, marginTop: 40, alignItems: 'center' }
});

export default Payments;