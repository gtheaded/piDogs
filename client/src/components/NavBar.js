import React from 'react';
import { useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/Home.module.css';
import { useDispatch } from 'react-redux';
import { getDogs } from '../actions';


const NavBar = () =>{

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDogs()) 
},[dispatch])

  return (
    <div className={styles.headerContainer}>
      <div>
        <h1>Breed Search Engine</h1>
      </div>
      <div className={styles.headerNav} >
        <Link to = {'/dog/home'} className={styles.headerLink}>Home</Link>
        <Link to = {'/dog/builder'} className={styles.headerLink}>Create a new breed </Link>
        <Link to = {'/dog/builder'} className={styles.headerLink}>Contact Us </Link>
      </div>    
    </div>
  )
}
export default NavBar;