// screens/AuthLoading.jsx
import api, { API_URL } from "../api";
import React, { useEffect } from "react";
import { View, ActivityIndicator, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLoading({ navigation }) {
    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log(" Verificando autenticação...");
                const token = await AsyncStorage.getItem("authToken");

                if (!token) {
                    console.log(" Nenhum token encontrado, redirecionando para Login");
                    navigation.replace("Login");
                    return;
                }

                console.log(" Token encontrado, validando com a API...");

                try {
                    const response = await api.get("/");
                    console.log(" API está respondendo");
                } catch (apiError) {
                    console.log(" API não está respondendo:", apiError.message);
                    Alert.alert(
                        "Erro de Conexão",
                        "Não foi possível conectar ao servidor. Verifique se a API está rodando.",
                        [{ text: "OK", onPress: () => navigation.replace("Login") }]
                    );
                    return;
                }


                try {
                    await api.get("/logout");
                    console.log(" Token válido, indo para HomeScreen");
                    navigation.replace("HomeScreen");
                } catch (error) {
                    if (error.response?.status === 401) {
                        console.log(" Token inválido ou expirado");
                        await AsyncStorage.removeItem("authToken");
                        Alert.alert("Sessão Expirada", "Faça login novamente");
                    }
                    navigation.replace("Login");
                }

            } catch (error) {
                console.error(" Erro geral:", error);
                Alert.alert("Erro", "Ocorreu um erro inesperado");
                navigation.replace("Login");
            }
        };

        checkAuth();
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#9f7aea" }}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ marginTop: 10, color: "#ffffff", fontSize: 16 }}>Conectando com a academia...</Text>
        </View>
    );
}