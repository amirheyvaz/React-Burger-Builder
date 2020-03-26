import React from 'react';
import classes from './BurgerControl.module.css';
import PropTypes from 'prop-types';
import { Row, Col , Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const BurgerControl = (props) => {
    return (
        <Container className={classes.Container}>
            <Row>
                <Col md={6}>
                    {props.Label}
                </Col>
                <Col>
                    <Button className={classes.Button} variant="outline-primary">Less</Button>
                </Col>
                <Col>
                    <Button className={classes.Button} variant="primary">More</Button>
                </Col>
                
            </Row> 
        </Container>
    );
}

BurgerControl.propTypes = {
    Label: PropTypes.string
};

export default BurgerControl;