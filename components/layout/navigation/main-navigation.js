import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import { useRouter } from "next/router";
import styles from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";

function MainNavigation() {
    const { data: session } = useSession();
    const route = useRouter().route;
    async function logOutHandler() {
        await signOut();
    }
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image className={styles.logoImage} src={"/Logo smaller.png"} alt={"The app's logo"} width={55} height={50}></Image>
            </Link>

            {route === "/app" && <Link href={"/"}>
                <h1 className={styles.appHeaderTitle}>{process.env.appName}</h1>
            </Link>}
            {route !== "/login" && route !== "/register" ?
                <nav>
                    <ul>
                        <li>
                            {session ? <DropdownMenu.Root className={styles.dropdownRoot}>
                                <DropdownMenu.Trigger className={styles.dropdownTrigger}>
                                    {session.user.name.length > 15 ? `${session.user.name.slice(0, 15)}...` : session.user.name}
                                    <AiFillCaretDown size={20} />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className={styles.dropdownContent}>
                                    <DropdownMenu.Item className={styles.dropdownItem} onClick={logOutHandler}>
                                        Log Out
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root> : <Link href="/login">Login</Link>}
                        </li>
                    </ul>
                </nav> : null
            }
        </header>
    );
}

export default MainNavigation;