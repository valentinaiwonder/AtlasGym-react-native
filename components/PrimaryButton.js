import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../themeContext";

export default function PrimaryButton({ title, onPress }) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: theme.accent,
            paddingVertical: 14,
            paddingHorizontal: 30,
            borderRadius: 10,
            width: "85%",
            alignItems: "center",
            marginTop: 20,
        },
        text: {
            color: theme.textWhite,
            fontWeight: "bold",
            fontSize: 16,
        },
    });

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}