import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Our holiday destination marking app offers a range of powerful
            features to enhance your travel experiences. Explore detailed
            destination guides curated by seasoned travelers.
          </p>
          <p>
            Capture and remind your favorite moments with friends and famlies
            .Whether you are planning an adventure or revisiting cherished
            spots, our app is your essential companion.
          </p>
        </div>
      </section>
    </main>
  );
}
