//REVISADO

import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/Landing';
import Home from './components/Home';
import DogBuilder from './components/DogBuilder'
import Detail from './components/Detail'
import NavBar from './components/NavBar'


function App() {
  return (
    <div className="App">
      <Route exact path = '/'>
        <LandingPage/>
      </Route>

      <Route path ='/dog/'>
        <NavBar/>
      </Route>

      <Route exact path='/dog/home/:id' component={Detail}></Route>

      <Route exact path = '/dog/home'>
        <Home/>
      </Route>

      <Route exact path = '/dog/builder'>
        <DogBuilder/>
      </Route>
      
    </div>
  );
}

export default App;