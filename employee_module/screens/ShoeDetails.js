import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Modal, TextInput, Button, Keyboard, Alert } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";


const ShoeDetails = () => {
    const route = useRoute();
    const { userToken, fetchShoes } = useContext(AuthContext);
    const shoe = route.params.item;
    const navigation = useNavigation();

    const [numOfShoes, setNumOfShoes] = useState(shoe.num_of_shoes);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const increment = (value = 1) => setNumOfShoes(numOfShoes + value);
    const decrement = (value = 1) => setNumOfShoes(Math.max(0, numOfShoes - value)); // Ensure quantity doesn't go below 0

    const handleSetQuantity = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            console.log(route.params);
            setNumOfShoes(value);
            setModalVisible(false);
        }
    };

    const updateDatabase = async () => {
        try {
            // console.log(shoe);
            // console.log(numOfShoes);
            const res = await axios.put(`${BASE_URL}/shoes/`, { shoe_id: shoe.shoe_id, stall_id: shoe.stall_id, num_of_shoes: numOfShoes },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            // console.log('Database updated successfully');
            if (res) {
                console.log(res.data);
            }
        } catch (error) {
            console.error('Error updating database:', error);
        }
    };
    useFocusEffect(
        useCallback(() => {
            return () => {
                updateDatabase();
                // fetchShoes();
            };
        }, [])
    );

    const img = shoe.shoe_img ? { uri: shoe.shoe_img } : require('../assets/placeholder_img.png');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Header /> */}
            </View>

            <View style={styles.imageContainer}>
                {/* PROBLEM WITH DYNAMIC RENDERING */}
                <Image source={require('../assets/uploads/placeholder_img.png')} style={styles.coverImage} />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.tag}><Text style={styles.fontText}>{shoe.shoe_name}</Text></View>
                    <View style={styles.tag}><Text style={styles.fontText}>{shoe.shoe_color}</Text></View>
                </View>

                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.tag}><Text style={styles.fontText}>Quantity: {numOfShoes}</Text></View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => increment()}
                            onLongPress={() => setModalVisible(true)}
                        >
                            <Feather name="plus-circle" size={30} color="green" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => decrement()}
                            onLongPress={() => setModalVisible(true)}
                        >
                            <Feather name="minus-circle" size={30} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View>

                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.modalContent}>
                            <MaterialIcons
                                name='close'
                                size={30}
                                style={{ ...styles.modalToggle, ...styles.modalClose }}
                                onPress={() => setModalVisible(false)}
                            />

                            <View>
                                <InputField
                                    label={`${shoe.num_of_shoes}`}
                                    icon={
                                        <MaterialIcons
                                            name="numbers"
                                            size={24}
                                            color="coral"
                                        />
                                    }
                                    inputType="number"
                                    keyboardType="number-pad"
                                    value={inputValue} // third state
                                    onChangeText={text => setInputValue(text)}
                                />
                                <CustomButton label={'Update Quantity'} plache onPress={handleSetQuantity} />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
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
        height: 420,
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
    },
    modalContent: {
        // flex: 1,
        padding: 50,
    },
    modalToggle: {
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 10,
        alignSelf: 'center', // brings it to the center
        // backgroundColor: 'coral'
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'coral',
        shadowOpacity: 0.3
    },
    modalClose: {
        marginTop: 25,
        marginBottom: 100,
    }
});
``