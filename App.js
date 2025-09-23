import React from "react";
import { ThemeProvider } from "./themeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthLoading from "./screens/AuthLoading";
import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="AuthLoading"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="AuthLoading" component={AuthLoading} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}