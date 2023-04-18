import { ItemsContextProvider } from '../context/ItemsContext';
import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import '../styles/globals.css';


export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
    return (
        <SessionProvider session={session}>
            <ItemsContextProvider>
                {/* <MainNavigation /> */}
                <motion.section className='mainAnimationDiv' key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
                    pageInitial: {
                        opacity: 0
                    },
                    pageAnimate: {
                        opacity: 1,
                    }
                }}>
                    <Component {...pageProps} />
                </motion.section>
            </ItemsContextProvider>
        </SessionProvider>
    );
}
