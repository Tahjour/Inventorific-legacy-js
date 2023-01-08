// import Image from "next/image";
import { Fragment } from "react";
// import styles from "./static-layout.module.css";
function StaticLayout(props) {
    return (
        <Fragment>
            {/* <Image className={styles.backgroundImage} src={"/background.jpg"} alt={"background image"} fill></Image> */}
            {props.children}
        </Fragment>
    );
}

export default StaticLayout;