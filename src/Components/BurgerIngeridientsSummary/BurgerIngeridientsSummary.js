import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';

const BurgerIngeridientsSummary = (props) => {

    const IngredientsList = Object.keys(props.Ingredients).map(i => (

        <Row>
            <p>
                {i + ' :    ' + props.Ingredients[i]}
            </p>
        </Row>
    ));

    return (
        <Container>
            <Row>
                <p>
                    Your order is :
                </p>
            </Row>
            <Row>
                <Container>
                    {IngredientsList}
                </Container>
            </Row>
            <Row>
                Check out NOW
            </Row>
        </Container>
    );
}

BurgerIngeridientsSummary.propTypes = {
    Ingredients: PropTypes.object
};

export default BurgerIngeridientsSummary;