// screens/Login.jsx
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import HeaderLogin from "../components/HeaderLogin";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FooterLogo from "../components/FooterLogo";
import { useTheme } from "../themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { API_URL } from "../api";


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const testarConexaoAPI = async () => {
        try {
            console.log("🔍 Testando conexão com a API...");
            const response = await api.get("/");
            console.log("✅ API respondendo:", response.status);
            return true;
        } catch (error) {
            console.log("❌ Falha na conexão com a API:", error.message);
            return false;
        }
    };

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos");
            return;
        }

        // Primeiro testa se a API está respondendo
        const apiConectada = await testarConexaoAPI();
        if (!apiConectada) {
            Alert.alert(
                "Erro de Conexão",
                `Não foi possível conectar ao servidor:\n${API_URL}\n\nVerifique:\n• Se a API está rodando\n• Se o IP está correto\n• Sua conexão de rede`,
                [{ text: "OK" }]
            );
            return;
        }

        setLoading(true);

        try {
            console.log("🔐 Tentando login...", { email: email.trim().toLowerCase() });

            const response = await api.post("/login", {
                email: email.trim().toLowerCase(),
                senha: senha.trim()
            });

            console.log("✅ Resposta do login:", response.data);

            const { token, message } = response.data;

            if (token) {
                // Salva token no AsyncStorage
                await AsyncStorage.setItem("authToken", token);
                console.log("✅ Token salvo com sucesso");

                Alert.alert("Sucesso", message || "Login realizado com sucesso!");
                navigation.replace("HomeScreen");
            } else {
                Alert.alert("Erro", message || "Token não recebido do servidor");
            }

        } catch (error) {
            console.log("❌ Erro completo no login:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            if (error.response) {
                const { status, data } = error.response;

                switch (status) {
                    case 400:
                        Alert.alert("Erro", data.message || "Dados inválidos");
                        break;
                    case 401:
                        if (data.message && data.message.includes("inativado")) {
                            Alert.alert("Conta Inativada", "Sua conta foi temporariamente desativada. Entre em contato com o administrador.");
                        } else if (data.message && data.message.includes("Tentativas excedidas")) {
                            Alert.alert("Segurança", "Muitas tentativas incorretas. Conta bloqueada por segurança.");
                        } else {
                            Alert.alert("Erro", data.message || "E-mail ou senha incorretos");
                        }
                        break;
                    case 404:
                        Alert.alert("Usuário Não Encontrado", "Verifique seu e-mail e tente novamente");
                        break;
                    case 500:
                        Alert.alert("Erro no Servidor", "Tente novamente em alguns instantes");
                        break;
                    default:
                        Alert.alert("Erro", data?.message || `Erro ${status}`);
                }
            } else if (error.request) {
                Alert.alert(
                    "Sem Conexão",
                    `Não foi possível conectar ao servidor:\n${API_URL}\n\nVerifique sua conexão de internet.`
                );
            } else {
                Alert.alert("Erro Inesperado", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            alignItems: "center",
            paddingTop: 40,
        },
        title: {
            color: theme.text,
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 30,
        },
        forgotPassword: {
            color: theme.accent,
            fontSize: 14,
            marginVertical: 10,
            textDecorationLine: "underline",
        },
        loadingContainer: {
            marginTop: 20,
        },
        serverInfo: {
            color: theme.secondaryText,
            fontSize: 10,
            textAlign: "center",
            marginTop: 10,
            fontStyle: 'italic',
        },
    });

    return (
        <View style={styles.container}>
            <HeaderLogin />
            <Text style={styles.title}>LOGIN ACADEMIA</Text>

            <InputField
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <InputField
                label="Senha"
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                secureTextEntry
            />

            <Pressable
                onPress={() => navigation.navigate("ForgotPassword")}
                style={{ alignSelf: "flex-end", marginRight: 30, marginBottom: 20 }}
            >
                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </Pressable>

            {loading ? (
                <ActivityIndicator size="large" color={theme.accent} style={styles.loadingContainer} />
            ) : (
                <PrimaryButton title="Entrar na Academia" onPress={handleLogin} />
            )}

            <Text style={styles.serverInfo}>
                Conectando em: {API_URL}
            </Text>

            <FooterLogo />
        </View>
    );
}