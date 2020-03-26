import React , {Component} from 'react';
import './BurgerBuilder.css'
import PropTypes from 'prop-types';
import Burger from '../../Components/Burger/Burger';
import BurgerControls from '../../Components/BurgerControls/BurgerControls';
import { Row, Col , Container } from 'react-bootstrap';


class BurgerBuilder extends Component {

    state = {
        Ingredients: {
            salad: 0,
            meat:0
        }
    }

    render(){
        return (
            <React.Fragment>
                <Burger Ingredients={this.state.Ingredients}  />
                <BurgerControls />
            </React.Fragment>
        );
    }

}

BurgerBuilder.propTypes = {

};

export default BurgerBuilder;