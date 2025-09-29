import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal, Alert } from "react-native";
import HeaderLogin from "../components/HeaderLogin";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FooterLogo from "../components/FooterLogo";
import { useTheme } from "../themeContext";
import api, { API_URL } from "../api";

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useTheme();

    const handleSend = () => {
        if (!email) {
            Alert.alert("Erro", "Por favor, digite seu e-mail");
            return;
        }
        setModalVisible(true);
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
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 15,
        },
        subtitle: {
            color: theme.secondaryText,
            fontSize: 14,
            textAlign: "center",
            marginBottom: 20,
            paddingHorizontal: 20,
        },
        backText: {
            marginTop: 10,
            color: theme.accent,
            fontSize: 14,
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.7)",
            justifyContent: "center",
            alignItems: "center",
        },
        modalBox: {
            backgroundColor: theme.modalBackground,
            padding: 20,
            borderRadius: 10,
            width: "80%",
            alignItems: "center",
        },
        modalText: {
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 15,
            color: theme.text,
        },
        voltar: {
            color: theme.accent,
            fontSize: 14,
            marginVertical: 10,
        },
    });

    return (
        <View style={styles.container}>
            <HeaderLogin />
            <Text style={styles.title}>ESQUECI MINHA SENHA</Text>
            <Text style={styles.subtitle}>
                Digite seu e-mail para recuperar a senha
            </Text>

            <InputField
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
            />

            <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.voltar}>Voltar</Text>
            </Pressable>
            <PrimaryButton title="Enviar e-mail" onPress={handleSend} />
            <FooterLogo />

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>E-mail enviado!</Text>
                        <PrimaryButton title="OK" onPress={() => {
                            setModalVisible(false);
                            navigation.goBack();
                        }} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}