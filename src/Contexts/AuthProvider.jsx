import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ========================
    // AUTH FUNCTIONS
    // ========================

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const deleteAccount = () => {
    setLoading(true);
    // auth.currentUser is the live instance required by deleteUser()
    return deleteUser(auth.currentUser);
};
    // ========================
    // 🔧 FIXED UPDATE FUNCTIONS
    // ========================

    const updateUserName = async (name) => {
        await updateProfile(auth.currentUser, { displayName: name });

        // 🔧 force refresh user
        await auth.currentUser.reload();
        setUser(auth.currentUser);
    };

    const updateUserPhotoURL = async (photoURL) => {
        await updateProfile(auth.currentUser, { photoURL });

        // 🔧 force refresh user
        await auth.currentUser.reload();
        setUser(auth.currentUser);
    };

    // 🔧 REQUIRED FOR PASSWORD UPDATE
    const reAuthenticateUser = async (currentPassword) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
    };

    const updateUserPassword = async (newPassword, currentPassword) => {
        if (!currentPassword) throw new Error('Current password required');
        if (auth.currentUser.providerData[0].providerId === 'google.com') {
            throw new Error('Google users cannot update password');
        }
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, newPassword);

        // Force refresh user
        await auth.currentUser.reload();
    };


    // ========================
    // AUTH STATE OBSERVER
    // ========================

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        googleLogin,
        updateUserName,
        updateUserPassword,
        updateUserPhotoURL,
        deleteAccount,
        reAuthenticateUser, // Make sure this is here!
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
