import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const ShoeCard = ({ item, handleProductClick, fetchShoes }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                handleProductClick(item);
            }}
        >
            {/* <Image source={item.shoe_img ? { uri: `${item.shoe_img}` } : require('../assets/placeholder_img.png')} style={styles.coverImage} /> */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.shoe_name} - {item.shoe_color}</Text>
                <Text style={styles.quantity}>In Stock: {item.num_of_shoes}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ShoeCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        marginHorizontal: 10,
        marginVertical: 5,
        // backgroundColor: 'coral',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'coral',
        // backgroundColor: 'green',
        borderRadius: '10',
        shadowOpacity: 0.2,
        shadowColor: 'coral',
        shadowOffset: {
            width: 2,
            height: 2,
        },

        shadowRadius: 2,
    },
    coverImage: {
        width: "100%",
        height: 256,
        resizeMode: 'cover',
        borderRadius: 20,
        position: "relative",
    },
    contentContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        // fontFamily: fonts.regular,
        fontWeight: "700",
        color: "#444444",
    },
    quantity: {
        fontSize: 18,
        fontWeight: '500'
        // fontFamily: fonts.medium,
    },
});
