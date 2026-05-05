import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const Cards = () => {
    return (
        <View style={styles.center}>
            <Text style={styles.text}>Kartlarım & Limitler</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
    text: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary }
});

export default Cards;