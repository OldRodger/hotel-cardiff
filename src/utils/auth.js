import { defer, json } from "react-router-dom";
import { fireBaseInstance } from "./axios-config";

export function getTokenDuration() {
    const storedEpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedEpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    if (!token)
        return null;

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0)
        return 'EXPIRED';
    return token;
}

export async function getUserData() {
    try {
        const userID = getUser();
        const { data } = await fireBaseInstance(`users/${userID}.json`);
        // const [userData] = Object.values(data);
        // console.log(userData);
        return {
            ...data,
            alias: `${data.first_name} ${data.last_name[0]}.`
        };
    } catch (err) {

    }
}

export async function authLoader() {

    return defer({
        user: await getUserData(),
        authToken: getAuthToken()
    });
}

export async function getCard() {
    const userID = getUser();
    const { data } = await fireBaseInstance(`cards/${userID}.json`)
    return data;

}

export function getUser() {
    const storedID = localStorage.getItem('id');
    if (!storedID)
        return null;
    const userID = atob(storedID);
    return userID;
}