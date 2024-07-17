import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/UserHomePage';
import ShoeDetails from '../screens/ShoeDetails';
import Header from '../shared/header';
import { createDrawerNavigator } from '@react-navigation/drawer';

const AppStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="UserHome">
            <Stack.Screen name="UserHome" component={HomeScreen} options={
                ({ navigation }) => {
                    return { headerTitle: () => <Header navigation={navigation} title="ShoesHere" /> }
                }
            } />
            <Stack.Screen name="Shoe Details" component={ShoeDetails} />
            {/* <Stack.Screen name="AddStock" component={AddStockPage} /> */}
            {/* <Stack.Screen name="EditStock" component={EditStockPage} /> */}
        </Stack.Navigator>
    )
}

export default AppStack