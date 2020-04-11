import React from 'react';
import classes from './BurgerControls.module.css';
import PropTypes from 'prop-types';
import BurgerControl from './BurgerControl/BurgerControl'
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const BurgerControls = (props) => {

    const Controls = [
        'meat' , 'bacon' , 'salad' , 'cheese'
    ].map(p => <BurgerControl Label={p} key={p} AddHandler={() => props.AddHandler(p)} 
    RemoveHandler = {() => props.RemoveHandler(p)} DisabledInfo={props.DisabledInfo[p]}
    />);

    
    return (
        <div className={classes.BurgerControls}>
            <div className={classes.Price}>
                Total Price : <strong>{' ' + props.TotalPrice.toFixed(2) + '$'}</strong>
            </div>
        <div>
                {Controls}
        </div>
        <div className={classes.OrderNowContainer}>
            <Button className={classes.Button}  variant="success" onClick={props.OrderClickHandler} disabled={!props.orderable}>
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
    OrderClickHandler : PropTypes.func

};

const mapStateToProps = state =>{
    return {
        TotalPrice : state.TotalPrice,
        orderable : state.orderable
    };
};

export default connect(mapStateToProps,null)(BurgerControls);