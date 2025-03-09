import PageNav from '../components/PageNav';
import styles from './Product.module.css';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src='img-1.jpg'
          alt='person with dog overlooking mountain with sunset'
        />
        <div>
          <h2>About MapMosaic.</h2>
          <p>
            MapMosaic is a location-based app designed to inspire exploration
            and discovery of the world&apos;s most iconic landmarks. Our mission
            is to provide users with an immersive experience, combining
            interactive maps, engaging content, and real-time location-based
            information to bring the world closer to your fingertips.
          </p>
          <p>
            At MapMosaic, we envision a world where travel and exploration are
            accessible to everyone. We believe that by leveraging technology, we
            can bridge the gap between curiosity and discovery, making it easier
            for people to explore and appreciate the beauty of our planet.
          </p>
        </div>
      </section>
    </main>
  );
}
