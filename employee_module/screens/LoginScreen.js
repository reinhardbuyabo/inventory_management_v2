import React, { useState, useContext } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AntDesign, Zocial, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';


// REMOVED SVG IMPORTS HERE

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
// AuthContext
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
    // AuthContext
    const { test, login } = useContext(AuthContext);

    // User Session State => Password and Email
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    {/* <Text>LOGO</Text> */}
                    {/* LOGIN SVG - LOGO WAS HERE */}
                </View>

                <Text
                    style={{
                        // fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Login
                </Text>

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
                    fieldButtonLabel={"Forgot?"}
                    fieldButtonFunction={() => { }}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                {/* Context Test: It is being passed here from above: 'useContext(AuthContext)' */}
                <Text>{test}</Text>
                {/* Login Button */}
                <CustomButton label={"Login"} onPress={() => { login(email, password) }} />

                <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
                    Or, login with ...
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

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>New to the app?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: 'coral', fontWeight: '700' }}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;