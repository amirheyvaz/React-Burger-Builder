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
    ShipmentInfo: null
};

const reducer = (state = initialState , action) => {
    switch(action.type){
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
        default : {

            return state;
            break;
        }
    }

}

export default reducer;