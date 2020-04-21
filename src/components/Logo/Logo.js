import React from 'react';
import burger from '../../assets/images/Burger.png'
import classes from './Logo.module.css'


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burger} alt="MyBurger" />
    </div>
);

export default logo;