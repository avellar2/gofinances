import React from "react";
import { Dashboard } from "./src/screens/Dashboard";
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

export default function App() {

    const [fontLoader] = useFonts({
        Poppins_700Bold,
        Poppins_500Medium,
        Poppins_400Regular
    })

    if (!fontLoader) {
        return <AppLoading/>
    }

    return (
        <ThemeProvider theme={theme}>
            <StatusBar backgroundColor='transparent' translucent barStyle='light-content'/>
            <Dashboard />
        </ThemeProvider>
    );
}
