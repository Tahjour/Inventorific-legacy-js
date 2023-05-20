// nextjs-inventory-control\components\layout\app\dropdownmenu.js
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AiFillCaretDown } from 'react-icons/ai';
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { FaUserCog } from "react-icons/fa";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri";
import { MdLaunch } from "react-icons/md";
import { AiOutlineUserSwitch, AiOutlineUser } from "react-icons/ai";
import Link from 'next/link';
import styles from "./dropdownmenu.module.css";
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoaderReuseable from '../loading/loaderReuseable';


function DropDownMenu() {
    const { data: session } = useSession();
    const route = useRouter().route;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    async function logOutHandler() {
        await signOut();
    }

    const handleDropdownTriggerClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <DropdownMenu.Root className={styles.dropdownRoot} open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenu.Trigger className={styles.dropdownTrigger}>

                <FaUserCog size={20} />

                <motion.div className={styles.dropdownUserIconContainer} animate={{ rotate: dropdownOpen ? 180 : 0 }}>
                    <AiFillCaretDown size={15} />
                </motion.div>

            </DropdownMenu.Trigger>
            <AnimatePresence>
                {dropdownOpen && <DropdownMenu.Portal forceMount>
                    <DropdownMenu.Content className={styles.dropdownContent} asChild>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {session ? <Link href={"/profile"} className={styles.dropdownLink}>
                                <DropdownMenu.Item className={styles.dropdownItem}>
                                    <span className={styles.iconWrapper}><AiOutlineUser size={20} /></span>
                                    Profile
                                </DropdownMenu.Item>
                            </Link> : null}

                            {route !== "/" ? <Link href={"/"} className={styles.dropdownLink}>
                                <DropdownMenu.Item className={styles.dropdownItem}>
                                    <span className={styles.iconWrapper}><FaHome size={20} /></span>
                                    Home
                                </DropdownMenu.Item>
                            </Link> : null}

                            {!session ? <Link href={"/login"} className={styles.dropdownLink}>
                                <DropdownMenu.Item className={styles.dropdownItem}>
                                    <span className={styles.iconWrapper}><RiLoginBoxLine size={20} /></span>
                                    Login
                                </DropdownMenu.Item>
                            </Link> : null}

                            {route !== "/items" ? <Link href={"/items"} className={styles.dropdownLink}>
                                <DropdownMenu.Item className={styles.dropdownItem}>
                                    <span className={styles.iconWrapper}><MdLaunch size={20} /></span>
                                    Launch App
                                </DropdownMenu.Item>
                            </Link> : null}

                            {/* {session ? <Link href={"/register"} className={styles.dropdownLink}>
                    <DropdownMenu.Item className={styles.dropdownItem}>
                        Make New Account
                    </DropdownMenu.Item>
                </Link> : null} */}

                            {session ? <Link href={"/login"} className={styles.dropdownLink}>
                                <DropdownMenu.Item className={styles.dropdownItem}>
                                    <span className={styles.iconWrapper}><AiOutlineUserSwitch size={20} /></span>
                                    Switch User
                                </DropdownMenu.Item>
                            </Link> : null}

                            {session ? <DropdownMenu.Item className={styles.dropdownItem} onClick={logOutHandler}>
                                <span className={styles.iconWrapper}><RiLogoutBoxLine size={20} /></span>
                                Sign Out
                            </DropdownMenu.Item> : null}
                        </motion.div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>}
            </AnimatePresence>

        </DropdownMenu.Root>
    );
}

export default DropDownMenu;