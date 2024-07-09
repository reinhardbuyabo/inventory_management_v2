import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header({ title, navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        // With Image Background
        <ImageBackground source={require('../assets/game_bg.png')} style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
            <View style={styles.headerTitle}>
                {/* Image Added Here */}
                <Text style={styles.headerText}>{title}</Text>
                <MaterialCommunityIcons name="shoe-sneaker" size={26} color="coral" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        // position: 'absolute',
        // left: 16,
    },
    headerTitle: {
        flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 10
    },
});