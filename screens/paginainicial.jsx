import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';


const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://i.imgur.com/your-logo-here.png' }} // Substitua pelo link do seu logo
                    style={styles.logo}
                />
                <TouchableOpacity style={styles.menuIconContainer}>
                    <View style={styles.menuIconLine} />
                    <View style={styles.menuIconLine} />
                    <View style={styles.menuIconLine} />
                </TouchableOpacity>
            </View>

            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Bem-vinda, Vivian!</Text>
            </View>

            {/* Week Summary */}
            <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Sua <Text style={styles.boldText}>semana</Text> de treinos</Text>
                <Text style={styles.dropdownArrow}>⌄</Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>6</Text>
                    <Text style={styles.statLabel}>horas{'\n'}treinadas</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>músculos{'\n'}trabalhados</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>4</Text>
                    <Text style={styles.statLabel}>dias de{'\n'}exercício</Text>
                </View>
            </View>

            {/* Progress Button */}
            <TouchableOpacity>
                <LinearGradient
                    colors={['#A366D3', '#C798E6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.progressButton}
                >
                    <Text style={styles.progressButtonText}>Ver seu progresso</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Image
                    source={{ uri: 'https://i.imgur.com/your-medal-icon.png' }} // Substitua pelo link do ícone
                    style={styles.navIcon}
                />
                <TouchableOpacity style={styles.plusButton}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
                <Image
                    source={{ uri: 'https://i.imgur.com/your-dumbbell-icon.png' }} // Substitua pelo link do ícone
                    style={styles.navIcon}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 40,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    menuIconContainer: {
        width: 30,
        height: 25,
        justifyContent: 'space-between',
    },
    menuIconLine: {
        width: '100%',
        height: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    welcomeSection: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    summarySection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    summaryTitle: {
        fontSize: 20,
        color: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
    },
    dropdownArrow: {
        fontSize: 24,
        color: '#fff',
        marginLeft: 5,
    },
    statsContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    statNumber: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 15,
    },
    statLabel: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 20,
    },
    progressButton: {
        width: 250,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    progressButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomNav: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#333',
        position: 'absolute',
        bottom: 0,
    },
    navIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    plusButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#A366D3',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    plusText: {
        fontSize: 40,
        color: '#fff',
    },
});

export default App;