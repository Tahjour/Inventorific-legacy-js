// pages\_app.js
import { ItemsContextProvider } from '../context/ItemsContext';
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import '../styles/globals.css';
import MainLayout from '../components/layout/main-layout/main-layout';
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
    const [viewportHeight, setViewportHeight] = useState();

    useEffect(() => {
        const updateHeight = () => {
            const height = window.innerHeight;
            setViewportHeight(height);
            document.documentElement.style.setProperty('--viewport-height', `${height}px`);
        };

        updateHeight();

        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return (
        <SessionProvider session={session}>
            <ItemsContextProvider viewportHeight={viewportHeight}>
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            </ItemsContextProvider>
        </SessionProvider>
    );
}
