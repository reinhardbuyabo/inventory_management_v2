import { View, Text, ActivityIndicator, Button } from 'react-native'
import React, { useContext } from 'react'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from '../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native' // NAVIGATIONCONTAINER
import RootDrawerNavigator from '../routes/drawer'
// import { createStackNavigator } from '@react-navigation/stack'

export default function AppNav() {
    // We need our context here
    // const Stack = createStackNavigator();
    const { isLoading, userToken, isLoggedIn, logout } = useContext(AuthContext);

    if (isLoading) {
        // Wrapper View => flex of 1, justifyContent center and alignItems center
        <View>
            {/* Loader of Activity Indicator,, size is gonna be large */}
            <ActivityIndicator />
        </View>
    }

    return (
        <NavigationContainer>
            {/* Check if user token has been set ... display AppStack */}
            {userToken !== null ? (<RootDrawerNavigator.Navigator>
                <RootDrawerNavigator.Screen name='App Stack' component={AppStack} options={{ headerShown: false }} />
                {/* <RootDrawerNavigator.Screen name='About Stack' component={AbtStack} options={{ headerShown: false }} /> */}
                <RootDrawerNavigator.Screen name='Logout' options={{ title: 'Logout', headerShown: false }}>
                    {() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Button title="Logout" onPress={() => logout()} />
                        </View>
                    )}
                </RootDrawerNavigator.Screen>
            </RootDrawerNavigator.Navigator>) : <AuthStack />}

            {/* <AuthStack /> */}
        </NavigationContainer>
    )
}