import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Styles/Home.module.css';

function LandingPage(){
  return (

    <header>
      <section className={styles.header}>
          <h1>Welcome to our Dog Breed Search Engine </h1>
          <h2>You can look for known breeds</h2>
          <h3>and even create new ones</h3>
          <Link to = '/dog/home'>
          <button>Enter</button>
          </Link>
      </section>
    </header>

  )
}

export default LandingPage;
