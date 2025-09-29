import React from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function QuestionModal({visible, question, onConfirm, onCancel, confirmText = "Sim", cancelText = "Não"
              }) {
    return (
        <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onCancel}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Ionicons name="help-circle-outline" size={48} color="#007bff" style={{ marginBottom: 10 }} />
                    <Text style={styles.title}>Pergunta</Text>
                    <Text style={styles.message}>{question}</Text>
                    <View style={styles.buttonsContainer}>
                        <Pressable onPress={onCancel} style={[styles.button, styles.cancelButton]}>
                            <Text style={[styles.buttonText, styles.cancelButtonText]}>{cancelText}</Text>
                        </Pressable>
                        <Pressable onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
                            <Text style={styles.buttonText}>{confirmText}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#f0f4f8",
        borderColor: "#007bff",
        borderWidth: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#007bff"
    },
    message: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: "center"
    },
    confirmButton: {
        backgroundColor: "#007bff"
    },
    cancelButton: {
        backgroundColor: "#e0e0e0"
    },
    buttonText: {
        fontWeight: "bold",
        color: "#fff"
    },
    cancelButtonText: {
        color: "#333"
    }
});
