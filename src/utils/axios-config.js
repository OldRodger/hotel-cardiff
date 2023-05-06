import axios from "axios";

export const djangoInstance = axios.create({
    baseURL: 'https://hotel-cardiff-production.up.railway.app/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fireBaseInstance = axios.create({
    baseURL: 'https://hoteldb-4588e-default-rtdb.firebaseio.com/'
});