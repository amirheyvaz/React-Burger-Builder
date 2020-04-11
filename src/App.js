import React from 'react';
import classes from './App.module.css';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col , Container, Modal, Button, Navbar , Nav } from 'react-bootstrap';
import BurgerLogo from './Assets/Images/Burger-Logo.png';
import {Switch , NavLink, Route } from 'react-router-dom';
import Orders from './Components/Orders/Orders';
import CheckOut from './Containers/CheckOut/CheckOut';


function App() {
  return (
    <div className={classes.App}>
        <Navbar bg='light' expand='lg' fixed='top'>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={BurgerLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Burger Builder
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        
                        <NavLink  to="/" exact activeClassName="nav-link active" className="nav-link">
                          Home
                        </NavLink>
                        <NavLink to="/Orders" exact activeClassName="nav-link active" className="nav-link">
                          Orders
                        </NavLink>
                        
                        </Nav>
                    </Navbar.Collapse>
        </Navbar>
       
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/Orders" exact component={Orders} />
        <Route path="/CheckOut" exact component={CheckOut} />

      </Switch>  
    </div>
  );
}

export default App;


