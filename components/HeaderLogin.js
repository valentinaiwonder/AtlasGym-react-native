import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../themeContext";

export default function HeaderLogin() {
    const { theme, toggleTheme } = useTheme();

    const styles = StyleSheet.create({
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 20,
            marginBottom: 30,
            backgroundColor: theme.textBlack,
            padding: 10,
        },
        logo: {
            width: 70,
            height: 40,
            resizeMode: "contain",
        },
        pageText: {
            color: theme.text,
            fontSize: 14,
        },
        themeToggle: {
            padding: 8,
            borderRadius: 5,
            backgroundColor: theme.accent,
        },
        themeToggleText: {
            color: theme.textWhite,
            fontWeight: 'bold',
        }
    });

    return (
        <View style={styles.header}>
            <Image source={require("../assets/logoo.png")} style={styles.logo} />
            <Pressable style={styles.themeToggle} onPress={toggleTheme}>
                <Text style={styles.themeToggleText}>Mudar Tema</Text>
            </Pressable>
        </View>
    );
}