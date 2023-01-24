import { StatusContextProvider } from '../context/StatusContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <StatusContextProvider>
            <Component {...pageProps} />
        </StatusContextProvider>
    );
}
