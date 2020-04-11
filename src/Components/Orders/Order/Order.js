import classes from './Order.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import {INGREDIENTS_PRICE} from '../../../store/actions'
import BurgerIngeridientsSummary from '../../BurgerIngeridientsSummary/BurgerIngeridientsSummary'

const Order = (props) => {
    const Ingredients = {
        salad: props.order.SaladAmount,
        cheese: props.order.CheeseAmount,
        bacon: props.order.BaconAmount,
        meat: props.order.MeatAmount
    };
    const Totalprice = INGREDIENTS_PRICE.default +
                    (Ingredients.salad*INGREDIENTS_PRICE.salad) + 
                    (Ingredients.cheese*INGREDIENTS_PRICE.cheese) + 
                    (Ingredients.bacon*INGREDIENTS_PRICE.bacon) + 
                    (Ingredients.meat*INGREDIENTS_PRICE.meat);

    return (
        <div className={classes.Order}>
            <BurgerIngeridientsSummary Ingredients={Ingredients} TotalPrice={Totalprice} />
        </div>
    );
}

Order.propTypes = {
    order : PropTypes.object
};

export default Order;