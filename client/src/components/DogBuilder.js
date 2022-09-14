import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getTemperaments } from '../actions';
import styles from './Styles/Home.module.css';

function validate ({name, minHeight, maxHeight, minWeight, maxWeight, minLife_span, maxLife_span}){
  const error={}
  if(!name){
    error.name="Name is required";
  }
  if(!/^([^0-9]*)$/.test(name)){
    error.name="Name is not valid. Numbers are not allowed";
  }else if(!minHeight){
    error.minHeight="Min height is required";
  } else if (isNaN(minHeight)){
    error.minHeight="Height must be a number"
  }else if (minHeight<0){
    error.minHeight="Height must be greater than 0"
  } else if (isNaN(maxHeight)){
    error.maxHeight="Height must be a number"
  }else if (parseFloat(maxHeight)<parseFloat(minHeight)){
    error.maxHeight='Max height must be greater than Min height'
  }
  if(!minWeight){
    error.minWeight="Min weight is required";
  } else if (isNaN(minWeight)){
    error.minWeight="weight must be a number";
  } else if (minWeight<0){
    error.minWeight="Weight must be greater than 0"
  } else if(isNaN(maxWeight)){
    error.maxWeight="Weight must be a number";
  } else if (parseFloat(maxWeight) < parseFloat(minWeight)){
    error.maxWeight="Max weight must be greater than Min weight"
  }
  /* if(!minLife_span){
    error.minLife_span="Min Life_span is required";
  } else  */

  if(minLife_span){
    if (isNaN(minLife_span)){
      error.minLife_span="min Life_span must be a number";
    } else if (minLife_span<0){
      error.minLife_span="min Life_span must be greater than 0"
    } else if(isNaN(maxLife_span)){
      error.maxLife_span="max Life_span must be a number";
    } else if (parseFloat(maxLife_span) < parseFloat(minLife_span)){
      error.maxLife_span="Max Life_span must be greater than Min Life_span"
    }
  }
  if(!minLife_span && maxLife_span){
    error.minLife_span="Min Lifespan is required if max lifespan is provided"
  }
  if(minLife_span && !maxLife_span){
    error.maxLife_span="Max Lifespan is required if min lifespan is provided"
  }
  return error;
}

const DogBuilder=()=>{
  const dispatch = useDispatch();
  const temperaments = useSelector((state)=>state.temperaments);
  const dogsInRedux = useSelector((state)=>state.completeListOfDogs)
  
  useEffect(()=>{
    dispatch(getTemperaments());
    
},[dispatch]);

  const [input,setInput] = useState({
    name:'',
    minHeight:'',
    maxHeight:'',
    minWeight:'',
    maxWeight:'',
    minLife_span:'',
    maxLife_span:'',
    image:'',
    temperament:[]
  })

  const [error,setError] = useState({});
  
  const renderedTemperaments = temperaments && temperaments.map(e=>{
    return <option key={e.name} value={e.name}>{e.name}</option>
  })

  const renderedSelectedTemperaments = input.temperament && input.temperament.map(e=>{
    return  <div className={styles.formSelectedTemperaments} key={e}>{e}</div>
  })
  
  const handleSelectTemperament = (e)=>{
    if(!input.temperament.includes(e.target.value)){
      setInput({
        ...input,
        temperament:[...input.temperament,e.target.value]
      })
    }
  }

  const handleInputChange = (e)=>{
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name]:e.target.value
      
    }))

  }
  const handleSubmit = (e)=>{
     e.preventDefault();
     if(input.name){
      var duplicado=false;
      dogsInRedux.forEach(e=>{
        if(e.name.toLowerCase()===input.name.trim().toLowerCase()){
          duplicado=true;
        }
      })
    }
    if(duplicado){
      alert('That breed already exists'); 
    } 
    if( !duplicado &&  !error.name && !error.minHeight && !error.maxHeight && !error.minWeight &&!error.maxWeight &&!error.minLife_span && !error.maxLife_span && input.name && input.minHeight && input.maxHeight && input.minWeight && input.maxWeight){
      
      
      var newDog= {
        name: input.name,
        life_span: input.minLife_span && `${input.minLife_span} - ${input.maxLife_span}`,
        image: input.image,
        temperament: input.temperament,
        weight:`${input.minWeight} - ${input.maxWeight}`,
        height: `${input.minHeight} - ${input.maxHeight}`
      }
      dispatch(postDog(newDog))
      setError({});
      setInput({
        name:'',
        minHeight:'',
        maxHeight:'',
        minWeight:'',
        maxWeight:'',
        minLife_span:'',
        maxLife_span:'',
        image:'',
        temperament:[]
      })
    } else{
    setError({
      ...error,
      general:'Please fill in all the required fields'
    })
  }
  }

  return (
    <div className={styles.dogBuilderGlobal}>
      <div className={styles.dogBuilderUpperBand}></div>
      <div className={styles.dogBuilderContainer}>
      
        <h1>Create a new breed</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>

          <div className={styles.formFieldFullWidth}>
            <input onChange={(e)=>handleInputChange(e)} type='text' name='name' placeholder='Name' value={input.name}></input>   
          </div>
          
          <div className={styles.formField}>
            <input onChange={(e)=>handleInputChange(e)} type='text' placeholder='min height' name='minHeight' value={input.minHeight}></input>
            <input onChange={(e)=>handleInputChange(e)} type='text' placeholder='max height' name='maxHeight' value={input.maxHeight}></input>
          </div>
          
          <div className={styles.formField}>
            <input onChange={(e)=>handleInputChange(e)} type='text' placeholder='min weight' name='minWeight' value={input.minWeight}></input>
            <input onChange={(e)=>handleInputChange(e)} type='text' placeholder='max weight' name='maxWeight' value={input.maxWeight}></input>
          </div>


          <div className={styles.formField}>
            <input onChange={(e)=>handleInputChange(e)} type='text' placeholder='min Life-span' name='minLife_span' value={input.minLife_span}></input>
            <input onChange={(e)=>handleInputChange(e)} type='text' placeholder='max Life-span' name='maxLife_span' value={input.maxLife_span}></input>
          </div>
          
          <div className={styles.formFieldFullWidth}>
        
            <input onChange={(e)=>handleInputChange(e)} type='text' placeholder='Image' name='image' value={input.image}></input>
          </div>

          <div className={styles.formField}>
            <select defaultValue={'default'} onChange= {(e)=>handleSelectTemperament(e)}>
              <option value='default' disabled hidden>
                Select Temperamets
              </option>
              {renderedTemperaments}
            </select>
          </div>
          <div className={styles.selectedTemperamentsContainer}>
            {renderedSelectedTemperaments}
          </div>
          <div>
          
          </div>
          <button type='submit'>Submit new breed</button>
          <div className={styles.dogBuilderError}>
            {error.general &&<div>{error.general}</div>}
            {error.name && error.general &&<div>{error.name}</div>}
            {error.minHeight && error.general &&<div>{error.minHeight}</div>}
            {error.maxHeight && error.general &&<div>{error.maxHeight}</div>}
            {error.minWeight && error.general &&<div>{error.minWeight}</div>}
            {error.maxWeight && error.general &&<div>{error.maxWeight}</div>}
            {error.minLife_span && error.general &&<div>{error.minLife_span}</div>}
            {error.maxLife_span && error.general &&<div>{error.maxLife_span}</div>}
            
          </div>
        </form>
      </div>
      <div className={styles.dogBuilderFooter}></div>
    </div>
  )
}

export default DogBuilder;  