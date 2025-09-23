import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import HeaderLogin from "../components/HeaderLogin";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FooterLogo from "../components/FooterLogo";
import { useTheme } from "../themeContext";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { theme } = useTheme();

    const handleLogin = () => {
        if (!email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos");
            return;
        }

        // Simulação de login - depois conecta com sua API
        if (email === "admin@academia.com" && senha === "123456") {
            Alert.alert("Sucesso", "Login realizado!");
            navigation.replace("HomeScreen");
        } else {
            Alert.alert("Erro", "E-mail ou senha incorretos");
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

            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </Pressable>

            <PrimaryButton title="Entrar" onPress={handleLogin} />
            <FooterLogo />
        </View>
    );
}