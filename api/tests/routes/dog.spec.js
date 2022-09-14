const request = require('supertest');
const app = require('../../src/app.js');
const { conn, Dog } = require('../../src/db.js');


describe('Routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  })

 

  describe('Multiple routes', () => {
    beforeAll(async () => {
       const p1Dog = await Dog.create({id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d1', name: "prueba1", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'})
      
    })

    describe('Parte UNO', () => {
      it('should return status 200 and the breed specified by id from the external API', async () => {
        const res = await request(app).get('/dogs/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{"name":"Affenpinscher","id":1,"height":"23 - 29","minWeight":3,"maxWeight":6,"life_span":"10 - 12 years","image":"https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg","builtInLocal":false,"temperament":["Stubborn","Curious","Playful","Adventurous","Active","Fun-loving"]}])
      })
  
      describe('Parte UNO', () => {
        it('should return status 200 and the breed specified by id from the local database ', async () => {
          const res = await request(app).get('/dogs/f7ac1b53-2298-4d6d-9c76-e127c5f5b8d1');
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual([{id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d1', name: "prueba1", height: "prueba2", maxWeight: 1000,minWeight:1000,temperament:[], builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'}])
        })})




      it('should return status 200 and the list of all dogs filtered by name', async () => {
        const res = await request(app).get('/dogs?name=prueba');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d1', name: "prueba1", height: "prueba2", maxWeight: 1000,minWeight:1000,temperament:[], builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'}
        ])
      })
  

  
      it('should return status 404 and the correct message if Breed\'s  id is invalid', async () => {
        const res = await request(app).get('/dogs/ABC');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('No hay una raza asociada a ese ID');
      })
  
     
    })
   
    afterAll(async () => {
      await conn.sync({ force: true });
    })
  })

  afterAll(() => {
    conn.close();
  })
})