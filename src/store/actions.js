import Axios from 'axios';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_CONTACTINFO = "SET_CONTACTINFO";
export const SET_SHIPMENTINFO = "SET_SHIPMENTINFO";
export const SUBMITORDERSUCCESS = "SUBMITORDERSUCCESS";
export const SETORDERALERT = "SETORDERALERT";
export const SETALLORDERS = "SETALLORDERS";
export const SETERRORMESSAGE = "SETERRORMESSAGE";

export const SetOrders = (Orders) => {
    return {
        type: SETALLORDERS,
        orders: Orders
    };
};

export const SetErrorMessage = (m) => {
    return {
        type : SETERRORMESSAGE,
        message: m
    };
};

export const GetAllOrders = () => {
    return dispatch => {
        Axios.post("http://localhost:8001/api/burgerbuilder/Orders")
        .then(Response => {
            dispatch(SetOrders(Response.data));
        })
        .catch(error => {
            console.log(error.message);
            dispatch(SetErrorMessage('Error in getting orders'));
        } );
    };
};


export const INGREDIENTS_PRICE = {
    salad: 0.8,
    meat: 2,
    cheese: 1,
    bacon: 1.3,
    default: 4
};

export const SetOrderAlert = (al) => {
    return {
        type : SETORDERALERT,
        alert : al
    };
};

export const SumbitOrderSuccess = (comp) => {
    return {
        type: SUBMITORDERSUCCESS,
        OrderCompeleted: comp
    };
};

export const SubmitOrder = (obj) => {
    return dispatch => {
        Axios.post("http://localhost:8001/api/burgerbuilder/Order" , obj)
        .then(Response => {
            if(Response.data){
                dispatch(SumbitOrderSuccess(true));
            }
            else{
                // this.setState({
                //     OrderCompeleted : false,
                //     alertShow : true
                // });
                dispatch(SumbitOrderSuccess(false));
            }
            
        })
        .catch(Error => {
            dispatch(SumbitOrderSuccess(false));
        });
    };
};