import { Alert, Image, Keyboard, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from 'react-native'
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext'
import ShoeCard from '../components/ShoeCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import ShoeForm from './ShoeForm';

const HomeScreen = () => {
    const navigation = useNavigation();
    // Context
    const { manager, userToken, logout } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [shoes, setShoes] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (input) => {
        setSearch(input);

        if (input) {
            const newData = shoes.filter(item => {
                const itemData = item.shoe_name.toLowerCase();
                const inputData = input.toLowerCase();
                return itemData.indexOf(inputData) > -1;
            });
            setFilteredData(newData);
        } else {
            setFilteredData(shoes);
        }
    }

    const handleProductDetails = (item) => {
        navigation.navigate("Shoe Details", { item });
    }

    const fetchShoes = async () => {
        axios.get(`${BASE_URL}/shoes`)
            .then(res => {
                setShoes(res.data);
                setFilteredData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            fetchShoes();
        }, [])
    );

    const [modalOpen, setModalOpen] = useState(false); // Not Show By Default

    // hoisted: shoeImg holds the uri
    const [shoeImg, setShoeImg] = useState(null);

    // hoisted
    const openImageLibrary = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }

            if (status === 'granted') {
                const response = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                });

                console.log(response.assets[0]);
                if (!response.canceled) {
                    // console.log(response.assets)
                    setShoeImg(response.assets[0].uri);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (shoeName, shoeColor, numOfShoes, shoe_uri) => {
        console.log(`From UserHomePage: ${shoe_uri}`);
        const stallId = shoes[0]['stall_id'];

        const formData = new FormData();
        formData.append('shoe_name', shoeName);
        formData.append('shoe_color', shoeColor);
        formData.append('num_of_shoes', numOfShoes);
        formData.append('stall_id', stallId);
        formData.append('file', {
            name: `${shoeName}_${shoeColor}_${new Date()}`,
            uri: shoe_uri,
            type: 'image/jpg',
        });

        try {
            const response = await axios.post(`${BASE_URL}/shoes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userToken}`,
                },
            });

            console.log(`From line 116 userhomepage: ${response.data}`);
            Alert.alert("Shoe Added ✅");
            fetchShoes();
            setModalOpen(false);
        } catch (err) {
            console.log(err.message);
            Alert.alert("Error adding shoe ❌. Shoe Already Exists");
        }
    }

    return (
        !isLoading && (
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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

                                    <ShoeForm onSubmit={onSubmit} shoeImage={shoeImg} setShoeImg={setShoeImg} openImageLibrary={openImageLibrary} />
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        {/* Main */}
                        <View style={styles.v_wel}>
                            <Text style={styles.welcome}>Welcome {manager}</Text>
                        </View>

                        <View><Text style={styles.headingText}>Track Shoes</Text></View>
                        <FlatList
                            data={filteredData}
                            renderItem={({ item }) => (
                                <ShoeCard
                                    item={item}
                                    handleProductClick={handleProductDetails}
                                    fetchShoes={fetchShoes}
                                />
                            )}
                            scrollEnabled={true}
                            ListHeaderComponent={
                                <>
                                    <>
                                        {/* <Header /> */}
                                        <View style={styles.listHeaderComp}>

                                            <View style={styles.top_search_modal}>
                                                <View style={styles.inputContainer}>
                                                    {/* Search Icon */}
                                                    <Image
                                                        source={require("../assets/search.png")}
                                                        style={styles.searchIcon}
                                                    />
                                                    <TextInput placeholder="Search" style={styles.textInput} value={search} onChangeText={(input) => handleSearch(input)} autoCapitalize='none' autoCorrect={false} />
                                                </View>

                                                <MaterialIcons
                                                    name='add'
                                                    size={30}
                                                    style={styles.modalToggle}
                                                    onPress={() => setModalOpen(true)}
                                                    color='coral'
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
                </TouchableWithoutFeedback>
            </SafeAreaView>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'coral',
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
        fontSize: 25,
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
        marginBottom: 100,
    }
})