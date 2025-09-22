import React from "react";
import { Image, StyleSheet } from "react-native";

export default function FooterLogo() {
    return (
        <Image source={require("../assets/logo.png")} style={styles.footerLogo} />
    );
}

const styles = StyleSheet.create({
    footerLogo: {
        width: 100,
        height: 50,
        resizeMode: "contain",
        marginTop: 40,
    },
});
