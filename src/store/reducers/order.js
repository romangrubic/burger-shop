import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchasedBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}
const purchasedBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const purchaseBurgerInit = (state, action) => {
    return updateObject(state, { purchased: false });
}
const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}
const fetchOrderFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchasedBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchasedBurgerFail(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_INIT: return purchaseBurgerInit(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
        default: return state;
    }
};

export default reducer;