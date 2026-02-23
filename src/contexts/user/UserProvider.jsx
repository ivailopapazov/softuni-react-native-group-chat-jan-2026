import { useEffect, useState } from 'react';

import { UserContext } from "./UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProvider({
    children,
}) {
    const [state, setState] = useState(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loginHandler = async (email, name, id) => {
        const newState = {
            email,
            name,
            id,
        };

        await saveUser(newState);
    };

    const saveUser = async (userData) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            setState(userData);
        } catch (error) {
            console.error('Failed to save user data to AsyncStorage', error);
        }
    }

    const loadUser = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('user');
            
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setState(userData);
            }
        } catch (error) {
            console.error('Failed to load user data from AsyncStorage', error);
        }
    }

    const logout = () => {
        saveUser(null);
    };

    const contextData = {
        isAuthenticated: !!state,
        user: state,
        login: loginHandler,
        logout,
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}
