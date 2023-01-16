import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsSearch, BsSun } from "react-icons/bs";
import styles from "./main-navigation.module.css";

function MainNavigation() {
    const route = useRouter().route;
    console.log(route);
    // This is to help with not showing the searchbar on the home page
    const searchBarAndIcons = (
        <div className={styles.searchBarContainer}>
            <input className={styles.searchBar} type="text" placeholder="search..."></input>
            <BsSearch className={styles.searchIcon} />
        </div>
    );
    return (
        <header className={styles.header}>
            <Link href="/" legacyBehavior>
                <a>
                    <Image src={"/Logo.png"} alt={"The app's logo"} width={90} height={90} priority></Image>
                </a>
            </Link>

            {route === "/app" && searchBarAndIcons}
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