const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Dog, Temperament } = require('../db.js');
const {removeDuplicates, weightNomalization} = require('./functions.js')
require('dotenv').config();
const {
  API_KEY
} = process.env;
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//////////////////////FUNCIONES IMPORTANTES//////////////////////////////
 const getApiInfo = async () =>{

  const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds', {
    headers: {
      API_KEY
    }
  });
 
 const apiInfo = await apiUrl.data.map(e=>{
  const weight = weightNomalization(e.weight.metric)

    return {
      name: e.name,
      id: e.id,
      height: e.height.metric,
      minWeight: weight[0],
      maxWeight: weight[1],
      life_span: e.life_span,
      image: e.image.url,
      builtInLocal: false,
      temperament: e.temperament? e.temperament.split(", "):['nada']
    }
  });
 return apiInfo;
} 



const getDbInfo = async () => {
  const infoInDb = await Dog.findAll({
    include: [{
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }]
  })


  const resultado = infoInDb &&  infoInDb.map(e=>{
    const weight = weightNomalization(e.weight)
    return {
      name:e.name,
      id: e.id,
      height: e.height,
      minWeight: weight[0],
      maxWeight: weight[1],
      life_span: e.life_span,
      image: e.image,
      builtInLocal: e.builtInLocal,
      temperament:e.temperaments.map(e=>e.name)
    };
  });

  return resultado;

}

const getAllDogs = async() =>{
  const dbInfo = await getDbInfo();
  const apiInfo = await getApiInfo();
  const infoTotal = apiInfo.concat(dbInfo); 
 
  return infoTotal;
}


/////////////////////////////////RUTAS//////////////////////////////////

/////////////GET

router.get('/dogs/:idRaza', async (req,res)=>{
  const infoTota = await getAllDogs();

  const infoIdRaza = await infoTota.filter(e=> e.id.toString() === req.params.idRaza);
  if(infoIdRaza.length>0) return res.json(infoIdRaza);
  return res.status(404).send('No hay una raza asociada a ese ID');
})




  router.get('/dogs',async (req,res)=>{
  const name = req.query.name;
  const dogs = await getAllDogs();
  if(name){
    const resultado = await dogs.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()));
    if(resultado.length===0){
      return res.send('No se ha encontrado información para esa raza.');
    }
    return res.send(resultado);
  }
return res.send(dogs)
}) 



router.get('/temperaments', async (req,res)=>{
  const todo = await getAllDogs();
  const temperamentos = todo.map(e=>{
    return e.temperament
  })
  const unicos = await removeDuplicates(temperamentos.flat(),'nada');
  const objectUnicos = unicos.map(e=>{
    return {
      name: e
    }
  })
 /*  Temperament.bulkCreate(objectUnicos);
  res.send('ok'); */
  objectUnicos.forEach(e=>{
    Temperament.findOrCreate({
      where: {name: e.name}
    })
  })
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
})

router.get('/downloadedTemperaments', async (req,res)=>{
  const temperamentsInDb = await Temperament.findAll();
  res.send(temperamentsInDb);
})





///////////////POST
router.post('/dogs', async (req,res)=>{
  const {name, height,weight,life_span,temperament,image} = req.body;
  //AGREGAR VALIDACION POR TIPO DE DATOS
  if(!name || !height || !weight){
    return res.send('datos insuficientes para la creacion de la raza');
  }

  try{
  
  const newDog = await Dog.create({
    name,
    height,
    weight,
    image,
    life_span: life_span?life_span:"No info about Life_span"
  })


  const idTemp = await Temperament.findAll({
    where: {
      name:temperament
    }
  })

  
  newDog.addTemperament(idTemp);
  return res.send(newDog);
}catch(error){
  res.send('ha ocurrido algun problema');
}
})

module.exports = router;

  /* URLs importantes */
  /* const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds', { */
  /* const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds/search?q=Azawakh', { */

