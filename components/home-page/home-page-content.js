import Link from "next/link";
import styles from "./home-page-content.module.css";
function HomePageContent() {
    return (
        <section className={styles.homePageContent}>
            <div className={styles.intro}>
                <h1>{process.env.appName}</h1>
                <p>An inventory control manager</p>
                <Link href={"/app"} className={styles.tryBtnLink}>
                    <button>Launch</button>
                </Link>
            </div>
        </section>
    );
}

export default HomePageContent;