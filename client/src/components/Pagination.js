import React from "react";
import styles from './Styles/Home.module.css'

export default function Paginado ({dogsPerPage, allDogs, paginado}){
  const pageNumbers = [];

  for (let i = 1; i<=Math.ceil(allDogs/dogsPerPage); i++){
    pageNumbers.push(i);
  }

  return(
        <div className={styles.paginadoContainer}>
        {
          pageNumbers &&
          pageNumbers.map(number=>{
            return (
            <button className={styles.paginadoButton} key={number} onClick={()=> paginado(number)} >{number}</button>
            )
          })
        }
      </div>
  )

}