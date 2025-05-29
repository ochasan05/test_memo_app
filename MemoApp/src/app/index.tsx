import { Redirect, router } from 'expo-router'
import { JSX, useEffect } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config'

const Index = (): JSX.Element => {
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace('/memo/list')
            }
        })
    }, [])

    return <Redirect href="/auth/login" />
}

export default Index
