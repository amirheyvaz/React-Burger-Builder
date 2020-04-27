import React, { useEffect, useState } from 'react';
import Order from './Order/Order';
import axios from 'axios';
import classes from './Orders.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const Orders = (props) => {

    //const [OrdersList , SetOrders] = useState([]);
    //const [ErrorMassage , SetErrorMassage] = useState("There are no orders!");

    useEffect(
        () => {
            console.log("in use effect in Orders");
            // axios.post("http://localhost:8001/api/burgerbuilder/Orders")
            // .then(Response => {
            //     SetOrders(Response.data);
            // })
            // .catch(error => {
            //     SetErrorMassage("Error in getting orders");
            //     console.log(error.message);

            // } );
            props.GetAllOrders();
        }  , []
    );
    
    return  (props.OrdersList.length == 0  ? (<div className={classes.Orders}>
                                    <p>
                                        {props.ErrorMassage}
                                    </p>
                                </div> )  : (<div  className={classes.Orders}>
                                            {props.OrdersList.map(o => 
                                    <Order order={o} key={o.ID} />
                                )}
                                </div>)
        
    );

    
}

const mapStateToProps = state =>{
    return {
        ErrorMassage : state.ErrorMassage,
        OrdersList: state.OrdersList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        GetAllOrders: () =>  dispatch(actions.GetAllOrders())
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(Orders);