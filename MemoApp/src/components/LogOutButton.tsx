import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native"
import { JSX } from "react"
import { router } from "expo-router"

import { signOut } from "firebase/auth"
import { auth } from "../config"

const handlePress = (): void => {
    signOut(auth)
    .then(() => {
        router.replace('/auth/login')
    })
    .catch((error) => {
        console.log(error)
        Alert.alert(error.message)
    })
}

const LogOutButton = (): JSX.Element => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text}>ログアウト</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        lineHeight: 24,
        color: 'rgba(255, 255, 255, 0.7)'
    }
})

export default LogOutButton
