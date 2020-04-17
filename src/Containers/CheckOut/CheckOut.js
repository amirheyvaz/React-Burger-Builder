import React, { Component } from 'react';
import classs from './CheckOut.module.css';
import {withRouter} from 'react-router-dom';
import Burger from '../../Components/Burger/Burger';
import classes from './CheckOut.module.css';
import {Steps} from 'antd';
import CheckOutContactInfo from '../../Components/CheckOutContactInfo/CheckOutContactInfo';
import CheckOutShipment from '../../Components/CheckOutShipment/CheckOutShipment';
import CheckOutFinish from '../../Components/CheckOutFinish/CheckOutFinish';


const { Step } = Steps;


class CheckOut extends Component {
    state = {
        current: 0
    };

    componentDidMount(prevProps){
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
          }
    }

    ContactSumbitHandler = () => {
        const Cur = this.state.current;
        this.setState({
            current : Cur + 1 
        });
    }

    ShipmentSumbitHandler = () => {
        const Cur = this.state.current;
        this.setState({
            current : Cur + 1 
        });
    }

    ShipmentBackHandler = () => {
        const Cur = this.state.current;
        this.setState({
            current : Cur - 1 
        });
    }

    render (){

        return(
            <React.Fragment>
                <div className={classes.Step}>
                    <Steps current={this.state.current}>
                        <Step title="Contact" description="Endter your contact info" />
                        <Step title="Shipment" description="Endter your address info" />
                        <Step title="Finish" description="Finishing Up" />
                    </Steps>
                </div>
                
                <div className={classes.Burger}>
                    {this.state.current == 0 ? <CheckOutContactInfo SubmitClick={this.ContactSumbitHandler} /> : (this.state.current == 1 ? <CheckOutShipment SubmitClick={this.ShipmentSumbitHandler} BackClick={this.ShipmentBackHandler} /> : (this.state.current == 2 ? <CheckOutFinish /> : '') )}
                </div>
            </React.Fragment>

        );
    }
}





export default withRouter(CheckOut);