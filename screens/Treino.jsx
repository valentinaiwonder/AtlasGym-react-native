// pages/Treino.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Treino = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { treino } = route.params;
    const [exercicios, setExercicios] = useState([]);

    useEffect(() => {
        fetch(`http://10.92.3.201:5000/exercicios/${treino.id}`)
            .then(res => res.json())
            .then(data => setExercicios(data))
            .catch(err => console.error('Erro ao buscar exercícios:', err));
    }, []);

    const toggleCheck = (id) => {
        setExercicios(exercicios.map(e => e.id === id ? { ...e, feito: !e.feito } : e));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{treino.nome}</Text>
            <Text style={styles.subtitle}>Exercícios:</Text>

            <FlatList
                data={exercicios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('ExercicioDetalhe', { exercicio: item })}
                    >
                        <View
                            style={[styles.circle, { backgroundColor: item.feito ? '#9B59B6' : '#ccc' }]}
                        />
                        <Text style={styles.itemText}>{item.nome} {item.series}x{item.reps}</Text>

                        <TouchableOpacity onPress={() => toggleCheck(item.id)}>
                            <Text style={styles.checkButton}>{item.feito ? '✓' : '○'}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={styles.finishButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.finishText}>Fim do treino</Text>
            </TouchableOpacity>
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
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    subtitle: {
        color: '#DAB6FF',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CBA8F5',
        borderRadius: 12,
        marginVertical: 6,
        padding: 10,
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 10,
    },
    itemText: {
        flex: 1,
        color: '#2E0057',
        fontSize: 16,
        fontWeight: '600',
    },
    checkButton: {
        fontSize: 20,
        color: '#2E0057',
    },
    finishButton: {
        marginTop: 20,
        backgroundColor: '#DAB6FF',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
    },
    finishText: {
        color: '#2E0057',
        fontWeight: 'bold',
    },
});

export default Treino;
