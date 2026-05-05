import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Send, ShieldAlert, CheckCircle2 } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

const Payments = () => {
    const [form, setForm] = useState({ receiver: '', amount: '', description: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, completed, flagged

    const handleTransfer = () => {
        if (!form.receiver || !form.amount) return Alert.alert("Hata", "Lütfen alıcı ve tutar girin.");

        setStatus('loading');

        // Backend simülasyonu: 10.000 TL üzeri işlemleri "Flagged" yapalım (Furkan'ın jüri senaryosu)
        setTimeout(() => {
            if (parseFloat(form.amount) > 10000) {
                setStatus('flagged');
            } else {
                setStatus('completed');
            }
        }, 1500);
    };

    if (status === 'completed') return (
        <View style={styles.resultContainer}>
            <CheckCircle2 size={80} color={COLORS.success} />
            <Text style={styles.resultTitle}>Transfer Başarılı!</Text>
            <TouchableOpacity onPress={() => setStatus('idle')} style={styles.btnBack}><Text style={styles.btnTextWhite}>Kapat</Text></TouchableOpacity>
        </View>
    );

    if (status === 'flagged') return (
        <View style={styles.resultContainer}>
            <ShieldAlert size={80} color="#F2994A" />
            <Text style={[styles.resultTitle, { color: '#F2994A' }]}>Güvenlik İncelemesi</Text>
            <Text style={styles.resultSub}>Bu işlem yüksek risk skoru nedeniyle incelemeye alındı. Detayları Security Center'da görebilirsin.</Text>
            <TouchableOpacity onPress={() => setStatus('idle')} style={[styles.btnBack, { backgroundColor: '#F2994A' }]}><Text style={styles.btnTextWhite}>Anladım</Text></TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerTitle}>Para Gönder</Text>

            <View style={styles.formCard}>
                <Text style={styles.label}>Alıcı (E-posta veya Kullanıcı Adı)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ayse veya ali@mail.com"
                    value={form.receiver}
                    onChangeText={(v) => setForm({ ...form, receiver: v })}
                />

                <Text style={styles.label}>Tutar (TRY)</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="0.00"
                    value={form.amount}
                    onChangeText={(v) => setForm({ ...form, amount: v })}
                />

                <Text style={styles.label}>Açıklama (Opsiyonel)</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    multiline
                    placeholder="Örn: Kira bedeli"
                    value={form.description}
                    onChangeText={(v) => setForm({ ...form, description: v })}
                />

                <TouchableOpacity style={styles.sendBtn} onPress={handleTransfer} disabled={status === 'loading'}>
                    <Send size={20} color="#FFF" />
                    <Text style={styles.btnTextWhite}>{status === 'loading' ? 'İşleniyor...' : 'Transferi Başlat'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 40, marginBottom: 20 },
    formCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 24, elevation: 5 },
    label: { fontSize: 14, color: COLORS.textLight, marginBottom: 8, fontWeight: '600' },
    input: { backgroundColor: '#F8F9FE', borderRadius: 12, padding: 15, marginBottom: 20, fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0' },
    sendBtn: { backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 18, borderRadius: 16 },
    btnTextWhite: { color: '#FFF', fontWeight: 'bold', marginLeft: 10, fontSize: 16 },
    resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: '#FFF' },
    resultTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, color: COLORS.success },
    resultSub: { textAlign: 'center', color: COLORS.textLight, marginTop: 10, lineHeight: 20 },
    btnBack: { backgroundColor: COLORS.primary, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 12, marginTop: 30 }
});

export default Payments;