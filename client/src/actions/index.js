import axios from 'axios';


export function getDogs(setLoading){
  return async function(dispatch){
    var json = await axios ("http://localhost:3001/dogs", {});
    setLoading && setLoading();
    return dispatch({
      type: 'GET_DOGS',
      payload: json.data
    })
  }
}

export function getTemperaments(){
  return async function(dispatch){
    var json = await axios ("http://localhost:3001/downloadedTemperaments", {});
    
    return dispatch({
      type: 'GET_TEMPERAMENTS',
      payload: json.data
    })
  }
} 

export function filterByTemperament(payload){
  return {
    type:'FILTER_BY_TEMPERAMENT',
    payload
  }
}

export function filterCreated(payload){
  return {
    type: "FILTER_CREATED",
    payload
  }
}

export function orderBy(payload){
  return {
    type: 'ORDER_BY',
    payload
  }
}

export function searchByName(payload){
  return async function(dispatch){
    var json = await axios ("http://localhost:3001/dogs?name=" + payload);
    console.log(json)
    return dispatch({
      type: 'SEARCH_BY_NAME',
      payload: json.data
    })
  }
}


  export function postDog(payload){
  console.log('se ejecutó el post')
  return async function(dispatch){
    var json = await axios.post('http://localhost:3001/dogs',payload)
    return dispatch({
      type: 'POST_DOG',
      payload: json
    })
  }
} 

export function getDetail(payload,loadingText){
  return async function(dispatch){
   var json = await axios.get('http://localhost:3001/dogs/' + payload)
   loadingText();
   return dispatch({
    type: 'GET_DETAILS',
    payload: json.data
   }) 
  }
}

export function resetFilters(){
  return({
    type:'RESET_FILTERS'
  }
  )
}
