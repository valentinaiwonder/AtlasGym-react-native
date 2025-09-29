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
            padding: 10,
            backgroundColor: theme.textBlack,
        },
        logo: {
            width: 70,
            height: 40,
            resizeMode: "contain",
        },
        themeToggle: {
            padding: 8,
            borderRadius: 5,
            backgroundColor: theme.accent,
        },
        themeToggleText: {
            color: theme.textWhite,
            fontWeight: 'bold',
            fontSize: 12,
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