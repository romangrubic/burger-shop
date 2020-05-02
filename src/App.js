import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import classes from './App.module.css';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {
    componentDidMount(){
        this.props.onTryAutoSignup();
    }
    render() {
        return (
            <div>
                <Layout>
                    {/* switch will load the first hit page and exact loads exactly that url.. choose one or both */}
                    <Switch>
                        <Route path="/burger-shop/checkout" component={Checkout} />
                        <Route path="/burger-shop/orders" component={Orders} />
                        <Route path="/burger-shop/auth" component={Auth} />
                        <Route path="/burger-shop/logout" component={Logout} />
                        <Route path="/burger-shop" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
