import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    // Button
} from 'react-native';



import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageUpload from '../components/ImageUpload';

const ShoeForm = ({ navigation, onSubmit, shoeImage, openImageLibrary }) => {
    const [shoe_name, setShoeName] = useState(null);
    const [shoe_color, setShoeColor] = useState(null);
    const [num_of_shoes, setNumOfShoes] = useState(null);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}>

                <Text
                    style={{
                        // fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Add Shoe
                </Text>

                <InputField
                    label={'Shoe Name'}
                    icon={
                        <MaterialCommunityIcons
                            name="shoe-sneaker"
                            size={20}
                            color="coral"
                            style={{ marginRight: 5 }}
                        />
                    }
                    value={shoe_name} // first state
                    onChangeText={text => setShoeName(text)}
                />

                <InputField
                    label={'Shoe Color'}
                    icon={
                        <Ionicons
                            name="color-filter"
                            size={20}
                            color="coral"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="default"
                    value={shoe_color} // second state
                    onChangeText={text => setShoeColor(text)}
                />

                <InputField
                    label={'Number of Shoes'}
                    icon={
                        <MaterialIcons
                            name="numbers"
                            size={24}
                            color="coral"
                        />
                    }
                    inputType="number"
                    keyboardType="number-pad"
                    value={num_of_shoes} // third state
                    onChangeText={text => setNumOfShoes(text)}
                />

                {/* FOURTH AND FINAL STATE */}
                <ImageUpload shoeImage={shoeImage} openImageLibrary={openImageLibrary} shoe_name={shoe_name} shoe_color={shoe_color} num_of_shoes={num_of_shoes} onSubmit={onSubmit} />

            </ScrollView>
        </SafeAreaView>
    );
};

export default ShoeForm;
