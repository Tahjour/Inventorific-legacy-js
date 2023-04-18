
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AiFillCaretDown } from 'react-icons/ai';
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { FaUserCog } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import Link from 'next/link';
import styles from "./dropdownmenu.module.css";
import { useRouter } from 'next/router';
import { useState } from 'react';


function DropDownMenu(props) {
    const { session } = props;
    const route = useRouter().route;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    async function logOutHandler() {
        await signOut();
    }

    const handleDropdownTriggerClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <DropdownMenu.Root className={styles.dropdownRoot} onOpenChange={handleDropdownTriggerClick}>
            <DropdownMenu.Trigger className={styles.dropdownTrigger}>
                <FaUserCog size={20} />

                <motion.div className={styles.dropdownUserIconContainer} animate={{ rotate: dropdownOpen ? 180 : 0 }}>
                    <AiFillCaretDown size={15} />
                </motion.div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className={styles.dropdownContent}>
                {session ? <DropdownMenu.Item className={styles.dropdownItem} disabled>
                    {`User: ${session.user.name}`}
                </DropdownMenu.Item> : null}

                {route !== "/" ? <Link href={"/"} className={styles.dropdownLink}>
                    <DropdownMenu.Item className={styles.dropdownItem}>
                        Home Page
                    </DropdownMenu.Item>
                </Link> : null}

                {route !== "/items" ? <Link href={"/items"} className={styles.dropdownLink}>
                    <DropdownMenu.Item className={styles.dropdownItem}>
                        Launch App
                    </DropdownMenu.Item>
                </Link> : null}

                {session ? <Link href={"/register"} className={styles.dropdownLink}>
                    <DropdownMenu.Item className={styles.dropdownItem}>
                        Make New Account
                    </DropdownMenu.Item>
                </Link> : null}

                {session ? <Link href={"/login"} className={styles.dropdownLink}>
                    <DropdownMenu.Item className={styles.dropdownItem}>
                        Switch User
                    </DropdownMenu.Item>
                </Link> : null}

                {session ? <DropdownMenu.Item className={styles.dropdownItem} onClick={logOutHandler}>
                    Sign Out
                </DropdownMenu.Item> : null}

                {!session ? <Link href={"/login"} className={styles.dropdownLink}>
                    <DropdownMenu.Item className={styles.dropdownItem}>
                        Login
                    </DropdownMenu.Item>
                </Link> : null}

            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}

export default DropDownMenu;