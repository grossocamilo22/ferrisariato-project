// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Rol } from "../../core/models/Rol";
import { User } from "../../core/models/User";
import api from "../services/api";

interface UserAuth {
    id: string;
    nombre: string;
    correo: string;
    rol?: keyof typeof Rol;
}

interface AuthContextType {
    user: UserAuth | null;
    login: (correo: string, password: string) => Promise<User>;
    register: (user: User) => Promise<User>;
    logout: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<UserAuth | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserAuth | null>(null);
    

    const login = async (correo: string, password: string) => {
        const res = await api.post("/auth/login", { correo, password }, { withCredentials: true });
        const userData = res.data.data;
        setUser(userData);
        return userData;
    }

    const register = async (user: User) => {
        const res = await api.post("/auth/register", user, { withCredentials: true });
        const userData = res.data.data;
        setUser(userData);
        console.log(userData);
        return userData
    };

    const logout = async () => {
        const result = await api.post("/auth/logout", {}, { withCredentials: true });
        console.log(result)
        setUser(null);
    };

    const value: AuthContextType = { user, login, register, logout, setUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};