// HomeScreen.jsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTheme } from "../themeContext";
import api, { API_URL } from "../api";


export default function HomeScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) {
                navigation.replace("Login");
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/rota_protegida`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            } catch (error) {
                Alert.alert("Erro", "Sessão inválida ou expirada.");
                await AsyncStorage.removeItem("authToken");
                navigation.replace("Login");
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        const token = await AsyncStorage.getItem("authToken");
        try {
            await axios.get(`${API_URL}/logout`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (e) {
            console.log("Erro no logout", e);
        }
        await AsyncStorage.removeItem("authToken");
        navigation.replace("Login");
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            color: theme.textBlack,
            fontSize: 20,
            marginBottom: 20,
        },
        button: {
            backgroundColor: theme.accent,
            padding: 12,
            borderRadius: 8,
        },
        buttonText: {
            color: theme.textWhite,
            fontWeight: "bold",
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Bem-vindo(a) {userData?.nome || "Usuário"}!
            </Text>

            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </Pressable>
        </View>
    );
}
