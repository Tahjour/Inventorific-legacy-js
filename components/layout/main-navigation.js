import Link from "next/link";
import styles from "./main-navigation.module.css";

function MainNavigation(props) {
    return (
        <header className={styles.header}>
            <Link href="/" legacyBehavior>
                <a>
                    <div className={styles.logo}>Inventory</div>
                </a>
            </Link>

            <div className={styles.searchBarContainer}>
                <input className={styles.searchBar} type="text" placeholder="search..."></input>

            </div>
            <nav>
                <ul>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/sign-up">Sign Up</Link>
                    </li>
                </ul>
            </nav>


        </header>
    );
}

export default MainNavigation;