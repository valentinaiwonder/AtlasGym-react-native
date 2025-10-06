import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TreinoModal = ({ visible, onClose, onSelectTreino, treinos }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>QUAL SEU TREINO DE HOJE?</Text>
                    {treinos.map((treino) => (
                        <TouchableOpacity
                            key={treino.id}
                            style={styles.option}
                            onPress={() => onSelectTreino(treino)}
                        >
                            <Text style={styles.optionText}>{treino.nome}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default TreinoModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    option: {
        borderWidth: 1,
        borderColor: "#c59aff",
        borderRadius: 10,
        paddingVertical: 8,
        marginVertical: 5,
        alignItems: "center",
    },
    optionText: {
        color: "#5b2ca0",
    },
    button: {
        backgroundColor: "#d5a5ff",
        paddingVertical: 8,
        borderRadius: 10,
        marginTop: 15,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "600",
    },
});