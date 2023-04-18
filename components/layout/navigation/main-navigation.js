import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from "next/image";
import Link from "next/link";
import { AiFillCaretDown } from "react-icons/ai";
import { useRouter } from "next/router";
import styles from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState } from 'react';
import { ItemsContext } from '../../../context/ItemsContext';
import { motion } from "framer-motion";
import DropDownMenu from '../app/dropdownmenu';

function MainNavigation() {
    const { data: session } = useSession();
    const itemsContext = useContext(ItemsContext);

    return (
        <header className={styles.header}>
            <Link href="/">
                <Image className={styles.logoImage} src={"/Logo smaller.png"} alt={"The app's logo"} width={55} height={50} priority></Image>
            </Link>
            
            <DropDownMenu session={session} />
        </header >
    );
}

export default MainNavigation;