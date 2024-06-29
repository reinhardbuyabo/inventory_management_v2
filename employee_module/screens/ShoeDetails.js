import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
// import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

const colorsArray = [
    "#91A1B0",
    "#B11D1D",
    "#1F44A3",
    "#9F632A",
    "#1D752B",
    "#000000",
];

const images = {
    img: require('../assets/uploads/sixhunfourhun.png'),
}

const ShoeDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const shoe = route.params.item;
    const images = ['image1.png', 'image2.png'];

    console.log(shoe.shoe_img);
    return (
        <View colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
            <View style={styles.header}>
                {/* <Header /> */}
            </View>

            <View style={styles.imageContainer}>
                <Image source={shoe.shoe_img ? { uri: `${shoe.shoe_img}` } : require('../assets/placeholder_img.png')} style={styles.coverImage} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.tag}><Text style={styles.fontText}>{shoe.shoe_name}</Text></View>
                    <View style={styles.tag}><Text style={styles.fontText}>{shoe.shoe_color}</Text></View>
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.tag}><Text style={styles.fontText}>Quantity: 25</Text></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Feather name="plus-circle" size={26} color="black" style={{ marginRight: 10 }} />
                        <Feather name="minus-circle" size={26} color="black" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ShoeDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 15,
    },
    imageContainer: {
        height: 360,
        width: "100%",
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'coral',
        marginVertical: 5,
        padding: 5,
        // borderWidth: 6,
        // borderStyle: 'dotted',
        borderBottomColor: 'coral',
        borderBottomWidth: 6,
    },
    coverImage: {
        resizeMode: "contain",
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    fontText: {
        fontSize: 20,
        // fontFamily: fonts.regular,
        fontWeight: "700",
        color: "#444444",
        color: "#444444",
    },
    sizeText: {
        marginTop: 20,
    },
    sizeContainer: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    sizeValueContainer: {
        backgroundColor: "#FFFFFF",
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    sizeValueText: {
        fontSize: 18,
        // fontFamily: fonts.regular,
        fontWeight: "700",
    },
    selectedText: {
        color: "#E55B5B",
    },
    colorContainer: {
        flexDirection: "row",
    },
    borderColorCircle: {
        height: 48,
        width: 48,
        padding: 5,
        marginHorizontal: 5,
    },
    colorCircle: {
        flex: 1,
        borderRadius: 18,
    },
    button: {
        backgroundColor: "#E96E6E",
        height: 62,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "700",
        // fontFamily: fonts.regular,
    },
    tag: {
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
    }
});
