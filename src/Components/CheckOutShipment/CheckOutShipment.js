import classes from './CheckOutShipment.module.css';
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

class CheckOutShipment extends Component{

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
                                />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className={classes.ButtonCol}>
                        <Button variant="outline-danger" className={classes.Button} onClick={this.props.BackClick}>
                            Back
                        </Button>
                        <Button variant="success" className={classes.Button} onClick={this.props.SubmitClick}>
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


export default CheckOutShipment;