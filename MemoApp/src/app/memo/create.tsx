import { View, TextInput, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { JSX, useState } from 'react'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'

import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '../../config'

const handlePress = async (bodyText: string): Promise<void> => {
    if (!auth.currentUser) {
        console.log('ユーザーが存在しません')
        return
    }

    console.log('bodyText', bodyText)

    try {
        const docRef = await addDoc(collection(db, `users/${auth.currentUser?.uid}/memos`), {
            bodyText: bodyText,
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date())
        })
        console.log('success', docRef.id)
        router.back()
    } catch (error) {
        console.log(error)
    }
}

const Create = (): JSX.Element => {
    const [bodyText, setBodyText] = useState('')

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText={(text) => setBodyText(text)}
                    placeholder='メモを入力してください'
                    autoFocus
                />
            </View>

            <CircleButton onPress={() => {handlePress(bodyText)}}>
                <Icon name='check' size={40} color='#fff' />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }
})

export default Create
