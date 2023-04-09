import { ItemsContextProvider } from '../context/ItemsContext';
import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import '../styles/globals.css';
import MainNavigation from '../components/layout/navigation/main-navigation';

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
    return (
        <SessionProvider session={session}>
            <ItemsContextProvider>
                <MainNavigation />
                <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
                    pageInitial: {
                        opacity: 0,
                    },
                    pageAnimate: {
                        opacity: 1,
                    }
                }}>
                    <Component {...pageProps} />
                </motion.div>
            </ItemsContextProvider>
        </SessionProvider>
    );
}
