import { Image, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext'
import ShoeCard from '../components/ShoeCard';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ShoeForm from './ShoeForm';

const HomeScreen = () => {
    const navigation = useNavigation();
    // Context
    const { logout } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true);
    const [shoes, setShoes] = useState([]);

    const handleProductDetails = (item) => {
        navigation.navigate("Shoe_Details", { item });
    }
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${BASE_URL}/shoes`)
            .then(res => {
                setShoes(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const [modalOpen, setModalOpen] = useState(false); // Not Show By Default


    return (
        !isLoading && (




            <View>
                {/* Modal */}
                <Modal visible={modalOpen}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.modalContent}>
                            <MaterialIcons
                                name='close'
                                size={30}
                                style={{ ...styles.modalToggle, ...styles.modalClose }}
                                onPress={() => setModalOpen(false)}
                            />

                            <ShoeForm />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                {/* Main */}
                <View style={styles.v_wel}>
                    <Text style={styles.welcome}>Welcome Employee</Text>
                </View>

                <FlatList
                    data={shoes}
                    renderItem={({ item }) => (
                        <ShoeCard
                            item={item}
                            handleProductClick={handleProductDetails}
                        />
                    )}
                    ListHeaderComponent={
                        <>
                            <>
                                {/* <Header /> */}
                                <View style={styles.listHeaderComp}>
                                    <Text style={styles.headingText}>Track Shoes</Text>
                                    <View style={styles.top_search_modal}>
                                        <View style={styles.inputContainer}>
                                            {/* Search Icon */}
                                            <Image
                                                source={require("../assets/search.png")}
                                                style={styles.searchIcon}
                                            />
                                            <TextInput placeholder="Search" style={styles.textInput} />
                                        </View>

                                        <MaterialIcons
                                            name='add'
                                            size={30}
                                            style={styles.modalToggle}
                                            onPress={() => setModalOpen(true)}
                                        />
                                    </View>
                                </View>
                            </>
                            {/* <Tags /> */}
                        </>
                    }
                // numColumns={2}
                />
            </View >
        )
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listHeaderComp: {
        marginHorizontal: 20,
        marginHorizontal: 15,
        marginBottom: 20,
    },
    headingText: {
        fontSize: 20,
        color: '#000000',
        marginVertical: 20,
        textAlign: 'center'
    },
    inputContainer: {
        width: "85%",
        backgroundColor: "#FFFFFF",
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        marginRight: 15
    },
    searchIcon: {
        height: 26,
        width: 26,
        marginHorizontal: 12,
    },
    textInput: {
        fontSize: 18,
        // fontFamily: "Poppins-Regular",
    },

    v_wel: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    welcome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    top_search_modal: {
        flexDirection: 'row',
        // alignItems: 'center'
        // alignContent: 'center'
    },

    modalContent: {
        flex: 1,
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
        marginBottom: 150,
    }
})