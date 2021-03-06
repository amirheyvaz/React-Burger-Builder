import * as actions from './actions';
import {INGREDIENTS_PRICE} from './actions';




const initialState = {
    Ingredients: {
        salad: 0,
        meat:0,
        cheese: 0,
        bacon: 0
    },
    TotalPrice : 4,
    orderable : false,
    ContactInfo: null,
    ShipmentInfo: null,
    OrderCompeleted: false,
    alertShow : false,
    ErrorMassage : "There are no orders!",
    OrdersList: []
};

const reducer = (state = initialState , action) => {
    switch(action.type){
        case (actions.SETALLORDERS) : {
            return {
                ...state,
                OrdersList : action.orders
            };
            break;
        }
        case (actions.SETERRORMESSAGE) : {
            return {
                ...state,
                ErrorMassage : action.message
            };
            break;
        }
        case (actions.ADD_INGREDIENT) : {
            const oldCount = state.Ingredients[action.IngredientType];
            const newCount = oldCount + 1;
            const newIngredients = {
                ...state.Ingredients
            };
            newIngredients[action.IngredientType] = newCount;
            const oldPrice = state.TotalPrice;
            const updatedPrice = oldPrice + INGREDIENTS_PRICE[action.IngredientType];
            const SUM = Object.keys(newIngredients).map((key) => newIngredients[key]).reduce((sum , el) => {
                return sum + el;
            },0);
            const newOrderable = SUM > 0;
            return {
                ...state,
                Ingredients: newIngredients,
                TotalPrice: updatedPrice,
                orderable: newOrderable
            };
            break;
        }
        case (actions.REMOVE_INGREDIENT) : {
            const oldCount = state.Ingredients[action.IngredientType];
            const newCount = oldCount - 1;
            const newIngredients = {
                ...state.Ingredients
            };
            newIngredients[action.IngredientType] = newCount;
            const oldPrice = state.TotalPrice;
            const updatedPrice = oldPrice - INGREDIENTS_PRICE[action.IngredientType];
            const SUM = Object.keys(newIngredients).map((key) => newIngredients[key]).reduce((sum , el) => {
                return sum + el;
            },0);
            const newOrderable = SUM > 0;
            return {
                ...state,
                Ingredients: newIngredients,
                TotalPrice: updatedPrice,
                orderable: newOrderable
            };
            break;
        }
        case actions.SET_CONTACTINFO : {
            const contactInfo = action.contactInfo;
            return {
                ...state,
                ContactInfo : contactInfo
            };
            break;
        }
        case actions.SET_SHIPMENTINFO : {
            const shipmentInfo = action.shipmentInfo;
            return {
                ...state,
                ShipmentInfo : shipmentInfo
            };
            break;
        }
        case actions.SUBMITORDERSUCCESS : {
            return {
                ...state,
                OrderCompeleted : action.OrderCompeleted,
                alertShow : !action.OrderCompeleted
            };
            break;
        }
        case actions.SETORDERALERT : {
            return {
                ...state,
                alertShow : action.alert
            };
            break;
        }
        default : {

            return state;
            break;
        }
    }

}

export default reducer;