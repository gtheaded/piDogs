const app = require('../../src/app.js');
const session = require('supertest-session');

const agent = session(app);

describe('GET a una raza inexistente', () => {
    it('Debe devolver un error indicando que no hay informacion para esa raza', () =>
        agent.get('/dogs?name=pipo').expect('No se ha encontrado información para esa raza.')
   );
})


describe('GET a un id inexistente', () => {
  it('Debe devolver un error indicando que no hay informacion para ese id', () =>
      agent.get('/dogs/89898989').expect('No hay una raza asociada a ese ID')
 );
})

describe('GET a ruta /dogs devuelve status 200', () => {
  it('Debe devolver un error indicando que no hay informacion para esa raza', () =>
      agent.get('/dogs').expect(200)
 );
})

