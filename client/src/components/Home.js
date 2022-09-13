import React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { filterByTemperament, filterCreated, getDogs, getTemperaments, orderBy, resetFilters} from '../actions';
import Card from './Card';
import Pagination from './Pagination'
import styles from './Styles/Home.module.css';
import SearchBar from './SearchBar';



const Home  =  (props) =>{
  const dispatch = useDispatch();
  const allDogs = useSelector ((state) => state.dogs)
  const allTemperaments = useSelector ((state)=> state.temperaments)
  const dogsPerPage = 8;
  //Pagination
  const [currentPage, sectCurrentPage] = useState(1);
  const [refresher, setRefresher] = useState(true);
  const [loading,setLoading] = useState(true);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog,indexOfLastDog);

  function loadingText (){
    setLoading(false);
  }


  const pagination = (pageNumber) =>{
    sectCurrentPage(pageNumber); 
  }


  useEffect(()=>{
    setLoading(true);
    dispatch(getDogs(loadingText)) 
    dispatch(getTemperaments());
    
},[dispatch])

 const renderedList = currentDogs && currentDogs.map(e=>{
  const weight = e.minWeight + ' - ' + e.maxWeight + ' kg';
  const height = e.height + ' cm';
  return (
      
      <Card key={e.id} name={e.name} life_span={e.life_span} height={height} weight={weight} id={e.id} image={e.image} temperament={e.temperament}/>
      
  )
})


const renderedTemperaments = allTemperaments && allTemperaments.map(e=>{
  return <option key={e.name} value={e.name}>{e.name}</option>
})

const handleSelectTemperament = (e)=>{
  dispatch(filterByTemperament(e.target.value));
  sectCurrentPage(1);
}
 
const handleFilterCreated = (e)=>{
  dispatch(filterCreated(e.target.value));
  sectCurrentPage(1);
}

const handleSort = (e)=>{
  dispatch(orderBy(e.target.value));
  sectCurrentPage(1);
  setRefresher(!refresher);
}

const handleReset = (e)=>{
  dispatch(resetFilters())
  setRefresher(!refresher);
}

return (
  <div className={styles.homeGlobalContainer} >
    <div className={styles.homeSearchAndFilter}>
      <SearchBar></SearchBar>
      <select defaultValue={'default'} onChange={(e)=>handleSort(e)}>
        <option value="default" disabled hidden>
            Order by Height
        </option>
        <option  value = 'asc' >Ascendente</option> 
        <option value = 'desc' >Descendente</option>          
      </select>
        
      <select defaultValue={'default'} onChange={(e)=>handleSort(e)}>
        <option value="default" disabled hidden>
          Order by Weight
        </option>
        <option value = 'ascw' >Ascendente</option> 
        <option value = 'descw' >Descendente</option>          
      </select>


      <select defaultValue={'default'} onChange= {(e)=>handleSelectTemperament(e)}>
        <option value='default' disabled hidden>
          Filter by Temperament
        </option>
        {renderedTemperaments}
      </select>
      <select onChange={(e)=>handleFilterCreated(e)}>
        <option value = 'all' >Show all</option>       
        <option value = 'created' >Show created</option>
        <option value = 'existente' >Show existing</option>          
      </select>
      <button onClick={()=>handleReset()}>Reset filters</button>
    </div>
    
    <div className={styles.homeCards}>
      {
        loading?<h1>Loading</h1>:renderedList.length===0?<h1>Ooops, there is no breed like that</h1>:renderedList
      }
    </div>
    
    <div className={styles.homeContainerPaginado}>
      <Pagination dogsPerPage={dogsPerPage}  allDogs={allDogs.length} paginado={pagination}></Pagination>
    </div>

  </div>
)
} 
export default Home;