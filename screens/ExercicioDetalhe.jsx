import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ExercicioDetalhe = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { exercicio } = route.params;

    const [series, setSeries] = useState(
        Array.from({ length: exercicio.series }, (_, i) => ({ id: i + 1, done: false }))
    );

    const toggleSerie = (id) => {
        setSeries(series.map(s => s.id === id ? { ...s, done: !s.done } : s));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{exercicio.nome}</Text>
            <Text style={styles.subtitle}>Séries:</Text>

            {series.map(s => (
                <TouchableOpacity
                    key={s.id}
                    style={[styles.serieItem, { backgroundColor: s.done ? '#9B59B6' : '#CBA8F5' }]}
                    onPress={() => toggleSerie(s.id)}
                >
                    <Text style={styles.serieText}>{s.id}ª série</Text>
                </TouchableOpacity>
            ))}

            <View style={styles.buttonsRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#CBA8F5' }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={[styles.buttonText, { color: '#2E0057' }]}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    header: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    subtitle: {
        color: '#DAB6FF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serieItem: {
        padding: 12,
        borderRadius: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    serieText: {
        color: '#fff',
        fontWeight: '600',
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    button: {
        backgroundColor: '#9B59B6',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ExercicioDetalhe;
