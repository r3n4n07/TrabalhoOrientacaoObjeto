import { createContext } from "react";

export const DadosContext = createContext();

export const DadosProvider = ({ children }) => {
    const urlApi = "http://192.168.0.9:3000"
    return (
        <DadosContext.Provider value={{ urlApi }}>
            {children}
        </DadosContext.Provider>
    );
}
