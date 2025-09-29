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
import {fetch} from "expo/fetch";


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { theme } = useTheme();

    async function realizarLogin() {
        let retorno = await fetch("http://10.92.3.202:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim(),
                senha: senha.trim()
            })
        })

        retorno = await retorno.json();

        console.log(retorno);

        if (retorno.error === true) {
            setError(retorno.message);
        }

    }


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
            {error && (
                <Text>{error}</Text>
            )}

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
                <PrimaryButton title="Entrar na Academia" onPress={realizarLogin} />
            )}

            <Text style={styles.serverInfo}>
                Conectando em: {API_URL}
            </Text>

            <FooterLogo />
        </View>
    );
}