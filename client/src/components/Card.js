
import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Styles/Home.module.css'

function Card(props){
  return ( 
    <div className={styles.cardGlobal}>
      <Link className={styles.cardLink} to={'/dog/home/' + props.id}>
        <h3 >{props.name}</h3>
      </Link>

      <img className={styles.cardImg} height='200px' width='320px' src={props.image} alt={props.id}></img>
     
      <div className={styles.cardInfo}>
        {props.temperament && props.temperament.map(e=> e +' ')} 
      </div>
    
      <div className={styles.cardInfo}>
        Weight: {props.weight}
      </div>
    
    </div>
  )
}

export default Card;























/* import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Styles/Home.module.css'

function Card(props){
  return ( 
    <div className={styles.cardGlobal}>
      <Link className={styles.cardLink} to={'/dog/home/' + props.id}>
        <h3 >{props.name}</h3>
      </Link>

      <img className={styles.cardImg} height='200px' width='320px' src={props.image} alt={props.id}></img>
     
      <div className={styles.cardInfo}>
        {props.temperament && props.temperament.map(e=> e +' ')} 
      </div>
    
      <div className={styles.cardInfo}>
        Weight: {props.weight}
      </div>
    
    </div>
  )
}

export default Card; */
