import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import HeaderLogin from "../components/HeaderLogin";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FooterLogo from "../components/FooterLogo";
import { useTheme } from "../themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { API_URL } from "../api";
import {fetch} from "expo/fetch";
import SuccessMessage from "../components/SucessMessage";
import ErrorMessage from "../components/ErrorMessage";


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [messageText, setMessageText] = useState("");
    const {theme} = useTheme();
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const visibilidadeDaSenha = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    async function realizarLogin() {
        setLoading(true);
        setMessageText("");
        try {
            let retorno = await fetch("http://192.168.1.127:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    senha: senha.trim()
                }),
            });

            console.log(retorno);

            if (!retorno.ok) {
                throw new Error("Erro ao se comunicar com o servidor");
            }

            retorno = await retorno.json();
            console.log(retorno);

            if (retorno && retorno.nome) {
                await AsyncStorage.setItem("nome", retorno.nome);
            }

            if (retorno && retorno.token) {
                await AsyncStorage.setItem("authToken", retorno.token);
                if (retorno.tipo !== 1) {
                    setMessageText("Acesso negado para seu tipo de usuário.");
                    setErrorVisible(true);
                    setSuccessVisible(false);
                    return; // Sai da função, não navega
                }

                setSuccessVisible(true);
                setErrorVisible(false);
                navigation.replace("PaginaInicial");
            }
            if (retorno.error === true || retorno.error === "true") {
                setMessageText(retorno.message || "Erro ao realizar login");
                setErrorVisible(true);
                setSuccessVisible(false);
            } else {
                setMessageText(retorno.message || "Login realizado com sucesso!");
                setSuccessVisible(true);
                setErrorVisible(false);

                if (retorno.token) {
                    await AsyncStorage.setItem("authToken", retorno.token);
                }
            }

        } catch (err) {
            console.log(err)
            setMessageText("Não foi possível conectar ao servidor");
            setErrorVisible(true);
            setSuccessVisible(false);
        } finally {
            setLoading(false);
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
            input: {
                height: 50,
                borderColor: "#ccc",
                borderWidth: 1,
                marginBottom: 15,
                paddingLeft: 10,
            },
            inputContainer: {
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
            },
            eyeIconContainer: {
                position: "absolute",
                right: 10,
                padding: 5,
            },
            eyeIcon: {
                width: 27,
                height: 27,
                marginTop: 9,
            },
        });

        return (
            <View style={styles.container}>

                <HeaderLogin/>
                <Text style={styles.title}>LOGIN</Text>

                <InputField
                    style={styles.input}
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <View style={styles.inputContainer}>
                    <InputField
                        style={styles.input}
                        label="Senha"
                        value={senha}
                        onChangeText={setSenha}
                        placeholder="Digite sua senha"
                        secureTextEntry={!senhaVisivel}
                    />

                    <TouchableOpacity onPress={visibilidadeDaSenha} style={styles.eyeIconContainer}>
                        <Image
                            source={senhaVisivel ? require("../assets/eyeiconview.png") : require("../assets/eyeiconblock.png")}
                            style={styles.eyeIcon}/>
                    </TouchableOpacity>

                </View>

                <Pressable
                    onPress={() => navigation.navigate("ForgotPassword")}
                    style={{alignSelf: "flex-end", marginRight: 30, marginBottom: 20}}
                >
                    <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                </Pressable>

                {loading ? (
                    <ActivityIndicator size="large" color={theme.accent} style={styles.loadingContainer}/>
                ) : (
                    <PrimaryButton title="Entrar" onPress={realizarLogin}/>
                )}

                <Text style={styles.serverInfo}>
                    Conectando em: {"http://10.92.3.155:5000"}
                </Text>

                <FooterLogo/>
                <SuccessMessage
                    visible={successVisible}
                    message={messageText}
                    onClose={() => {
                        setSuccessVisible(false);
                        navigation.replace("PaginaInicial");
                    }}
                />
                <ErrorMessage
                    visible={errorVisible}
                    message={messageText}
                    onClose={() => setErrorVisible(false)}
                />

            </View>
        );
    }
}