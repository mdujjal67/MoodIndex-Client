import React, { useEffect, useState } from 'react';
// import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    // social auth provider
const googleProvider = new GoogleAuthProvider;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    // console.log(loading, user)

    // create user function
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // SignIn user function
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    };

    // google sign-in
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    };

    // logout function
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };



    // State Observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const userInfo = {
        user,
        setUser,
        createUser,
        signIn,
        logOut,
        googleLogin,
        loading,
        setLoading,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;