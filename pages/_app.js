import { StatusContextProvider } from '../context/StatusContext';
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StatusContextProvider>
                <Component {...pageProps} />
            </StatusContextProvider>
        </SessionProvider>
    );
}
