import { type Timestamp } from "firebase/firestore"

export const convertTimestampToDate = (timestamp: Timestamp): Date => {
    return timestamp.toDate()
}

// 必要に応じて他の日付関連のユーティル関数を追加できます
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP')
} 
