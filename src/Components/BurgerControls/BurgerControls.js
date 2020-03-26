import React from 'react';
import classes from './BurgerControls.module.css';
import PropTypes from 'prop-types';
import BurgerControl from './BurgerControl/BurgerControl'

const Controls = [
    'meat' , 'bacon' , 'salad' , 'cheese'
].map(p => <BurgerControl Label={p} key={p} />);

const BurgerControls = (props) => {
    return (
        <div>
            {Controls}
        </div>
    );
}

BurgerControls.propTypes = {

};

export default BurgerControls;