import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

import { StackActions } from '@react-navigation/native';


import CustomButton from './CustomButton';

const ImageUpload = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    // OPEN IMAGE LIBRARY: HOISTED
                    onPress={props.openImageLibrary}
                    style={styles.uploadBtnContainer}
                >
                    {props.shoeImage ? (
                        <Image
                            source={{ uri: props.shoeImage }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <Text style={styles.uploadBtn}>Upload Shoe Image</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.skip}>Skip</Text>
                {props.shoeImage ? (
                    <>
                        {/* Custom Button Instead of Upload */}
                        <CustomButton label={'Submit'} onPress={() => { props.onSubmit(props.shoe_name, props.shoe_color, props.num_of_shoes, props.shoeImage) }} />
                    </>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBtnContainer: {
        height: 125,
        width: 125,
        borderRadius: 125 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderColor: 'coral',
        borderWidth: 1,
        overflow: 'hidden',
    },
    uploadBtn: {
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.3,
        fontWeight: 'bold',
    },
    skip: {
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: 'white'
    },
});

export default ImageUpload;