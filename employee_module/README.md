# Mobile
`npx expo init employee_module --template blank`

## Dependencies To Use
- `npm i react-native-svg`
- `npm i react-native-svg-transformer`
- `npm i reacct-native-vector-icons`

<!-- React Navigation v6 -->
- `npm i @react-navigation/native`
- `npm i @react-navigation/native-stack`

## Styles To Use
```javascript
{
    sav: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:
    }, 
    touchable_opacity_as_btn: {
        background:
        padding:
        width: "90%",
        borderRadius:
        flexDirection:
        justifyContent:
        marginBottom: 50
    },
    shs_txt: {

    },
    lb_txt: {

    }
}
```

## Components

## `react-native.config.js`
```
module.exports ={
    project: {
        ios: {},

    }
}
```

## `metro.config.js`


## Navigation
- ``
- home screen from main screen.

```
const Stack = createStackNaviagtor();


const App  = () => {
    <NavigationContainer>
        <StackNavigator>
            <Stack.Screen component={Main} name="Main" options={{headerShown: false}} /> --> 
        </StackNavigator>
    </NavigationContainer>
}

const Main = () => {
    <SafeAreaView>
        <View>
        </View>

        <!-- Goes To Home -->
        <TouchableOpacity onPress={() => navigation.navigate('Home')} >
        </TouchableOpacity>
    </SafeAreaView>
}
```

- `mkdir screens`


## `Dimensions.js`

## Home Screen
- HomeScrens.js

- SafeAreaView
- ScrollView

<!-- View 1 -->
- Text -> Hello message
- View = style = {flex: 1, backgroundColor}
- Text style= fontSize:16, fontFamily: Roboto Medium
- ImageBackground => source, style, imageStyle={{borderRadius: 15}\}
```
{
    hello_jd_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin-Bottom: 20,
    }, 
}
```

<!-- View 2 -->
### Search Bar
- View 
- TextInput: props: placeholder="Search"
- Feather /> from react native feather icons/Feather => props: name:"Seach color, style: { marginRight: 5 }
```
search_view: {
    flexDirection: row,
    borderColor: 
    borderWidth 1
    borderRadius: 8
    paddingHoriozonatl: 8
    paddingVertical
}
```

<!-- View 3 -->
View
Text
TouchableOpacity


### Carousel
- `npm i react-native-snap-carousel`

- Carousel

```
<Carousel
ref=(c => { this._carousel = c })
data={this.state.entries} // slideData
renderItem={this._renderItem}
sliderWidth={sliderWidth}
itemWidth={itemWidth}
loop={true}
/>
```

- Create component
- <BannerSlide.js>
- 

### CustomSwitch

```
const [getSelectionMode, setSelectionMode] = useState(selectionMode);

const updateSwithcData = value => {

}

```


```
{
    t_opacity: {
        flex: 1,
        bgColor: getSelectionMode == 1 ? 'white' : 'purple',
        
    }
}
```

### AsyncStorage
- `npm i @react-native-async-storage/async-storage`
- Usage within AuthContext

### UserHomePage:
```js
 <View>
            <FlatList
                data={ }
                renderItem={ }
                // ListHeaderComponent
                ListHeaderComponent={
                    <>
                        <>
                            <Header />
                            <View>
                                <Text style={styles.headingText}>Match Your Style</Text>
                                <View style={styles.inputContainer}>
                                    <Image
                                        source={require("../assets/search.png")}
                                        style={styles.searchIcon}
                                    />
                                    <TextInput placeholder="Search" style={styles.textInput} />
                                </View>
                            </View>
                        </>
                        <Tags />
                    </>
                }
            />
        </View>
```

### ShoeCard.js
```js
const img = item.shoe_img.split('/');
    img.shift();
    img.shift();
    img.unshift('..');
    const img_str = img.join('/');
    // const img_str = img
    console.log(img_str);
```

- Proposed Solution for frontend:
```js
const images = ['image1.png', 'image2.png']; // Array of image paths

return (
  <View>
    {images.map((image, index) => (
      <Image key={index} source={require(`./assets/${image}`)} style={styles.image} />
    ))}
  </View>
);
```

### Images From Frontend
- ImageUpload.js
```js
<View style={styles.container}>
<View>
<TouchableOpacity>
    <Text>Upload Image</Text>
</TouchableOpacity>
    <Text>Skip</Text>
</View>

</View>

return <ImageUpload>

const openImageLibarary() => {
    const response = await ImagePicker.reqeustMediaLibraryPermissionsAsync();

    console.log(resons)
}
```

```js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ImageUpload = () => {
    const openImageLibrary = async () => {
        const response = await ImagePicker.requestMediaLibraryPermissionsAsync();

        console.log(response);

        if (response.status !== 'granted') {
            alert("We Need Camera");
        }

        if (response.status === 'granted') {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={openImageLibrary}>
                    <Text>Upload Image</Text>
                </TouchableOpacity>
                <Text>Skip</Text>
            </View>

        </View>
    )
}

export default ImageUpload

const styles = StyleSheet.create({})
```
