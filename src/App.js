import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// Lazy loading component
import asyncComponent from './hoc/asyncComponent/asyncComponent';
// import classes from './App.module.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// Lazy loading
const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
})

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/burger-shop/auth" component={ asyncAuth } />
                <Route path="/burger-shop" exact component={ BurgerBuilder } />
                <Redirect to='/burger-shop' />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/burger-shop/checkout" component={ asyncCheckout } />
                    <Route path="/burger-shop/orders" component={ asyncOrders } />
                    <Route path="/burger-shop/logout" component={ Logout } />
                    <Route path="/burger-shop/auth" component={ asyncAuth } />
                    <Route path="/burger-shop" exact component={ BurgerBuilder } />
                    <Redirect to='/burger-shop' />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {/* switch will load the first hit page and exact loads exactly that url.. choose one or both */ }
                    { routes }
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
