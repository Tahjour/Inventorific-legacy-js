import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { BsSearch, BsSun } from "react-icons/bs";
import styles from "./main-navigation.module.css";

function MainNavigation() {
    const route = useRouter().route;
    console.log(route);
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image className={styles.logoImage} src={"/Logo smaller.png"} alt={"The app's logo"} width={55} height={50} priority></Image>
            </Link>
            
            {route === "/app" && <h1 className={styles.appHeaderTitle}>Inventracker</h1>}
            {route !== "/login" ?
                <nav>
                    <ul>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    </ul>
                </nav> : null
            }
        </header>
    );
}

export default MainNavigation;