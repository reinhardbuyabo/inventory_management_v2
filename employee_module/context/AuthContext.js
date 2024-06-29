import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, createContext } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [test, setTest] = useState('Test Value');
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const register = (name, email, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/employee`, {
            name,
            email,
            password,
        }).then((res) => {
            // console.log(res.data);
            const { token } = res.data;
            console.log(token);
            setUserToken(token);
            AsyncStorage.setItem('userToken', token);
            setIsLoading(false);
        }).catch(err => console.log(err));
    }

    const login = (email, password) => {
        setIsLoading(true);
        // API endpoint
        // console.log(email);
        // console.log(password);
        axios.post(`${BASE_URL}/employee/login`, {
            // PASSING THE USERNAME AND PASSWORD WHICH WE'RE GETTING FROM CALLING THE LOGIN FUNCTION
            email: email,
            password: password
        }).then(res => {
            // console.log(res.data);
            // console.log("From then! NO Error")
            const { token } = res.data;
            console.log(token);
            // UPDATE
            setUserToken(token); // example string ... 
            AsyncStorage.setItem('userToken', token);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            console.log("An error must have occured")
        });
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken); // after fetching token
            setIsLoading(false);
        } catch (err) {
            console.log("Is Logged in error " + err);
        }
    }

    return (
        //  should pass value
        <AuthContext.Provider value={{ register, login, logout, isLoading, isLoggedIn, userToken }}>
            {children}
        </AuthContext.Provider>
    );
}