import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, InputGroup, FormControl, Button , Spinner , Alert} from 'react-bootstrap';
import classes from './CheckOutFinish.module.css';
import Burger from '../Burger/Burger';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class CheckOutFinish extends Component {

    

    componentDidMount = () => {
        //var search = this.props.location.search.substring(1);
        //const Ingredients = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });        
        // this.setState({
        //     Ingredients : Ingredients
        // });
        const Ingredients = this.props.Ingredients;
        var obj = {
            SaladAmount : Ingredients.salad,
            CheeseAmount: Ingredients.cheese,
            MeatAmount: Ingredients.meat,
            BaconAmount : Ingredients.bacon,
            FirstName: this.props.ContactInfo.FirstName,
            LastName: this.props.ContactInfo.LastName,
            EmailAddress: this.props.ContactInfo.EmailAddress,
            Address: this.props.ShipmentInfo.Address,
            PhoneNumber: this.props.ShipmentInfo.PhoneNumber
            
        };
        this.props.submitOrder(obj);
    }

    render(){
        return (
            <React.Fragment>
                <div className={classes.Message} >
                    {this.props.OrderCompeleted ? <div className={classes.MessageDiv}>Enjoy your Burger!</div> : <Spinner animation="grow" variant="primary" />}
                </div>
                <div className={classes.Burger}>
                        <Burger Ingredients={this.props.Ingredients} />
                </div>
                <Alert className={classes.Alert} variant="danger" show={this.props.alertShow} dismissible onClose={() => {this.props.SetOrderAlert(false);}} >
                    There was a problem with ordering. Please come back later...
                </Alert>
            </React.Fragment>
        );
    }
}

CheckOutFinish.propTypes = {

};

const mapStateToProps = state =>{
    return {
        Ingredients: state.Ingredients,
        ContactInfo: state.ContactInfo,
        ShipmentInfo: state.ShipmentInfo,
        OrderCompeleted: state.OrderCompeleted,
        alertShow : state.alertShow
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitOrder: (order) =>  dispatch(actions.SubmitOrder(order)),
        SetOrderAlert : (al) => dispatch(actions.SetOrderAlert(al))
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(CheckOutFinish));