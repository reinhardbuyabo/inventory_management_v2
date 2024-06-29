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

import { AntDesign, Zocial, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';

const ShoeForm = ({ navigation }) => {
    const { register } = useContext(AuthContext);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confPassword, setConfPassword] = useState(null);

    const onSubmit = (n, e, p, c) => {
        if (p !== c) {
            Alert.alert("Password Do Not Match");
        } else {
            register(n, e, p);
        }
    }

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
                    value={name}
                    onChangeText={text => setName(text)}
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
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                    value={Number}
                    onChangeText={text => setPassword(text)}
                />

                {/* Put Shoe Image Here */}
                <InputField
                    label={'Shoe Image'}
                    icon={
                        <FontAwesome5
                            name="file-image"
                            size={20}
                            color="coral"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    value={confPassword}
                    onChangeText={text => setConfPassword(text)}
                />

                {/* Removed an entire view from here */}

                <CustomButton label={'Submit'} onPress={() => { onSubmit(name, email, password, confPassword) }} />

            </ScrollView>
        </SafeAreaView>
    );
};

export default ShoeForm;
