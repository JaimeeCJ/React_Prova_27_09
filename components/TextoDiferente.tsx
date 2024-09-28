import { Button, StyleSheet, Text } from "react-native";

export default function TextoDiferente() {
    return (
        <Text style={styles.corTexto}>Texto</Text>
    )
}

const styles = StyleSheet.create({
    corTexto: {
        color: "#59A79B"
    }
})