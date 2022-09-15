

const initialState = {
  dogs: [],
  completeListOfDogs: [],
  temperaments: [],
  selectedTemperaments: [],
  detail : [],
  dogsInDb:[]
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_DOGS':
      return {
        ...state,
        dogs: [...action.payload],
        completeListOfDogs: [...action.payload],
        selectedTemperaments: []

      }

    case 'GET_TEMPERAMENTS':
      return {
        ...state,
        temperaments: [...action.payload]
      }
      
     case 'FILTER_BY_TEMPERAMENT':
      const temporalSelectedTemperaments = [...state.selectedTemperaments];
      if(!temporalSelectedTemperaments.includes(action.payload)){
      temporalSelectedTemperaments.push(action.payload);
      }
      const perros=[];
       state.dogs.forEach(e=>{
        var incluir=true;
        for(let i = 0; i<temporalSelectedTemperaments.length;i++){
          if(!e.temperament.includes(temporalSelectedTemperaments[i])){
            incluir=false;
          }
        }
        if(!perros.includes(e) && incluir===true){
          console.log(e)
        perros.push(e);
        }
      })
      return {
        ...state,
       selectedTemperaments: temporalSelectedTemperaments,
       dogs: perros

      } 
       case 'FILTER_CREATED':
        const allDogs = state.completeListOfDogs;
        const createdFilter = action.payload === 'created' ? allDogs.filter(e => e.builtInLocal): allDogs.filter(e => !e.builtInLocal)
        return {
          ...state,
          dogs: action.payload=== 'all' ? state.completeListOfDogs : createdFilter
        } 

        case 'ORDER_BY':
        var property=''
        var sortedArr=[];
        if(action.payload==='asc' || action.payload=== 'ascw'){
          if(action.payload==='asc'){
            property='name';
          } else {
            property='minWeight'
          } 
          console.log('property: ',property)
          sortedArr=state.dogs.sort(function(a,b){
            if(a[property] > b[property]){
              return 1;
            }
            if(b[property] > a[property]){
              return -1;
            }
            return 0
          })
        } else {
          if(action.payload==='desc'){
            property='name'
        }  else {
          property='maxWeight'
        }     
          console.log('property: ', property)
          sortedArr= state.dogs.sort(function(a,b){
            if(a[property] > b[property]){
              return -1;
            }
            if(b[property] > a[property]){
              return 1;
            }
            return 0;
          });
         }
         return {
          ...state,
          dogs: sortedArr
        }


        case 'SEARCH_BY_NAME':
          if(action.payload==="No se ha encontrado información para esa raza."){
            return {
              ...state,
              dogs: []
            }
          }
        return {
          ...state,
          dogs: action.payload,
          selectedTemperaments: []

        }
        case 'POST_DOG':
          return {
            ...state,
          }
        
        case 'GET_DETAILS':
          return {
            ...state,
            detail: action.payload

          }
        
        case 'RESET_FILTERS':
          return {
            ...state,
            dogs: state.completeListOfDogs,
            selectedTemperaments:[]
          }

       case 'DELETE_DOG':
        return {
          ...state,
          dogs: state.dogs.filter(e=>e.id !== action.payload),
          completeListOfDogs: state.completeListOfDogs.filter(e=>e.id !==action.payload)
        }

       /*  case 'MIN_WEIGHT':
          state.dogs= state.completeListOfDogs;
         return {
          ...state,
          dogs: state.dogs.filter(e=> e.minWeight>action.payload)
         } */
        
      default: 
      return {...state}
      
  }
}


export default rootReducer;