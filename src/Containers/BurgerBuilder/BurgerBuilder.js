import React , {Component} from 'react';
import './BurgerBuilder.css'
import PropTypes from 'prop-types';
import Burger from '../../Components/Burger/Burger';
import BurgerControls from '../../Components/BurgerControls/BurgerControls';
import { Row, Col , Container, Modal } from 'react-bootstrap';
import BurgerIngeridientsSummary from '../../Components/BurgerIngeridientsSummary/BurgerIngeridientsSummary';

const INGREDIENTS_PRICE = {
    salad: 0.8,
    meat: 2,
    cheese: 1,
    bacon: 1.3
};

class BurgerBuilder extends Component {

    state = {
        Ingredients: {
            salad: 0,
            meat:0,
            cheese: 0,
            bacon: 0
        },
        TotalPrice : 4,
        purchasing : false,
        orderable : false
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

    render(){
        const DisabledInfo = {...this.state.Ingredients};
        for(let [key , value] of Object.entries(DisabledInfo)){
            DisabledInfo[key] = (value <= 0);
        }
        debugger;
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} onHide={this.modalCloseHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Your Order Summary
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BurgerIngeridientsSummary Ingredients={this.state.Ingredients} />
                    </Modal.Body>
                </Modal>
                <Burger Ingredients={this.state.Ingredients}  />
                <BurgerControls AddHandler={this.AddIngredientHandler} RemoveHandler={this.RemoveIngredientHandler}  DisabledInfo={DisabledInfo} 
                    Price = {this.state.TotalPrice.toFixed(2)}  OrderClickHandler={this.OrderClickHandler} orderable={!this.state.orderable}
                />
            </React.Fragment>
        );
    }

}

BurgerBuilder.propTypes = {

};

export default BurgerBuilder;