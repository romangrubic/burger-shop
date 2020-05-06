import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/burger-shop/checkout/contact-data');
    };


    let summary = <Redirect to='/burger-shop' />
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to='/burger-shop' /> : null;
        summary =
            <div>
                { purchasedRedirect }
                <CheckoutSummary
                    ingredients={ props.ings }
                    checkoutCancelled={ checkoutCancelledHandler }
                    checkoutContinued={ checkoutContinuedHandler } />
                <Route
                    path={ props.match.url + '/contact-data' }
                    component={ ContactData } />
            </div>
    }
    return summary

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);