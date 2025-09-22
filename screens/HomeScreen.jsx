import React, { useState } from "react";
import {StyleSheet} from "react-native";
import HeaderLogin from "../components/HeaderLogin";
export default function HomeScreen() {
    return (
        <View styles={style.container}>
            <HeaderLogin />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        paddingTop: 40,
    },
});