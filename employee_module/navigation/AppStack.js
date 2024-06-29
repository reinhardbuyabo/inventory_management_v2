import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/UserHomePage';
import ShoeDetails from '../screens/ShoeDetails';

const AppStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="UserHome">
            <Stack.Screen name="UserHome" component={HomeScreen} />
            <Stack.Screen name="Shoe_Details" component={ShoeDetails} />
            {/* <Stack.Screen name="AddStock" component={AddStockPage} /> */}
            {/* <Stack.Screen name="EditStock" component={EditStockPage} /> */}
        </Stack.Navigator>
    )
}

export default AppStack