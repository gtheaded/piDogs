import React from "react";
import { getDetail } from "../actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Styles/Home.module.css';


const Detail = (props) =>{
  const [loading, setLoading]=useState(false);
  const dispatch = useDispatch();

  const loadingText = () =>{
    setLoading(false);
  }

  useEffect( () => {
    setLoading(true);
    dispatch(getDetail(props.match.params.id,loadingText));
    
},[dispatch, props.match.params.id]);

const detail = useSelector((state)=> state.detail);

if(detail && detail[0] && detail[0].name && !loading){
  return (
    <div className={styles.detailGlobal}>
      <div className={styles.detailUpperBand}></div>
      <div className={styles.detailContainer}>
        <div className={styles.detailTitle}><h1>{detail[0].name}</h1></div>  
        <div><img src={detail[0].image} alt={detail[0].name}></img></div>
        <div className={styles.detailInformation}>
          
          <div>Height: {detail[0].height} cm</div>
          <div>Weight: {detail[0].minWeight} - {detail[0].maxWeight} kg</div>
          <div>Life Span:{detail[0].life_span}</div>
          <div>Temperament :{detail[0].temperament.map(e=>e + ' ')}</div>
        </div>
      </div>
      <div className={styles.detailFooter}></div>
    </div>
  )
} else {
if(loading){
  return <div className={styles.detailGlobal}>
    <h2>Loading</h2>
  </div>
} else {
  return (
    <div className={styles.detailGlobal}>
      <h2>There's nothing to show for that ID</h2>
    </div>
  )
}

}
} 
export default Detail;