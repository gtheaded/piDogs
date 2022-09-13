import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import isReact from 'is-react';

import * as data from '../db.json';
import * as actions from '../actions';

import DogBuilder from './DogBuilder';

configure({ adapter: new Adapter() });

describe('<DogBuilder/>', () => {
   const state = { products: data.dogs };
   const mockStore = configureStore([thunk]);
   const { POST_DOG } = actions;

   beforeAll(() => expect(isReact.classComponent(DogBuilder)).toBeFalsy());

   describe('Formulario de creación de raza', () => {
      let createDog;
      let store = mockStore(state);
      beforeEach(() => {
         createDog = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/dog/builder']}>
                  <DogBuilder />
               </MemoryRouter>
            </Provider>,
         );
      });

      it('Debe renderizar un formulario', () => {
         expect(createDog.find('form').length).toBe(1);
      });

      it('Debe renderizar un label para el nombre con el texto "Name: "', () => {
         expect(createDog.find('h1').at(0).text()).toEqual('Create a new breed');
      });

      it('Debe renderizar un input con la propiedad "name" igual a "name', () => {
         expect(createDog.find('input[name="name"]').length).toBe(1);
      });

      it('Debe renderizar un input con la propiedad "name" igual a "minHeight', () => {
        expect(createDog.find('input[name="minHeight"]').length).toBe(1);
     });

     it('Debe renderizar un input con la propiedad "name" igual a "maxHeight', () => {
      expect(createDog.find('input[name="minHeight"]').length).toBe(1);
     });

     it('Debe renderizar un input con la propiedad "name" igual a "minweight', () => {
      expect(createDog.find('input[name="minHeight"]').length).toBe(1);
     });

     it('Debe renderizar un input con la propiedad "name" igual a "maxweight', () => {
      expect(createDog.find('input[name="minHeight"]').length).toBe(1);
     });

     it('Debe renderizar un input con la propiedad "name" igual a "life_span', () => {
      expect(createDog.find('input[name="minHeight"]').length).toBe(1);
     });

     it('Debe renderizar un boton con la propiedad "type" igual a "submit', () => {
      expect(createDog.find('button[type="submit"]').length).toBe(1);
     });

   });

  
});
