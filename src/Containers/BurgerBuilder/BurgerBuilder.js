import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Burger from '../../Components/Burger/Burger';
import BurgerControls from '../../Components/BurgerControls/BurgerControls';
import { Row, Col , Container, Modal, Button, Navbar , Nav, Alert } from 'react-bootstrap';
import BurgerIngeridientsSummary from '../../Components/BurgerIngeridientsSummary/BurgerIngeridientsSummary';
import Axios from 'axios';
import classes from './BurgerBuilder.module.css'

const INGREDIENTS_PRICE = {
    salad: 0.8,
    meat: 2,
    cheese: 1,
    bacon: 1.3
};

class BurgerBuilder extends Component {

    constructor(props){
        super(props);

        Axios.defaults.baseURL = "http://localhost:2874/api/burgerbuilder/";
        
    }
    state = {
        Ingredients: {
            salad: 0,
            meat:0,
            cheese: 0,
            bacon: 0
        },
        TotalPrice : 4,
        purchasing : false,
        orderable : false,
        sedingRequest: false,
        alertVariant : 'success',
        alertMessage : 'slaamam',
        alertShow : false
    }

    setOrderable = (ingredients) =>{
        const sum = Object.keys(ingredients).map((key) => ingredients[key]).reduce((sum , el) => {
            return sum + el;
        },0);
        this.setState({
            orderable : sum > 0
        });
    }

    AddIngredientHandler = (type) => {
        const oldCount = this.state.Ingredients[type];
        const newCount = oldCount + 1;
        const newIngredients = {
            ...this.state.Ingredients
        };
        newIngredients[type] = newCount;
        const oldPrice = this.state.TotalPrice;
        const updatedPrice = oldPrice + INGREDIENTS_PRICE[type];
        this.setState({
            Ingredients: newIngredients,
            TotalPrice: updatedPrice
        });
        this.setOrderable(newIngredients);
    }

    OrderClickHandler = () =>{
        this.setState({purchasing : true});
    }

    RemoveIngredientHandler = (type) => {
        const oldCount = this.state.Ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const newCount = oldCount - 1;
        const newIngredients = {
            ...this.state.Ingredients
        };
        newIngredients[type] = newCount;
        const oldPrice = this.state.TotalPrice;
        const updatedPrice = oldPrice - INGREDIENTS_PRICE[type];
        this.setState({
            Ingredients: newIngredients,
            TotalPrice: updatedPrice
        });
        this.setOrderable(newIngredients);
    }

    modalCloseHandler = () => {
        this.setState({purchasing : false});
    }

    checkOutClickHandler = () => {
        this.setState({sedingRequest : true});
        var obj = {
            SaladAmount : this.state.Ingredients.salad,
            CheeseAmount: this.state.Ingredients.cheese,
            MeatAmount: this.state.Ingredients.meat,
            BaconAmount : this.state.Ingredients.bacon
        };
        Axios.post("Order" , obj)
        .then(Response => {
            if(Response.data){
                this.setState({
                    alertMessage : 'Oder Sent Successfully',
                    alertShow: true,
                    alertVariant: 'success',
                    sedingRequest : false,
                    purchasing: false
                });
            }
            else{
                this.setState({
                    alertMessage : 'Oder Sent but there was an error in processing it at the server',
                    alertShow: true,
                    alertVariant: 'warning',
                    sedingRequest : false,
                    purchasing: false
                });
            }
            
        })
        .catch(Error => {
            this.setState({
                alertMessage : 'Order didn\'t send to server successfully with error ' + Error,
                alertShow: true,
                alertVariant: 'danger',
                sedingRequest : false,
                purchasing: false
            });
        })
        .then(() => {
            this.setState({Ingredients: {
                salad: 0,
                meat:0,
                cheese: 0,
                bacon: 0
            }});
        });
    }

    render(){
        const DisabledInfo = {...this.state.Ingredients};
        for(let [key , value] of Object.entries(DisabledInfo)){
            DisabledInfo[key] = (value <= 0);
        }
        return (

            <React.Fragment>
                     
                <Modal show={this.state.purchasing} onHide={this.modalCloseHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Your Order Summary
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BurgerIngeridientsSummary Ingredients={this.state.Ingredients} TotalPrice={this.state.TotalPrice} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='success' style={{width: '100px'}}
                            disabled={this.state.sedingRequest}
                            onClick={!this.state.sedingRequest ? this.checkOutClickHandler : null}
                        >
                            {this.state.sedingRequest ? 'Loading...' : 'Check Out'}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div style={{marginTop : '20px',top: '60px',position:'relative'}}>
                    <Burger Ingredients={this.state.Ingredients}  />
                    <BurgerControls AddHandler={this.AddIngredientHandler} RemoveHandler={this.RemoveIngredientHandler}  DisabledInfo={DisabledInfo} 
                        Price = {this.state.TotalPrice.toFixed(2)}  OrderClickHandler={this.OrderClickHandler} orderable={!this.state.orderable}
                    />
                </div>
                <Alert className={classes.Alert} variant={this.state.alertVariant} show={this.state.alertShow} dismissible onClose={() => {this.setState({alertShow: false});}} >
                    {this.state.alertMessage}
                </Alert>
            </React.Fragment>
        );
    }

}

BurgerBuilder.propTypes = {

};

export default BurgerBuilder;