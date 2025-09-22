import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../themeContext";
import {lightColors} from "../colors";


const colors = lightColors

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
            color: colors.accent,
            marginBottom: 5,
            fontSize: 14,
        },
        input: {
            backgroundColor: colors.inputBackground,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            borderRadius: 10,
            padding: 12,
            color: colors.textBlack,
            shadowColor: colors.accent,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 10,
            shadowOpacity: 0.1,
            elevation: 8,
            textShadowColor: colors.accent,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 5,
        },
    });