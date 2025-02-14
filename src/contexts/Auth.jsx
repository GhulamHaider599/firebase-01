import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { auth, firestore } from '../config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useState(initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    // =================Integrate Firebase for read the data of the user from his profile===================
    const readProfile = useCallback(async (user) => {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const user = docSnap.data()
            console.log('firestore user data',  user )
            dispatch(s => ({ ...s, isAuth: true, user }))
            // console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
        setIsAppLoading(false)
    }, [])
    useEffect(() => {
        //this function is run when user is login or logout
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // dispatch((prevState) => ({ ...prevState, isAuth: true, user }));
                console.log('auth user data', user)
                readProfile(user)
                // console.log('state', state)
                //in place of setState we used dispatch
            } else {
                console.log('User is logout')
            }
            setIsAppLoading(false)
        });
    }, [])

    const handleLogout = () => {
        signOut(auth)

            .then(() => {
                dispatch(initialState)
                window.notify("Logout Successful ", "success")
            })
            .catch((error) => {
                window.notify("Something went wrong while logging out the user", "error")
                console.error(error)
            })

    }

    return (

        <AuthContext.Provider value={{ ...state, setAuthState: dispatch, isAppLoading, handleLogout }}>

            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider
export const useAuthContext = () => useContext(AuthContext)