// pages\_app.js
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
                        height: "100%",
                    }}>
                        <Component {...pageProps} />
                    </motion.section>
                </MainLayout>
            </ItemsContextProvider>
        </SessionProvider>
    );
}
