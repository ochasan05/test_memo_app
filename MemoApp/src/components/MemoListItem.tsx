import { JSX } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Link } from 'expo-router'

import Icon from './Icon'

import { type Memo } from '../../types/memo'

import { db, auth } from '../config'
import { deleteDoc, doc } from 'firebase/firestore'

interface Props {
    memo: Memo
}

const handlePress = (id: string): void => {
    if (!auth.currentUser) {
        return
    }

    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    Alert.alert('メモを削除します', '本当に削除しますか？', [
        {
            text: 'キャンセル',
            style: 'cancel'
        },
        {
            text: '削除する',
            style: 'destructive',
            onPress: async (): Promise<void> => {
                deleteDoc(ref)
                .catch((error) => {
                    console.log('error', error)
                    Alert.alert('ERROR', 'メモの削除に失敗しました')
                })
            }
        }
    ])
}

const MemoListItem = (props: Props): JSX.Element | null => {
    const { memo } = props
    const { bodyText, updatedAt } = memo

    if (!bodyText || !updatedAt) {
        return null
    }

    const dateString = updatedAt.toDate().toLocaleString('ja-JP')

    return (
        <Link
            href={ {pathname: '/memo/detail', params: { id: memo.id}} }
            asChild
        >
            <TouchableOpacity style={styles.memoListItem}>
                <View style={styles.memoListItemContent}>
                    <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{dateString}</Text>
                </View>
                <TouchableOpacity onPress={() => { handlePress(memo.id) }}>
                    <Icon name='delete' size={32} color='#B0B0B0' />
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    memoListItem: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.15)'
    },
    memoListItemContent: {
        flex: 1,
        marginRight: 16
    },
    memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: '#827C7C'
    }
})

export default MemoListItem
