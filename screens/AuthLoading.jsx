import React, { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";

export default function AuthLoading({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#9f7aea" />
            <Text style={{ marginTop: 10, color: "#666" }}>Carregando...</Text>
        </View>
    );
}