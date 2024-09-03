import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const ipAddress = import.meta.env.VITE_APP_IP_ADDRESS;
const port = import.meta.env.VITE_APP_PORT;

export const urlEndpoint = `http://${ipAddress}:${port}/api`;

const encryptedToken = Cookies.get('token');
const secretKey = import.meta.env.VITE_APP_SECRET_KEY;
export const token = encryptedToken ? CryptoJS.AES.decrypt(encryptedToken, secretKey).toString(CryptoJS.enc.Utf8) : null;

export const saveToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
    Cookies.set('token', encryptedToken, {
        domain: ipAddress,
        path: '/',
    })
}  