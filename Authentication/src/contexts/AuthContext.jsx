import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { tokenStore } from '../services/tokenStore';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in on app start
        const storedUser = tokenStore.getUser();
        const token = tokenStore.getAccess();

        if (storedUser && token) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await authService.login({ email, password });
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await authService.register({ name, email, password });
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            tokenStore.clear();
        }
    };

    const getProfile = async () => {
        try {
            const userData = await authService.getProfile();
            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Get profile error:', error);
            // If profile fetch fails, logout
            logout();
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        getProfile,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};