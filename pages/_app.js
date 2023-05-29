// pages\_app.js
import { ItemsContextProvider } from '../context/ItemsContext';
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import '../styles/globals.css';
import MainLayout from '../components/layout/main-layout/main-layout';
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            const height = window.innerHeight;
            setViewportHeight(height);
            document.documentElement.style.setProperty('--vh', `${height}px`);
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
                    <motion.section key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
                        pageInitial: {
                            opacity: 0
                        },
                        pageAnimate: {
                            opacity: 1,
                            transition: {
                                duration: 0.2
                            }
                        },
                        pageExit: {
                            opacity: 0
                        }
                    }} style={{
                        height: `${viewportHeight}px`,
                    }}>
                        <Component {...pageProps} />
                    </motion.section>
                </MainLayout>
            </ItemsContextProvider>
        </SessionProvider>
    );
}
