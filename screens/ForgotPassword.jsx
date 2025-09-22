import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import HeaderLogin from "../components/HeaderLogin";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FooterLogo from "../components/FooterLogo";

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const handleSend = () => {
        if (email) {
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderLogin />

            <Text style={styles.title}>ESQUECI MINHA SENHA</Text>
            <Text style={styles.subtitle}>
                Podemos entrar em contato com você pelo seu e-mail para uma nova senha.
            </Text>

            <InputField
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
            />

            <PrimaryButton title="Enviar e-mail" onPress={handleSend} />

            <FooterLogo />

            {/* MODAL */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalText}>Verifique seu e-mail!</Text>
                        <PrimaryButton
                            title="Reenviar e-mail"
                            onPress={() => {
                                console.log("Reenviar para:", email);
                                // você pode manter o modal ou fechar depois de reenviar
                                setModalVisible(false);
                            }}
                        />
                        <Pressable onPress={() => navigation.goBack()}>
                            <Text style={styles.backText}>Voltar ao login</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        paddingTop: 40,
    },
    title: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    subtitle: {
        color: "#ccc",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    backText: {
        marginTop: 10,
        color: "#9f7aea",
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
});
