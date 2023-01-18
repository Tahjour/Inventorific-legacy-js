import Link from "next/link";
import styles from "./home-page-content.module.css";
function HomePageContent() {
    return (
        <section className={styles.homePageContent}>
            <div className={styles.intro}>
                <h1>Sci-Fi Inventory</h1>
                <p>Perfect for small shops</p>
                <Link href={"/app"}>
                    <button>Try Now!</button>
                </Link>
            </div>
        </section>
    );
}

export default HomePageContent;