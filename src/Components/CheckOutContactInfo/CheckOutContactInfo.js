import classes from './CheckOutContactInfo.module.css';
import React ,  { Component }from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class CheckOutContactInfo extends Component{

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
                                />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={classes.ButtonCol}>
                        <Button variant="primary" className={classes.Button} onClick={this.props.SubmitClick}>
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
    };
};

export default connect(mapStateToProps , null)(CheckOutContactInfo);