import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsSun } from "react-icons/bs";
import styles from "./main-navigation.module.css";

function MainNavigation(props) {
    const { navLocation } = props;
    // This is to help with not showing the searchbar on the home page
    const searchBarAndIcons = (
        <div className={styles.searchBarContainer}>
            <input className={styles.searchBar} type="text" placeholder="search..."></input>
            <BsSearch className={styles.searchIcon} />
            <BsSun className={styles.themeIcon} />
        </div>
    );
    return (
        <header className={styles.header}>
            <Link href="/" legacyBehavior>
                <a>
                    <Image src={"/Logo.png"} alt={"The app's logo"} width={105} height={100}></Image>
                </a>
            </Link>

            {navLocation === "app" && searchBarAndIcons}
            <nav>
                <ul>
                    <li>
                        <Link href="/login">Login</Link>
                    </li>
                </ul>
            </nav>


        </header>
    );
}

export default MainNavigation;