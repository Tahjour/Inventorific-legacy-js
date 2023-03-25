import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useRouter } from "next/router";
import styles from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';

function MainNavigation() {
    const { data: session } = useSession();

    const route = useRouter().route;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    function toggleDropdown() {
        setDropdownOpen(!dropdownOpen);
    }
    async function logOutHandler() {
        await signOut();
    }
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image className={styles.logoImage} src={"/Logo smaller.png"} alt={"The app's logo"} width={55} height={50} priority></Image>
            </Link>

            {route === "/app" && <Link href={"/"} className={styles.defaultLink}>
                {/* <h1 className={styles.appHeaderTitle}>{process.env.appName}</h1> */}
            </Link>}
            {<nav>
                <ul>
                    <li>
                        {
                            session ? <DropdownMenu.Root className={styles.dropdownRoot}>
                                <DropdownMenu.Trigger className={styles.dropdownTrigger}>
                                    {session.user.name.length > 15 ? `${session.user.name.slice(0, 15)}...` : session.user.name}
                                    <AiFillCaretDown size={20} />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className={styles.dropdownContent}>
                                    {route !== "/app" ? <Link href={"/app"} className={styles.dropdownLink}>
                                        <DropdownMenu.Item className={styles.dropdownItem}>
                                            Launch App
                                        </DropdownMenu.Item>
                                    </Link> : null}
                                    <Link href={"/register"} className={styles.dropdownLink}>
                                        <DropdownMenu.Item className={styles.dropdownItem}>
                                            Make New Account
                                        </DropdownMenu.Item>
                                    </Link>
                                    <Link href={"/login"} className={styles.dropdownLink}>
                                        <DropdownMenu.Item className={styles.dropdownItem}>
                                            Switch User
                                        </DropdownMenu.Item>
                                    </Link>
                                    <DropdownMenu.Item className={styles.dropdownItem} onClick={logOutHandler}>
                                        Sign Out
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root> :
                                route !== "/login" && route !== "/register" ?
                                    <Link className={styles.defaultLink} href="/login">Login</Link> : null
                        }
                    </li>
                </ul>
            </nav>
            }
        </header >
    );
}

export default MainNavigation;