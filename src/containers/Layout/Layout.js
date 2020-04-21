import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDraw: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDraw: false })
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDraw: !prevState.showSideDraw}
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar 
                drawerTogglerClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer  
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDraw}/>
                <main className={ classes.Content }>
                    { this.props.children }
                </main>
            </Aux>)
    }
};

export default Layout;