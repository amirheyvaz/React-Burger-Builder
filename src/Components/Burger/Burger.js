import React , {Component} from 'react';
import classes from './Burger.module.css'
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    
    let Ingredients = [];
    for(let [key, value] of Object.entries(props.Ingredients)){
        for(let i = 0;i<value;i++){
            Ingredients.push(
                <BurgerIngredient type={key} key={key + i} />
            );
        }
    }
    if (Ingredients.length ===0){
        Ingredients = (
            <div>
                Please Start Adding Ingredients
            </div>
        );
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {Ingredients}
            <BurgerIngredient type='bread-bottom' />
        </div>

    );
}

Burger.propTypes = {
    Ingredients: PropTypes.object
};

export default Burger;