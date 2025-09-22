import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import ForgotPassword from "./screens/ForgotPassword";
import PaginaInicial from "./screens/paginainicial";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                id={"aa"}
                screenOptions={{
                    headerShown: false,
                }}
            >
                {}
                <Stack.Screen name="PaginaInicial" component={PaginaInicial} />

                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}