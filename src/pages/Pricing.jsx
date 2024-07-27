// Uses the same styles as Product
import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just ₹ 99/month.
          </h2>
          <p>
            Discover our holiday destination marking app! Enjoy straightforward
            pricing at just ₹ 99 per month. Easily mark and track your favorite
            destinations with our intuitive features. Start exploring today!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
