import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutGrid, History, Sparkles, UserCircle, WalletCards } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

// Sayfalar
import Dashboard from '../screens/Dashboard';
import Activity from '../screens/Activity';
import AIInsights from '../screens/AIInsights';
import Profile from '../screens/Profile';
import BillsScreen from '../screens/BillsScreen'; // Yeni eklenen Ödemeler ekranı

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: 85,
                    paddingBottom: 20,
                    paddingTop: 10,
                    borderTopWidth: 0,
                    backgroundColor: COLORS.white,
                    paddingHorizontal: 10,
                    elevation: 15,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                },
            }}
        >
            {/* 1. Ana Sayfa */}
            <Tab.Screen
                name="Home"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Ana Sayfa',
                    tabBarIcon: ({ color }) => <LayoutGrid size={24} color={color} />,
                }}
            />

            {/* 2. Ödemeler (image_b201ee.png tasarımı burada aktif olacak) */}
            <Tab.Screen
                name="Payments"
                component={BillsScreen}
                options={{
                    tabBarLabel: 'Ödemeler',
                    tabBarIcon: ({ color }) => <WalletCards size={24} color={color} />,
                }}
            />

            {/* 3. İşlem Geçmişi */}
            <Tab.Screen
                name="Activity"
                component={Activity}
                options={{
                    tabBarLabel: 'İşlemler',
                    tabBarIcon: ({ color }) => <History size={24} color={color} />,
                }}
            />

            {/* 4. AI Analiz */}
            <Tab.Screen
                name="Insights"
                component={AIInsights}
                options={{
                    tabBarLabel: 'Analiz',
                    tabBarIcon: ({ color }) => <Sparkles size={24} color={color} />,
                }}
            />

            {/* 5. Profil */}
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color }) => <UserCircle size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}