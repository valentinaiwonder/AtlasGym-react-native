import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../themeContext";
import api, { API_URL } from "../api";
import { fetch } from "expo/fetch";


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
                // 1. MUDANÇA: Substituindo axios.get por fetch
                const response = await fetch(`${API_URL}/rota_protegida`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Envio do token
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    // Se a resposta for um erro HTTP (ex: 401), lança um erro
                    throw new Error("Falha na requisição: " + response.status);
                }

                const data = await response.json(); // Processa a resposta JSON
                setUserData(data);

            } catch (error) {
                console.error("Erro na requisição da rota protegida:", error);
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
            // 2. MUDANÇA: Substituindo axios.get por fetch para o logout
            await fetch(`${API_URL}/logout`, {
                method: 'GET', // Ajuste para 'POST' se o seu backend esperar um POST
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // A recomendação é sempre limpar o token local, mesmo que a chamada ao servidor falhe
        } catch (e) {
            console.log("Erro no logout no servidor, limpando token local...", e);
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