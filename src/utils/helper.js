import { green, orange } from "@mui/material/colors"
import { redirect } from "react-router-dom";
import { fireBaseInstance } from "./axios-config";
import { getCard } from "./auth";

export const AMENITIES = [
    "outdoor-pool",
    "indoor-pool",
    "spa",
    "restaurant",
    "room-service",
    "fitness",
    "lounge",
    "wifi",
    "coffee-machine",
]


export const REVIEW_REMARKS = {

    0: {
        text: 'No reviews',
        color: 'dark'
    },
    1: {
        text: 'Very poor',
        color: orange[700]
    },
    2: {
        text: 'Poor',
        color: orange[500]
    },
    3: {
        text: 'Good',
        color: green[300]
    },
    4: {
        text: 'Very Good',
        color: green[500]
    },
    5: {
        text: 'Excellent',
        color: '#2a9d8f'
    },
}

export const formatDate = (date, isShort = false, isCanada = false) => {
    const dateText = new Date(date);
    return dateText.toLocaleDateString(`en-${isCanada ? 'CA' : 'GB'}`, {
        month: 'short',
        day: 'numeric',
        weekday: isShort ? 'short' : 'long'
    })
}

export async function addCardAction({ request }) {
    console.log(request.url);
    const formData = await request.formData();
    const payLoad = {};
    for (const [key, val] of formData.entries()) {
        payLoad[key] = val;
    }

    const [expiryMonth, expiryYear] = payLoad.expiry_date.split("/");

    const expiry = (new Date().getFullYear() % 2000) + 7;
    const thisYear = (new Date().getFullYear() % 2000);
    if (Number(expiryMonth) > 12) {
        return { error: 'invalid expiry month' }
    }

    if (Number(expiryYear) > expiry || Number(expiryYear) < thisYear) {
        return { error: 'invalid expiry year' }
    }

    try {
        const storedID = localStorage.getItem('id');
        if (!storedID)
            throw json({ error: 'cant retrieve card' }, { status: 500 });
        const userID = atob(storedID);
        await fireBaseInstance.post(`cards/${userID}.json`, payLoad)

        return { message: 'success' }
    } catch (error) {
        if (error.data) {
            return json({ error: error.data.messgae }, { status: 500 })

        }

        return json({ error: error.message }, { status: 500 })
    }
}

export async function removeCardAction({ request }) {
    const formData = await request.formData();
    const cardNumber = formData.get("cardNumber")
    const cards = await getCard()
    const searchKey = Object.keys(cards).find(key => cards[key].card_number === cardNumber)
    const storedID = localStorage.getItem('id');
    if (!storedID)
        throw json({ error: 'cant retrieve card' }, { status: 500 });
    const userID = atob(storedID);
    const resp = await fireBaseInstance.delete(`cards/${userID}/${searchKey}.json`)
    if (resp.status !== 200) return { message: 'couldnt delete card' }
    return { message: 'success' }
}

export function generateTicketNumber() {
    let ticketNumber = generateTicketID(3);
    for (let i = 0; i < 5; i++) {
        ticketNumber += Math.floor(Math.random() * 9);
    }
    return ticketNumber;
}

export function generateTicketID(num = 2) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let ticketID = '';
    for (let i = 0; i < num; i++) {
        ticketID += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return ticketID.toUpperCase();
}

export async function addFavouriteAction({ request }) {
    const formData = await request.formData()
    const hotelKey = formData.get("key")

    const userID = getUserName()
    try {
        let resp = await fireBaseInstance(`favourites/${userID}.json`)
        if (!resp.data) {
            resp = await fireBaseInstance.put(`favourites/${userID}.json`, { hotels: [hotelKey] })
            return { message: 'success' };
        } else {
            const { hotels } = resp.data
            if (!hotels.includes(hotelKey)) {
                hotels.push(hotelKey)
                resp = await fireBaseInstance.put(`favourites/${userID}.json`, { hotels })
                console.log(resp.data);
            }
        }
    } catch (err) {

    }
    return { message: 'success' }
}
export async function removeFavouriteAction({ request }) {
    const formData = await request.formData()
    const hotelKey = formData.get("key")
    const userID = getUserName()
    let resp = await fireBaseInstance(`favourites/${userID}.json`)
    if (resp.data) {
        const { hotels } = resp.data
        const updatedHotels = hotels.filter(hotel => hotel !== hotelKey)
        resp = await fireBaseInstance.put(`favourites/${userID}.json`, { hotels: updatedHotels })
    }

    return { message: 'success' }
}

export async function getFavourites() {
    const userID = getUserName();
    let resp = await fireBaseInstance(`favourites/${userID}.json`)
    if (resp.data) {
        const { hotels } = resp.data
        return hotels;
    }

    return []
}

function getUserName() {
    const storedID = localStorage.getItem('id');
    if (!storedID)
        return null
    const userID = atob(storedID);
    return userID;
}
