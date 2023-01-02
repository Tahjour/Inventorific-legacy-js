import styles from "./home-page-content.module.css";
function HomePageContent() {
    return (
        <section className={styles.homePageContent}>
            <div className={styles.intro}>
                <h1>Simple Inventory</h1>
                <p>Perfect for small shops to keep track of stock</p>
                <button>Try Now!</button>
            </div>
        </section>
    );
}

export default HomePageContent;