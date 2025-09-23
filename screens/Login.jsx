// Login.jsx
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import HeaderLogin from "../components/HeaderLogin";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FooterLogo from "../components/FooterLogo";
import { useTheme } from "../themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_URL from "../api"; // 👈 arquivo api.js com http://10.0.2.2:5000

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { theme } = useTheme();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                senha,
            });

            const { token, message } = response.data;

            if (token) {
                // guarda token no AsyncStorage
                await AsyncStorage.setItem("authToken", token);
                // redireciona para HomeScreen
                navigation.replace("HomeScreen");
            } else {
                Alert.alert("Erro", message || "Falha no login.");
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Erro", error.response.data.message || "Credenciais inválidas.");
            } else {
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            }
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
            color: theme.textBlack,
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 30,
        },
        forgotPassword: {
            color: theme.secondaryText,
            fontSize: 14,
            marginVertical: 10,
        },
    });

    return (
        <View style={styles.container}>
            <HeaderLogin />
            <Text style={styles.title}>LOGIN</Text>

            <InputField
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
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
                style={{ alignSelf: "flex-end", marginRight: 30 }}
            >
                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </Pressable>

            <PrimaryButton title="Entrar" onPress={handleLogin} />

            <FooterLogo />
        </View>
    );
}
