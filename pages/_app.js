import { ItemsContextProvider } from '../context/ItemsContext';
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import '../styles/globals.css';
import MainLayout from '../components/layout/main-layout/main-layout';


export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
    return (
        <SessionProvider session={session}>
            <ItemsContextProvider>
                <MainLayout>
                    {/* <AnimatePresence mode='wait'> */}
                    <Component key={router.asPath} {...pageProps} />
                    {/* </AnimatePresence> */}
                </MainLayout>
            </ItemsContextProvider>
        </SessionProvider>
    );
}
