import classes from './CheckOutContactInfo.module.css';
import React ,  { Component }from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class CheckOutContactInfo extends Component{

    state = {
        FirstName : {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false
        },
        LastName: {
            value : "",
            validation : {
                isRequired : true
            },
            isValid : true,
            UserTouched : false

        },
        EmailAddress: {
            value : "",
            validation : {
                isRequired : true,
                contains : "@"
            },
            isValid : true,
            UserTouched : false

        },
        SubmitIsEnabled : false
    };

    SubmitHandler = (event) => {
        event.preventDefault();
        //
        const ContactInfo = {
            FirstName : this.state.FirstName.value,
            LastName : this.state.LastName.value,
            EmailAddress : this.state.EmailAddress.value
        };
        this.props.Set_ContactInfo(ContactInfo);
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

    render(){
        return (
            <Container className={classes.Container}>
                <Row>
                    <Col>
                    <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="txtFirstName">
                                    First Name
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                placeholder="Enter Your First Name"
                                aria-label="Enter Your First Name"
                                aria-describedby="txtFirstName"
                                value = {this.state.FirstName.value}
                                onChange={(event) => this.InputChangeHandler(event ,"FirstName")}
                                className={this.state.FirstName.isValid ? null : classes.inValidInput}
                            />
                    </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="txtLastName">
                                    Last Name
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                placeholder="Enter Your Last Name"
                                aria-label="Enter Your Last Name"
                                aria-describedby="txtLastName"
                                value = {this.state.LastName.value}
                                onChange={(event) => this.InputChangeHandler(event,"LastName")}
                                className={this.state.LastName.isValid ? null : classes.inValidInput}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup >
                            <InputGroup.Prepend className="mb-3">
                                    <InputGroup.Text id="txtEmail">
                                        Email Address
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    placeholder="Enter Your Email Address"
                                    aria-label="Enter Your Email Address"
                                    aria-describedby="txtEmail"
                                    value = {this.state.EmailAddress.value}
                                    onChange={(event) => this.InputChangeHandler(event,"EmailAddress")}
                                    className={this.state.EmailAddress.isValid ? null : classes.inValidInput}
                                />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={classes.ButtonCol}>
                        <Button variant="primary" disabled={!this.state.SubmitIsEnabled} className={classes.Button} onClick={this.SubmitHandler}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

CheckOutContactInfo.propTypes = {
    SubmitClick: PropTypes.func
};

const mapStateToProps = state =>{
    return {
        ContactInfo : state.ContactInfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        Set_ContactInfo : (contact) => dispatch({type : actions.SET_CONTACTINFO , contactInfo: contact})
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(CheckOutContactInfo);