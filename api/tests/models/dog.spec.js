const { Dog, conn } = require('../../src/db.js');
/* const p1Dog = await Dog.create({id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d1', name: "prueba1", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'} */


describe('Dog Model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    console.log('DB reset');
  });

  describe('Parte UNO', () => {
    it('should not create the Dog if name is not sent', async () => {
      expect.assertions(1);
      try {
        await Dog.create({height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the Dog if height is not send', async () => {
      expect.assertions(1);
      try {
        await Dog.create({ name: "prueba1", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should not create the Dog if Weight is not send', async () => {
      expect.assertions(1);
      try {
        await Dog.create({name: "prueba1", height: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
  
  
    it('should not create the Dog if ID is not valid', async () => {
      expect.assertions(1);
      try {
        await Dog.create({id:'esto falla', name: "prueba1", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    it('should create the Breed if all required properties are ok', async () => {
     
      
      const dog1 = await Dog.create({
        id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d1', name: "prueba1", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'})
      
      expect(dog1.toJSON()).toEqual({
        id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d1', name: "prueba1", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'});
    });
  
    it('should not create two Dogs with the same name', async () => {
      expect.assertions(2);
      try {

        
        const dogOne = await Dog.create({
          id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d5', name: "prueba10", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'})
        
        expect(dogOne.toJSON()).toEqual({
          id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d5', name: "prueba10", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'});
         
        const dogTwo = await Dog.create({
          id:'f7ac1b53-2298-4d6d-9c76-e127c5f5b8d2', name: "prueba10", height: "prueba2", weight: "prueba2", builtInLocal:true ,life_span:null, image:'https://cdn2.thedogapi.com/images/B12BnxcVQ.jpg'});
          
      } catch (error) {
        /* console.log(error) */
        expect(error.message).toBeDefined();
      }
    });
  })

  

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
});