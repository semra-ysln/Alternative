import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';
import { ShieldCheck, Mail, Lock, User } from 'lucide-react-native';
import { useUser } from '../context/UserContext';

const AuthScreen = () => {
    const navigation = useNavigation();
    const { setUserName } = useUser();
    const [isLogin, setIsLogin] = useState(true);
    const [tempName, setTempName] = useState('');

    const handleAuth = () => {
        // Eğer kayıt modundaysa ve isim girilmişse ismi güncelle
        if (!isLogin && tempName.trim() !== '') {
            setUserName(tempName);
        }
        navigation.replace('MainTabs');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <ShieldCheck size={48} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>LyraBit</Text>
                    <Text style={styles.subtitle}>
                        {isLogin ? "Finansal özgürlüğüne adım at." : "Yeni bir hesap oluştur."}
                    </Text>
                </View>

                <View style={styles.form}>
                    {!isLogin && (
                        <View style={styles.inputContainer}>
                            <User size={20} color={COLORS.textLight} />
                            <TextInput
                                placeholder="Adınız Soyadınız"
                                style={styles.input}
                                onChangeText={setTempName}
                                autoCapitalize="words"
                            />
                        </View>
                    )}

                    <View style={styles.inputContainer}>
                        <Mail size={20} color={COLORS.textLight} />
                        <TextInput
                            placeholder="E-posta"
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Lock size={20} color={COLORS.textLight} />
                        <TextInput
                            placeholder="Şifre"
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.mainButton} onPress={handleAuth}>
                        <Text style={styles.mainButtonText}>
                            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                        </Text>
                    </TouchableOpacity>

                    {/* Hata olasılığını sıfıra indiren güvenli metin bloğu */}
                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => setIsLogin(!isLogin)}
                    >
                        <Text style={styles.switchText}>
                            <Text>{isLogin ? "Henüz hesabın yok mu? " : "Zaten hesabın var mı? "}</Text>
                            <Text style={styles.linkText}>
                                {isLogin ? "Kayıt Ol" : "Giriş Yap"}
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    content: { flex: 1, padding: 30, justifyContent: 'center' },
    header: { alignItems: 'center', marginBottom: 40 },
    logoContainer: { width: 80, height: 80, backgroundColor: '#F0F4FF', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    title: { fontSize: 32, fontWeight: 'bold', color: COLORS.textDark },
    subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 5, textAlign: 'center' },
    form: { gap: 15 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FB', paddingHorizontal: 15, borderRadius: 16, height: 60, borderWidth: 1, borderColor: '#F0F0F0' },
    input: { flex: 1, marginLeft: 10, fontSize: 16 },
    mainButton: { backgroundColor: COLORS.primary, height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    mainButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    switchButton: { marginTop: 20, alignItems: 'center' },
    switchText: { fontSize: 14, color: COLORS.textLight },
    linkText: { color: COLORS.primary, fontWeight: 'bold' }
});

export default AuthScreen;