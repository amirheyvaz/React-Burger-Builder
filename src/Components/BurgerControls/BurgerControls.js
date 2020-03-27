import React from 'react';
import classes from './BurgerControls.module.css';
import PropTypes from 'prop-types';
import BurgerControl from './BurgerControl/BurgerControl'
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const BurgerControls = (props) => {

    const Controls = [
        'meat' , 'bacon' , 'salad' , 'cheese'
    ].map(p => <BurgerControl Label={p} key={p} AddHandler={() => props.AddHandler(p)} 
    RemoveHandler = {() => props.RemoveHandler(p)} DisabledInfo={props.DisabledInfo[p]}
    />);

    
    return (
        <div className={classes.BurgerControls}>
            <div className={classes.Price}>
                Total Price : <strong>{' ' + props.Price + '$'}</strong>
            </div>
        <div>
                {Controls}
        </div>
        <div className={classes.OrderNowContainer}>
            <Button className={classes.Button}  variant="success" onClick={props.OrderClickHandler} disabled={props.orderable}>
                Oder NOW
            </Button>
        </div>
        </div>
    );
}

BurgerControls.propTypes = {
    AddHandler: PropTypes.func,
    RemoveHandler : PropTypes.func,
    DisabledInfo: PropTypes.object,
    Price : PropTypes.number,
    OrderClickHandler : PropTypes.func,
    orderable: PropTypes.bool
};

export default BurgerControls;