import { ItemsContextProvider } from '../context/ItemsContext';
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <ItemsContextProvider>
                <Component {...pageProps} />
            </ItemsContextProvider>
        </SessionProvider>
    );
}
