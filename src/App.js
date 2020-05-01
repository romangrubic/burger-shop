import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import classes from './App.module.css';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';


class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    {/* switch will load the first hit page and exact loads exactly that url.. choose one or both */}
                    <Switch>
                        <Route path="/burger-shop/checkout" component={Checkout} />
                        <Route path="/burger-shop/orders" component={Orders} />
                        <Route path="/burger-shop/auth" component={Auth} />
                        <Route path="/burger-shop" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
