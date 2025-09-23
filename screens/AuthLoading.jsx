// AuthLoading.jsx
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLoading({ navigation }) {
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("authToken");
            if (token) {
                navigation.replace("HomeScreen");
            } else {
                navigation.replace("Login");
            }
        };
        checkToken();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
