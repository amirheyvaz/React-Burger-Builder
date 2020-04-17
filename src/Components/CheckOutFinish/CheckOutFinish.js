import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, InputGroup, FormControl, Button , Spinner , Alert} from 'react-bootstrap';
import classes from './CheckOutFinish.module.css';
import Burger from '../Burger/Burger';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class CheckOutFinish extends Component {
    state = {
        //Ingredients : {},
        OrderCompeleted: false,
        alertShow : false
    };

    

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
        Axios.post("http://localhost:8001/api/burgerbuilder/Order" , obj)
        .then(Response => {
            if(Response.data){
                this.setState({
                    OrderCompeleted : true
                });
            }
            else{
                this.setState({
                    OrderCompeleted : false,
                    alertShow : true
                });
            }
            
        })
        .catch(Error => {
            this.setState({
                OrderCompeleted : false,
                 alertShow : true
            });
        });
    }

    render(){
        return (
            <React.Fragment>
                <div className={classes.Message} >
                    {this.state.OrderCompeleted ? <div className={classes.MessageDiv}>Enjoy your Burger!</div> : <Spinner animation="grow" variant="primary" />}
                </div>
                <div className={classes.Burger}>
                        <Burger Ingredients={this.props.Ingredients} />
                </div>
                <Alert className={classes.Alert} variant="danger" show={this.state.alertShow} dismissible onClose={() => {this.setState({alertShow: false});}} >
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
        ShipmentInfo: state.ShipmentInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(CheckOutFinish));