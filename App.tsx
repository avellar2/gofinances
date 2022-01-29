import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { SignIn } from "./src/screens/SignIn";
import { AuthProvider } from "./src/hooks/auth";
import { Routes } from "./src/routes";

export default function App() {
    const [fontLoader] = useFonts({
        Poppins_700Bold,
        Poppins_500Medium,
        Poppins_400Regular,
    });

    if (!fontLoader) {
        return <AppLoading />;
    }

    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="light-content"
            />

            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
    );
}
