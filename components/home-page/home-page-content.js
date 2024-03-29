import Link from "next/link";
import styles from "./home-page-content.module.css";
function HomePageContent() {
    return (
        <section className={styles.homePageContent}>
            <div className={styles.intro}>
                <h1>Inventorific</h1>
                <p style={{margin: 10}}>An inventory control manager</p>
                <Link href={"/items"} className={styles.tryBtnLink}>
                    Launch
                </Link>
            </div>
        </section>
    );
}

export default HomePageContent;