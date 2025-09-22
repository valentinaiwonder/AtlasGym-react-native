import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../themeContext";
import {lightColors} from "../colors";

const colors = lightColors

export default function PrimaryButton({ title, onPress }) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.accent,
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: "85%",
        alignItems: "center",
        marginTop: 20,
    },
    text: {
        color: colors.textWhite,
        fontWeight: "bold",
        fontSize: 16,
    },
});
