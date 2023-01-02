import Image from "next/image";
import { Fragment } from "react";
import MainNavigation from "../layout/navigation/main-navigation";
import styles from "./home-page-layout.module.css";

function HomePageLayout(props) {
    const { navLocation } = props;
    return (
        <Fragment>
            <div className={styles.backgroundImage}>
                <Image src={"/background.jpg"} alt={"background image"} fill></Image>
            </div>
            <MainNavigation navLocation={navLocation} />
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}

export default HomePageLayout;