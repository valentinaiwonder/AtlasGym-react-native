import React, { useEffect } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ErrorMessage({ visible, message, onClose, autoClose = true, duration = 2000 }) {

    useEffect(() => {
        if (visible && autoClose) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Ionicons name="close-circle" size={48} color="#dc3545" style={{ marginBottom: 10 }} />
                    <Text style={styles.title}>Opa...</Text>
                    <Text style={styles.message}>{message}</Text>
                    <Pressable onPress={onClose} style={styles.button}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex:1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#F8D7DA",
        borderColor: "#DC3545",
        borderWidth: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    message: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 15
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        backgroundColor: "#DC3545"
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    }
});
