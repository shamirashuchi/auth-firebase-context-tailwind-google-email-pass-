import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
const auth = getAuth(app);
const googleauthprovider = new GoogleAuthProvider();
export const AuthContext = createContext(null);
const Authproviders = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    //const user1 = {displayName:'Sagor Nodi'}
    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }

    const SignInWithGoogle = () =>{
        return signInWithPopup(auth,googleauthprovider);
    }

    const logout = () =>{
        return signOut(auth);
    }

    //observe auth state change
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentuser =>{
            console.log("Auth state change",currentuser);
            setUser(currentuser);
            setLoading(false);
        });
        return () =>{
            unsubscribe();
        }
    },[])
    
    const AuthInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        SignInWithGoogle
    }
    return (
        // <AuthContext.Provider value={user1}>
        //     {children}
        // </AuthContext.Provider>
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authproviders;