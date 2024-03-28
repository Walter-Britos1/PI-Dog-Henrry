import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the page of mans best friend</h1>
      <button className={styles.button}>
        <Link className={styles.link} to='/home'>🐾 ENTER 🐾</Link>
      </button>
    </div>
  );
};

export default Landing;