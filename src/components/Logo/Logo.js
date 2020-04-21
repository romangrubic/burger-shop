import React from 'react';
import burger from '../../assets/images/Burger.png'
import classes from './Logo.module.css'


const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burger} alt="MyBurger" />
    </div>
);

export default logo;