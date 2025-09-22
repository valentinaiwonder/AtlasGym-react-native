import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function InputField({ label, value, onChangeText, placeholder, secureTextEntry }) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#666"
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "85%",
        marginBottom: 20,
    },
    label: {
        color: "#d6a9ff",
        marginBottom: 5,
        fontSize: 14,
    },
    input: {
        backgroundColor: "#111",
        borderWidth: 1,
        borderColor: "#9f7aea",
        borderRadius: 10,
        padding: 12,
        color: "#fff",
    },
});
