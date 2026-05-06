import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Merkezi Veri Yönetimi (Context API)
import { UserProvider } from './src/context/UserContext';

// Navigasyon yapıları
import TabNavigator from './src/navigation/TabNavigator';

// Ekranlar
import AuthScreen from './src/screens/AuthScreen';
import Payments from './src/screens/Payments';
import Notifications from './src/screens/Notifications';
import Subscriptions from './src/screens/Subscriptions';
import MyCards from './src/screens/MyCards';
import AutoRules from './src/screens/AutoRules';
import GroupWallet from './src/screens/GroupWallet';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" />

          <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right'
            }}
          >
            {/* 1. Kimlik Doğrulama Katmanı */}
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ animation: 'fade' }}
            />

            {/* 2. Ana Uygulama Yapısı */}
            <Stack.Screen name="MainTabs" component={TabNavigator} />

            {/* 3. İşlem ve Transfer Ekranları (Modal) */}
            <Stack.Screen
              name="Transfer"
              component={Payments}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom'
              }}
            />

            {/* 4. Detay ve Profil Özellikleri */}
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Subscriptions" component={Subscriptions} />
            <Stack.Screen name="MyCards" component={MyCards} />
            <Stack.Screen name="AutoRules" component={AutoRules} />
            <Stack.Screen name="GroupWallet" component={GroupWallet} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}