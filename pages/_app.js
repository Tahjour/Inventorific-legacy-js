import StaticLayout from '../components/layout/static/static-layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <StaticLayout>
            <Component {...pageProps} />
        </StaticLayout>
    );
}
