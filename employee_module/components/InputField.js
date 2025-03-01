import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
    value,  // additional props
    onChangeText,
}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 8,
                marginBottom: 25,
            }}>
            {icon}
            {inputType == 'password' ? (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }} // to cover the entire field
                    secureTextEntry={true}
                    value={value}
                    onChangeText={onChangeText}
                />
            ) : (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }}
                    value={value}
                    onChangeText={onChangeText}
                />
            )}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <Text style={{ color: 'coral', fontWeight: '700' }}>{fieldButtonLabel}</Text>
            </TouchableOpacity>
        </View>
    );
}
