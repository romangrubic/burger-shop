import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burger-shop">Burger builder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link="/burger-shop/orders">Orders</NavigationItem> : null}
        { props.isAuthenticated ?
        <NavigationItem link="/burger-shop/logout">Log out</NavigationItem>
         : <NavigationItem link="/burger-shop/auth">Sign in</NavigationItem>}
    </ul>
);

export default navigationItems;