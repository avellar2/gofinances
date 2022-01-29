import React, { createContext, ReactNode, useContext } from "react";
import * as AuthSession from 'expo-auth-session'

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string,
    name: string,
    email: string,
    photo?: string
}

interface AuthContextData {
    user: User;
    sigInWithGoogle(): Promise<void>
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const user = {
        id: '124578',
        name: 'Vanderson Avellar',
        email: 'vandimavellar1997@gmail.com'
    }

    async function sigInWithGoogle() {
        try {
            const CLIENT_ID = '390191635093-md447ifd1dgt2bvn2qlde0om1mqcrccb.apps.googleusercontent.com'
            const REDIRECT_URI = 'https://auth.expo.io/avellar2/gofinances'
            const RESPONSE_TYPE = 'token'
            const SCOPE = encodeURI('profile email')
            
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const response = await AuthSession.startAsync({authUrl})
            console.log(response)

        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <AuthContext.Provider
            value={{user, sigInWithGoogle}}
        >
            {children}
        </AuthContext.Provider> 
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
