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
                    <AnimatePresence mode='wait'>
                        <motion.section className='mainAnimationDiv' key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageInitial" variants={{
                            pageInitial: {
                                opacity: 0
                            },
                            pageAnimate: {
                                opacity: 1,
                            }
                        }}>
                            <Component {...pageProps} />
                        </motion.section>
                    </AnimatePresence>
                </MainLayout>
            </ItemsContextProvider>
        </SessionProvider>
    );
}
