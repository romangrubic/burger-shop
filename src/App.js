import React, { useEffect, Suspense} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import classes from './App.module.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// Lazy loading. Dont forget to pass props 
const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
})

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
})

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
})

const App = props => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

        let routes = (
            <Switch>
                {/* dont forget to pass props and spread them when using react lazy */}
                <Route path="/burger-shop/auth" render={(props) => <Auth {...props}/> } />
                <Route path="/burger-shop" exact component={ BurgerBuilder } />
                <Redirect to='/burger-shop' />
            </Switch>
        );
        if (props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/burger-shop/checkout" render={(props) => <Checkout {...props}/>} />
                    <Route path="/burger-shop/orders" render={(props) =><Orders {...props}/> } />
                    <Route path="/burger-shop/logout" component={ Logout } />
                    <Route path="/burger-shop/auth" render={(props) => <Auth {...props}/> } />
                    <Route path="/burger-shop" exact component={ BurgerBuilder } />
                    <Redirect to='/burger-shop' />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    <Suspense fallback={<p>Loading ...</p>}>
                    {/* switch will load the first hit page and exact loads exactly that url.. choose one or both */ }
                    { routes }
                    </Suspense>
                </Layout>
            </div>
        );
    
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
