import { View, StyleSheet, FlatList } from 'react-native'
import { JSX, useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'

import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import LogOutButton from '../../components/LogOutButton'

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db, auth } from '../../config'

import { type Memo } from '../../../types/memo'

const handlePress = (): void => {
    router.push('/memo/create')
}

const List = (): JSX.Element => {
    const [memos, setMemos] = useState<Memo[]>([])

    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: (): JSX.Element => { return <LogOutButton /> }
        })
    }, [])

    useEffect(() => {
        if (!auth.currentUser) {
            console.log('ユーザーが存在しません')
            return
        }

        const ref = collection(db, `users/${auth.currentUser?.uid}/memos`)
        const q = query(ref, orderBy('updatedAt', 'desc'))
        const unsub =onSnapshot(q, (snapshot) => {
            const remoteMemos: Memo[] = []
            snapshot.forEach((doc) => {
                console.log('memo', doc.id, doc.data())
                const { bodyText, updatedAt} = doc.data()
                remoteMemos.push({
                    id: doc.id,
                    bodyText,
                    updatedAt
                })
            })
            console.log('remoteMemos', remoteMemos)
            setMemos(remoteMemos)
        })

        return unsub
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem={({item}) => <MemoListItem memo={item} /> }
                keyExtractor={(item) => item.id}
            />

            <CircleButton onPress={handlePress}>
                <Icon name='plus' size={40}  color='#fff'/>
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

export default List
