import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { JSX, useState } from 'react'
import { Link, router } from 'expo-router'

import Button from '../../components/Button'

const handlePress = (): void => {
    // ログイン
    router.replace('/memo/list')
}

const Login = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput 
                    style={styles.input} 
                    value={email}
                    placeholder='Email address'
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.input} 
                    value={password}
                    placeholder='Password'
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    textContentType='password'
                />

                <Button label='Submit' onPress={handlePress} />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <Link href='/auth/signup' asChild>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Sign up here!</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8'
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16
    },
    footer: {
        flexDirection: 'row'
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#000'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3'
    }
})

export default Login
