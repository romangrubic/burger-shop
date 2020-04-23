import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-shop-23df0.firebaseio.com/'
});

export default instance;