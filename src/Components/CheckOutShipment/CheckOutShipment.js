import classes from './CheckOutShipment.module.css';
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class CheckOutShipment extends Component{
    state = {
        PhoneNumber : {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false
        },
        Address: {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false

        },
       
        SubmitIsEnabled : false
    };

    SubmitHandler = (event) => {
        event.preventDefault();
        //
        const ShipmentInfo = {
            PhoneNumber : this.state.PhoneNumber.value,
            Address : this.state.Address.value
        };

        this.props.Set_ShipmentInfo(ShipmentInfo);
        //
        this.props.SubmitClick();
    }

    InputChangeHandler = (event ,id) => {
        let enabled = true;
        const newState = {};


        for (let [key , value] of Object.entries(this.state)) {
            if(key == "SubmitIsEnabled"){
                continue;
            }
            if(key !== id){
                enabled &= value.isValid && value.UserTouched;
                continue;
            }
            const newValue = event.target.value;
            let isValid = true;
            //required
            if(value.validation.isRequired && newValue.length === 0){
                isValid = false;
            }
            if(value.validation.contains && newValue.indexOf(value.validation.contains) === -1){
                isValid = false;
            }
            enabled &= isValid;
            newState[key] = {
                validation : value.validation,
                value : newValue,
                isValid : isValid,
                UserTouched : true
            };
        }
        newState["SubmitIsEnabled"] = enabled;
        this.setState(newState);            

    }

    render (){
        return (
            <Container className={classes.Container}>
                <Row>
                    <Col>
                    <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="txtAddress">
                                    Address
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                placeholder="Enter Your Address"
                                aria-label="Enter Your Address"
                                aria-describedby="txtAddress"
                                value = {this.state.Address.value}
                                onChange={(event) => this.InputChangeHandler(event,"Address")}
                                className={this.state.Address.isValid ? null : classes.inValidInput}
                  
                            />
                    </InputGroup>
                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <InputGroup >
                            <InputGroup.Prepend className="mb-3">
                                    <InputGroup.Text id="txtPhoneNumber">
                                        Phone Number
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    placeholder="Enter Your PhoneNumber"
                                    aria-label="Enter Your PhoneNumber"
                                    aria-describedby="txtPhoneNumber"
                                    value = {this.state.PhoneNumber.value}
                                    onChange={(event) => this.InputChangeHandler(event,"PhoneNumber")}
                                    className={this.state.PhoneNumber.isValid ? null : classes.inValidInput}
                      
                                />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={classes.ButtonCol}>
                        <Button variant="outline-danger" className={classes.Button} onClick={this.props.BackClick}>
                            Back
                        </Button>
                        <Button variant="success" disabled={!this.state.SubmitIsEnabled} className={classes.Button} onClick={this.SubmitHandler}>
                            Order!
                        </Button>
                    </Col>
                    
                </Row>
            </Container>
        );
    }

}

CheckOutShipment.propTypes = {
    SubmitClick: PropTypes.func,
    BackClick: PropTypes.func
};

const mapStateToProps = state =>{
    return {
        ShipmentInfo : state.ShipmentInfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        Set_ShipmentInfo : (shipment) => dispatch({type : actions.SET_SHIPMENTINFO , shipmentInfo: shipment})
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(CheckOutShipment);