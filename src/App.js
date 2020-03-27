import React from 'react';
import classes from './App.module.css';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col , Container, Modal, Button, Navbar , Nav } from 'react-bootstrap';
import BurgerLogo from './Assets/Images/Burger-Logo.png';

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
                        <Nav.Link active href="/">Home</Nav.Link>
                        <Nav.Link href="/">Check-Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
        </Navbar>
      <BurgerBuilder  />
    </div>
  );
}

export default App;


