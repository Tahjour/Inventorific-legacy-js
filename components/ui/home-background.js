// components\ui\home-background.js
import styles from "./home-background.module.css";
function HomeBackground(props) {
    return <section className={styles.homeBackground}>
        {props.children}
    </section>;
}

export default HomeBackground;