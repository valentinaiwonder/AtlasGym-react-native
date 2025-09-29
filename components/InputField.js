import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../themeContext";

export default function InputField({ label, value, onChangeText, placeholder, secureTextEntry }) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        inputContainer: {
            width: "85%",
            marginBottom: 20,
        },
        label: {
            color: theme.accent,
            marginBottom: 5,
            fontSize: 14,
            fontWeight: "bold",
        },
        input: {
            backgroundColor: theme.inputBackground,
            borderWidth: 1,
            borderColor: theme.inputBorder,
            borderRadius: 10,
            padding: 12,
            color: theme.text,
            fontSize: 16,
        },
    });

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