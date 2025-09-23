import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [stats, setStats] = useState({ hours: 0, muscles: 0, days: 0 });
    const [loading, setLoading] = useState(true);
    const slideAnimation = useState(new Animated.Value(0))[0];
    const navigation = useNavigation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        Animated.timing(slideAnimation, {
            toValue: isMenuOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    const slideTransform = {
        transform: [{
            translateX: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -width * 0.7],
            }),
        }],
    };

    // Buscando dados da API
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://10.92.3.184:5000/stats'); // substitua pela sua rota
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setStats({
                    hours: data.hours || 0,
                    muscles: data.muscles || 0,
                    days: data.days || 0
                });
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
                setStats({ hours: 0, muscles: 0, days: 0 });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.mainContent, slideTransform]}>
                {/* Header */}
                <View style={styles.header}>
                    <Image source={require("../assets/logoo.png")} style={styles.image} />
                    <TouchableOpacity style={styles.menuIconContainer} onPress={toggleMenu}>
                        <View style={styles.menuIconLine} />
                        <View style={styles.menuIconLine} />
                        <View style={styles.menuIconLine} />
                    </TouchableOpacity>
                </View>

                {/* Welcome */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>Bem-vinda, Vivian!</Text>
                </View>

                {/* Card Branco */}
                <View style={styles.card}>
                    <View style={styles.summarySection}>
                        <Text style={styles.summaryTitle}>
                            Sua <Text style={styles.boldText}>semana</Text> de treinos
                        </Text>
                        <Text style={styles.dropdownArrow}>⌄</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#2E0057" />
                        ) : (
                            <>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>{stats.hours}</Text>
                                    <Text style={styles.statLabel}>horas{'\n'}treinadas</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>{stats.muscles}</Text>
                                    <Text style={styles.statLabel}>músculos{'\n'}trabalhados</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Text style={styles.statNumber}>{stats.days}</Text>
                                    <Text style={styles.statLabel}>dias de{'\n'}exercício</Text>
                                </View>
                            </>
                        )}
                    </View>

                    <TouchableOpacity style={styles.progressButton}>
                        <Text style={styles.progressButtonText}>Ver seu progresso</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Sidebar */}
            {isMenuOpen && (
                <View style={styles.sidebar}>
                    <View style={styles.sidebarHeader}>
                        <Image source={require("../assets/icone.png")} style={styles.medalIcon} />
                        <Text style={styles.profileName}>Vivian</Text>
                    </View>
                    <ScrollView style={styles.menuItemsContainer}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("../assets/casa.png")} style={styles.menuItemIcon} />
                            <Text style={styles.menuText}>Página inicial</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("../assets/lista.png")} style={styles.menuItemIcon} />
                            <Text style={styles.menuText}>Área do aluno</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("../assets/editar.png")} style={styles.menuItemIcon} />
                            <Text style={styles.menuText}>Editar informações</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require("../assets/registros.png")} style={styles.menuItemIcon} />
                            <Text style={styles.menuText}>Registros de bioimpedância</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Image source={require("../assets/excluir.png")} style={styles.menuItemIcon} />
                        <Text style={styles.logoutText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Bottom Nav */}
            <View style={styles.bottomNav}>
                <Image source={require("../assets/medalha.png")} style={styles.bottomIcon} />
                <TouchableOpacity style={styles.plusButton}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
                <Image source={require("../assets/halter.png")} style={styles.bottomIcon} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    mainContent: { flex: 1, alignItems: 'center', paddingTop: 20, backgroundColor: '#000' },
    header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 5 },
    menuIconContainer: { width: 30, height: 25, justifyContent: 'space-between' },
    menuIconLine: { width: '100%', height: 4, backgroundColor: '#fff', borderRadius: 2 },
    welcomeSection: { width: '100%', paddingHorizontal: 20, marginBottom: 0 },
    welcomeText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    card: { width: '90%', backgroundColor: '#fff', borderRadius: 12, padding: 20, marginTop: 0, marginBottom: 20 },
    summarySection: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 15 },
    summaryTitle: { fontSize: 18, color: '#000' },
    boldText: { fontWeight: 'bold' },
    dropdownArrow: { fontSize: 18, color: '#000', marginLeft: 5 },
    statsContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
    statItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    statNumber: { fontSize: 60, fontWeight: 'bold', color: '#000', marginRight: 10 },
    statLabel: { fontSize: 16, color: '#000', lineHeight: 20 },
    progressButton: { width: 200, height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CBA8F5', borderWidth: 1, borderColor: '#7A3DC4', alignSelf: 'center' },
    progressButtonText: { color: '#2E0057', fontSize: 16, fontWeight: '600' },
    bottomNav: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#000', borderTopWidth: 1, borderTopColor: '#333', position: 'absolute', bottom: 0 },
    bottomIcon: { width: 60, height: 60, resizeMode: 'contain' },
    plusButton: { width: 55, height: 55, borderRadius: 27.5, backgroundColor: '#CBA8F5', justifyContent: 'center', alignItems: 'center' },
    plusText: { fontSize: 28, color: '#2E0057', fontWeight: 'bold' },
    sidebar: { position: 'absolute', top: 0, right: 0, width: width * 0.7, height: '100%', backgroundColor: '#f8f8f8', paddingTop: 50, borderLeftColor: '#ccc', borderLeftWidth: 1, zIndex: 1 },
    sidebarHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
    medalIcon: { width: 60, height: 60, marginRight: 10 },
    profileName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    menuItemsContainer: { flex: 1 },
    menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
    menuItemIcon: { width: 30, height: 30, resizeMode: 'contain', marginRight: 15 },
    menuText: { fontSize: 16, color: '#333' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 20, borderTopWidth: 1, borderTopColor: '#ddd' },
    logoutText: { fontSize: 16, color: '#f00', marginLeft: 10 },
});

export default App;
