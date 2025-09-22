import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import HeaderLogin from "../components/HeaderLogin";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FooterLogo from "../components/FooterLogo";
import { useTheme } from "../themeContext";

export default function Login() {
    const { colors } = useTheme();

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = () => {
        console.log("Login com:", email, senha);
    };

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

            {/* Link para esqueci senha */}
            <Pressable
                onPress={() => navigation.navigate("ForgotPassword")}
                style={{ alignSelf: "flex-end", marginRight: 30 }}
            >
                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </Pressable>

            <PrimaryButton title="Entrar" onPress={handleLogin} />

            <Pressable>
                <Text style={styles.registerLink}>Ainda não tenho uma conta</Text>
            </Pressable>

            <FooterLogo />
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            alignItems: "center",
            paddingTop: 40,
        },
        title: {
            color: colors.text,
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 30,
        },
        forgotPassword: {
            color: colors.secondaryText,
            fontSize: 14,
            marginVertical: 10,
        },
        registerLink: {
            color: colors.secondaryText,
            fontSize: 14,
            marginTop: 20,
        },
    });

}
