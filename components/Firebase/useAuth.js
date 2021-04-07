import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookies'
import { mapUserData } from './mapUserData'

function useAuth() {
    const [user, setUser] = useState()
    const [firebase, setFirebase] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let unsubscribe

        loadFirebaseDependencies.then(app => {
            const firebaseInstance = getFirebaseInstance(app)
            setFirebase(firebaseInstance)
            unsubscribe = firebaseInstance.auth.onIdTokenChanged(async (user) => {
                if (user) {
                    const userData = await mapUserData(user)
                    setUserCookie(userData)
                    setUser(userData)

                } else {
                    removeUserCookie()
                    setUser()
                }
            })
            const userFromCookie = getUserFromCookie()
            if (!userFromCookie) {
                // router.push('/')
                setIsLoading(false)
                return
            }
            setUser(userFromCookie)
            setIsLoading(false)
        })
        return () => {
            if (unsubscribe) {
                unsubscribe()
            }
        }
    }, [])


    return { user, firebase, isLoading }
}

export default useAuth