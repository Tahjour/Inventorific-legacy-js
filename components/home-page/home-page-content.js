import Link from "next/link";
import styles from "./home-page-content.module.css";
function HomePageContent() {
    return (
        <section className={styles.homePageContent}>
            <div className={styles.intro}>
                <h1>{process.env.appName}</h1>
                <p>Great choice for inventory control</p>
                <Link href={"/app"} className={styles.tryBtnLink}>
                    <button>Try now!</button>
                </Link>
            </div>
        </section>
    );
}

export default HomePageContent;