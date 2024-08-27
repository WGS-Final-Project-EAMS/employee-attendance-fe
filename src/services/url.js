import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const ipAddress = 'localhost';
export const urlEndpoint = `http://${ipAddress}:8080/api`;

const encryptedToken = Cookies.get('token');
export const token = encryptedToken ? CryptoJS.AES.decrypt(encryptedToken, 'rahasia123').toString(CryptoJS.enc.Utf8) : null;

export const saveToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, 'rahasia123').toString();
    Cookies.set('token', encryptedToken, {
        domain: ipAddress,
        path: '/',
    })
}  