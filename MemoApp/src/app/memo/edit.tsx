import { View, TextInput, StyleSheet, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { JSX, useEffect, useState } from 'react'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'

import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db, auth } from '../../config'

const handlePress = (id: string, bodyText: string): void => {
    if (!auth.currentUser) {
        return
    }

    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    setDoc(ref, {
        bodyText: bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    })
    .then(() => {
        router.back()
    })
    .catch((error) => {
        console.log('error', error)
        Alert.alert('ERROR', 'メモの保存に失敗しました')
    })
}

const Edit = (): JSX.Element => {
    const id = String(useLocalSearchParams().id)
    const [bodyText, setBodyText] = useState<string>('')

    useEffect(() => {
        if (!auth.currentUser) {
            return
        }

        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
        getDoc(ref)
         .then((docRef) => {
            setBodyText(docRef?.data()?.bodyText)
         })
         .catch((error) => {
            console.log('error', error)
         })
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    autoFocus={true}
                    onChangeText={(text) => {
                        setBodyText(text)
                    }}
                />
            </View>

            <CircleButton onPress={() => {handlePress(id, bodyText)}}>
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

export default Edit
