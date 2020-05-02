import React, { Component } from 'react';
import {connect} from 'react-redux';
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
                isAuth = {this.props.isAuthenticated}
                drawerTogglerClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer  
                isAuth = {this.props.isAuthenticated}
                closed={this.sideDrawerClosedHandler}
                open={this.state.showSideDraw}/>
                <main className={ classes.Content }>
                    { this.props.children }
                </main>
            </Aux>)
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);