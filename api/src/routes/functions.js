
  const removeDuplicates = (array, specialWord) => {
  const unicos = [];
  array.forEach(e=>{
  
    if(e===specialWord || unicos.includes(e)){
  
    } else{
      unicos.push(e);
    }
  })

  return unicos;

}


function weightNomalization(weightString){
  const weight = weightString.split(" - ");

    if(isNaN(weight[0]) && isNaN(weight[1])){
      weight[0]=1000;
      weight[1]=1000; 
    }
    if(isNaN(weight[0]) && !isNaN(weight[1])){
      weight[0]=weight[1]
    }
    if(!isNaN(weight[0]) && isNaN(weight[1])){
      weight[1]=weight[0]
    }
    weight[0]=parseFloat(weight[0]);
    weight[1]=parseFloat(weight[1]);
  return weight;
}

module.exports = {
  removeDuplicates,
  weightNomalization
}

















/* 
module.exports =  (array, specialWord) => {
  const unicos = [];
  array.forEach(e=>{
  
    if(e===specialWord || unicos.includes(e)){
  
    } else{
      unicos.push(e);
    }
  })

  return unicos;

}

 */