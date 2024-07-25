import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <h1>404 Error : Page not found 😢</h1>
      </section>
    </main>
  );
}
