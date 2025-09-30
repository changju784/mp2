import React, { createContext, useState, ReactNode } from 'react';
import { NasaCollectionItem } from '../api/nasaTypes';

interface NasaContextValue {
    items: NasaCollectionItem[];
    setItems: (v: NasaCollectionItem[]) => void;
}

export const NasaContext = createContext<NasaContextValue | undefined>(undefined);

export const NasaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<NasaCollectionItem[]>([]);
    React.useEffect(() => {
        const handler = (e: any) => {
            if (Array.isArray(e.detail)) setItems(e.detail);
        };
        window.addEventListener('nasa:search', handler as any);
        return () => window.removeEventListener('nasa:search', handler as any);
    }, []);

    return <NasaContext.Provider value={{ items, setItems }}>{children}</NasaContext.Provider>;
};
