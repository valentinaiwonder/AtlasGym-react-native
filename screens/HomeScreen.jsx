import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useTheme } from "../themeContext";

export default function HomeScreen({ navigation }) {
    const { theme } = useTheme();

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Deseja realmente sair?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    onPress: () => navigation.replace("Login")
                }
            ]
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
        },
        welcomeText: {
            color: theme.text,
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
        },
        button: {
            backgroundColor: theme.accent,
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 10,
            marginTop: 20,
        },
        buttonText: {
            color: theme.textWhite,
            fontWeight: "bold",
            fontSize: 16,
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Bem-vindo(a) à Academia!
            </Text>

            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </Pressable>
        </View>
    );
}