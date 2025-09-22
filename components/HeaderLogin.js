import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import {darkColors} from "../colors";

const colors = darkColors


export default function HeaderLogin() {
    return (
        <View style={styles.header}>
            <Image source={require("../assets/logoo.png")} style={styles.logo} />
            <Text style={styles.pageText}>Página geral</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 30,
        backgroundColor: colors.background,
        padding: 10,
    },
    logo: {
        width: 70,
        height: 40,
        resizeMode: "contain",
    },
    pageText: {
        color: "#fff",
        fontSize: 14,
    },
});
