import axios from 'axios';

import * as auth from './auth';
import * as boards from './boards';
import * as cagadas from './cagadas';

export {
    auth,
    boards,
    cagadas
}

export const ecOneApiInstance = axios.create({
    baseURL: process.env.REACT_APP_EC_ONE_API_URL
});

export const educationApiInstance = axios.create({
    baseURL: process.env.REACT_APP_ECE_API_URL
});