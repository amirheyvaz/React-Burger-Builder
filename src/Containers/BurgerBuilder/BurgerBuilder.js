import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Burger from '../../Components/Burger/Burger';
import BurgerControls from '../../Components/BurgerControls/BurgerControls';
import { Row, Col , Container, Modal, Button, Navbar , Nav, Alert } from 'react-bootstrap';
import BurgerIngeridientsSummary from '../../Components/BurgerIngeridientsSummary/BurgerIngeridientsSummary';
import Axios from 'axios';
import classes from './BurgerBuilder.module.css'
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';



class BurgerBuilder extends Component {

    constructor(props){
        super(props);

        Axios.defaults.baseURL = "http://localhost:8001/api/burgerbuilder/";
        
    }
    state = {
        // Ingredients: {
        //     salad: 0,
        //     meat:0,
        //     cheese: 0,
        //     bacon: 0
        // },
        // TotalPrice : 4,
        purchasing : false,
        // orderable : false,
        sedingRequest: false,
        alertVariant : 'success',
        alertMessage : 'slaamam',
        alertShow : false
    }

    // setOrderable = (ingredients) =>{
    //     const sum = Object.keys(ingredients).map((key) => ingredients[key]).reduce((sum , el) => {
    //         return sum + el;
    //     },0);
    //     this.setState({
    //         orderable : sum > 0
    //     });
    // }

    // AddIngredientHandler = (type) => {
    //     const oldCount = this.state.Ingredients[type];
    //     const newCount = oldCount + 1;
    //     const newIngredients = {
    //         ...this.state.Ingredients
    //     };
    //     newIngredients[type] = newCount;
    //     const oldPrice = this.state.TotalPrice;
    //     const updatedPrice = oldPrice + INGREDIENTS_PRICE[type];
    //     this.setState({
    //         Ingredients: newIngredients,
    //         TotalPrice: updatedPrice
    //     });
    //     this.setOrderable(newIngredients);
    // }

    OrderClickHandler = () =>{
        this.setState({purchasing : true});
    }

    // RemoveIngredientHandler = (type) => {
    //     const oldCount = this.state.Ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const newCount = oldCount - 1;
    //     const newIngredients = {
    //         ...this.state.Ingredients
    //     };
    //     newIngredients[type] = newCount;
    //     const oldPrice = this.state.TotalPrice;
    //     const updatedPrice = oldPrice - INGREDIENTS_PRICE[type];
    //     this.setState({
    //         Ingredients: newIngredients,
    //         TotalPrice: updatedPrice
    //     });
    //     this.setOrderable(newIngredients);
    // }

    modalCloseHandler = () => {
        this.setState({purchasing : false});
    }

    checkOutClickHandler = () => {
        this.setState({sedingRequest : true});
        // var obj = {
        //     SaladAmount : this.state.Ingredients.salad,
        //     CheeseAmount: this.state.Ingredients.cheese,
        //     MeatAmount: this.state.Ingredients.meat,
        //     BaconAmount : this.state.Ingredients.bacon
        // };
        // Axios.post("Order" , obj)
        // .then(Response => {
        //     if(Response.data){
        //         this.setState({
        //             alertMessage : 'Oder Sent Successfully',
        //             alertShow: true,
        //             alertVariant: 'success',
        //             sedingRequest : false,
        //             purchasing: false
        //         });
        //     }
        //     else{
        //         this.setState({
        //             alertMessage : 'Oder Sent but there was an error in processing it at the server',
        //             alertShow: true,
        //             alertVariant: 'warning',
        //             sedingRequest : false,
        //             purchasing: false
        //         });
        //     }
            
        // })
        // .catch(Error => {
        //     this.setState({
        //         alertMessage : 'Order didn\'t send to server successfully with error ' + Error,
        //         alertShow: true,
        //         alertVariant: 'danger',
        //         sedingRequest : false,
        //         purchasing: false
        //     });
        // })
        // .then(() => {
        //     this.setState({Ingredients: {
        //         salad: 0,
        //         meat:0,
        //         cheese: 0,
        //         bacon: 0
        //     }});
        // });
        
        //Pushing Search Query:

        // const QueryParams = [];
        // for(let i in this.state.Ingredients){
        //     QueryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.Ingredients[i]));
        // }
        //const queryString = QueryParams.join('&');
        this.props.history.push({
            pathname: "/CheckOut"
        });

        this.setState({
            sedingRequest : false,
            purchasing: false
        });



    }

    render(){
        const DisabledInfo = {...this.props.Ingredients};
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
                        <BurgerIngeridientsSummary Ingredients={this.props.Ingredients} TotalPrice={this.props.TotalPrice} />
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
                    <Burger Ingredients={this.props.Ingredients}  />
                    <BurgerControls AddHandler={this.props.AddIngredientHandler} RemoveHandler={this.props.RemoveIngredientHandler}  DisabledInfo={DisabledInfo} 
                         OrderClickHandler={this.OrderClickHandler}     
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

const mapStateToProps = state =>{
    return {
        Ingredients: state.Ingredients,
        TotalPrice : state.TotalPrice,
        orderable : state.orderable
    };
};

const mapDispatchToProps = dispatch => {
    return {
        AddIngredientHandler: (IngType) => dispatch({type: actions.ADD_INGREDIENT , IngredientType: IngType}) ,
        RemoveIngredientHandler: (IngType) => dispatch({type: actions.REMOVE_INGREDIENT , IngredientType: IngType}) 
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(withRouter(BurgerBuilder));
        