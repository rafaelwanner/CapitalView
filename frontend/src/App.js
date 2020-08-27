import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import PrivateRoute from './Routes/PrivateRoute';
import Overview from './Components/Overview';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute exact path='/overview' call={'overview'} component={Overview} />
      </ Switch>
    </ BrowserRouter>
  );
}

export default App;
