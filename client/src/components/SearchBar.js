import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";
import styles from './Styles/Home.module.css';
 
export default function SearchBar(){
 const dispatch = useDispatch()
 const [name,setName] = useState('');

const handleInputChange = (e)=>{
  e.preventDefault();
  setName(e.target.value);
}

const handleSubmit = (e)=>{
  e.preventDefault();
  dispatch(searchByName(name));
  setName("");
}

 return (
  <div className={styles.searchBar}>
    <input onChange={e=>handleInputChange(e)} type={'text'} placeholder={'Enter name'} value={name}>
    </input>
    <button onClick={e=>handleSubmit(e)} type={'submit'}>Search</button>
  </div>
 )

}
