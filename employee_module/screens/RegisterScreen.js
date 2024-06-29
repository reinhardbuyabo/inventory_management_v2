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

import { AntDesign, Zocial, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
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
                <View style={{ alignItems: 'center' }}>
                    {/* Registration SVG - LOGOS was here */}
                    <FontAwesome5 name="cash-register" size={24} color="black" />
                    {/* <Text>R</Text> */}
                </View>

                <Text
                    style={{
                        // fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Register
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 30,
                    }}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        {/* <Text>G</Text> */}
                        <AntDesign name="google" size={24} color="black" />
                        {/* GOOGLE SVG WAS HERE */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        {/* <Text>F</Text> */}
                        <Zocial name="facebook" size={24} color="black" />
                        {/* FACEBOOK SVG WAS HERE */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        {/* TWITTER SVG WAS HERE */}
                        <FontAwesome6 name="x-twitter" size={24} color="black" />
                        {/* <Text>T</Text> */}
                    </TouchableOpacity>
                </View>

                <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
                    Or, register with email ...
                </Text>

                <InputField
                    label={'Full Name'}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    value={name}
                    onChangeText={text => setName(text)}
                />

                <InputField
                    label={'Email ID'}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <InputField
                    label={'Password'}
                    icon={
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <InputField
                    label={'Confirm Password'}
                    icon={
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    value={confPassword}
                    onChangeText={text => setConfPassword(text)}
                />

                {/* Removed an entire view from here */}

                <CustomButton label={'Register'} onPress={() => { onSubmit(name, email, password, confPassword) }} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'coral', fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
