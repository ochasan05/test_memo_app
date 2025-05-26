import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { JSX } from 'react'
import { router } from 'expo-router'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'

const handlePress = (): void => {
    router.push('/memo/edit')
}

const Detail = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle}>買い物リスト</Text>
                <Text style={styles.memoDate}>2025年1月1日</Text>
            </View>

            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    テストテストテストテストテストテストテストテスト
                    テストテストテストテストテストテストテストテストテストテストテスト
                    テストテストテストテストテストテストテストテストテストテストテスト
                    テストテストテストテストテストテストテストテストテストテストテスト
                    テストテストテストテストテストテストテストテストテストテストテスト
                    テストテストテストテストテストテストテストテストテストテストテスト
                    テストテストテストテストテストテストテストテストテストテストテスト
                    テストテストテストテストテストテストテストテストテストテストテスト
                </Text>
            </ScrollView>

            <CircleButton style={{top: 60, bottom: 'auto'}} onPress={handlePress}>
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
        paddingVertical: 32,
        paddingHorizontal: 27
    },
    memoBodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#000'
    }
})

export default Detail
