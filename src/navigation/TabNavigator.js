import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutGrid, Send, History, Sparkles, UserCircle } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

// Sayfalar (Brief'teki 5 ana tab)
import Dashboard from '../screens/Dashboard'; // Home
import Payments from '../screens/Payments';   // Transfer
import Activity from '../screens/Activity';   // Transactions
import AIInsights from '../screens/AIInsights'; // Insights
import Profile from '../screens/Profile';     // Settings

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
                    height: 90,
                    paddingBottom: 30,
                    paddingTop: 10,
                    borderTopWidth: 0,
                    backgroundColor: COLORS.white,
                    elevation: 25,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -5 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                },
            }}
        >
            {/* 1. Home (Dashboard) - P0 */}
            <Tab.Screen
                name="Home"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Ana Sayfa',
                    tabBarIcon: ({ color }) => <LayoutGrid size={24} color={color} />,
                }}
            />

            {/* 2. Transfer (Payments) - P0 */}
            <Tab.Screen
                name="Transfer"
                component={Payments}
                options={{
                    tabBarLabel: 'Gönder',
                    tabBarIcon: ({ color }) => <Send size={24} color={color} />,
                }}
            />

            {/* 3. Activity (Transactions) - P0 */}
            <Tab.Screen
                name="Activity"
                component={Activity}
                options={{
                    tabBarLabel: 'İşlemler',
                    tabBarIcon: ({ color }) => <History size={24} color={color} />,
                }}
            />

            {/* 4. Insights (Security + Spending) - P0 ⭐️ */}
            <Tab.Screen
                name="Insights"
                component={AIInsights}
                options={{
                    tabBarLabel: 'Analiz',
                    tabBarIcon: ({ color }) => <Sparkles size={24} color={color} />,
                }}
            />

            {/* 5. Profile (Settings) - P1 */}
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