// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./themeContext"; // Importe o ThemeProvider

import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator
                    id={"aa"}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}