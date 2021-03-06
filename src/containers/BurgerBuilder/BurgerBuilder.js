import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


// to test container we should export them and then we can test them
export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)

    useEffect(() => {
        props.onInitIngredients()
    }, [])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/burger-shop/checkout');
            props.history.push('/burger-shop/auth');
        };
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/burger-shop/checkout');
    }

    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;
    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={ props.ings } />
                <BuildControls
                    ingredientAdded={ props.onIngredientAdded }
                    ingredientRemoved={ props.onIngredientRemoved }
                    disabled={ disabledInfo }
                    purchasable={ updatePurchaseState(props.ings) }
                    ordered={ purchaseHandler }
                    isAuth={ props.isAuthenticated }
                    price={ props.price } />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={ props.ings }
            purchaseCancelled={ purchaseCancelHandler }
            purchaseContinue={ purchaseContinueHandler }
            price={ props.price } />
    };
    return (
        <Aux>
            <Modal
                show={ purchasing }
                modalClosed={ purchaseCancelHandler }>
                { orderSummary }
            </Modal>
            { burger }
        </Aux>
    );

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));