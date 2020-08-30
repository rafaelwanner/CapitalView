import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import PrivateRoute from './Routes/PrivateRoute';
import Overview from './Components/Overview';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Add from './Components/Add';
import Logout from './Components/Logout';
import Detail from './Components/Detail';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/logout' component={Logout} />
        <PrivateRoute exact path='/overview' component={Overview} />
        <PrivateRoute exact path='/add' component={Add} />
        <PrivateRoute exact path='/detail' component={Detail}/>
      </ Switch>
    </ BrowserRouter>
  );
}

export default App;
