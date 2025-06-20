import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'

import { onSnapshot, doc } from 'firebase/firestore'
import { auth, db } from '../../config'

import { type Memo } from '../../../types/memo'

const handlePress = (id: string): void => {
    router.push({pathname: '/memo/edit', params: { id }})
}

const Detail = (): JSX.Element => {
    const id = String(useLocalSearchParams().id)
    const [ memo, setMemo] = useState<Memo | null>(null)

    useEffect(() => {
        if (!auth.currentUser) {
            return
        }

        const ref = doc(db, `users/${auth.currentUser?.uid}/memos`, id)
        const unsub =onSnapshot(ref, (memoDoc) => {
            const { bodyText, updatedAt } = memoDoc.data() as Memo
            setMemo({
                id: memoDoc.id,
                bodyText: bodyText,
                updatedAt: updatedAt
            })
        })

        return unsub
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text numberOfLines={1} style={styles.memoTitle}>{memo?.bodyText}</Text>
                <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString('ja-JP')}</Text>
            </View>

            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    {memo?.bodyText}
                </Text>
            </ScrollView>

            <CircleButton style={{top: 60, bottom: 'auto'}} onPress={() => {handlePress(id)}}>
                <Icon name='pencil' size={40}  color='#fff'/>
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19
    },
    memoTitle: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold'
    },
    memoDate: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 16
    },
    memoBody: {
        paddingHorizontal: 27
    },
    memoBodyText: {
        fontSize: 16,
        lineHeight: 24,
        paddingVertical: 32,
        color: '#000'
    }
})

export default Detail
