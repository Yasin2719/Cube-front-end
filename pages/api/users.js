import cookieCutter from "cookie-cutter";
import api from "./api";
import Cookies from "js-cookie";
import axios from "axios";

export const GET_USER = "GET_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"

export const getUser = (id) => {
    return (dispatch) => {
        return api.get(`user/oneUser&${id}`)
        .then((res) => {
            dispatch({ type: GET_USER, payload: res.data})
        })
        .catch((err) => console.log(err))
    };
}

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return api.post("user/upload", data)
        .then(() => {
            return api.get(`user/oneUser&${id}`)
            .then((res) => {
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.pp})
            })
            
        })
        .catch((err) => console.log(err))
    };
}

export const signin = async (mail, mdp) =>{
    const result = await api.post('user/signin', {
        userMail: mail,
        userPassword: mdp
    });
    const data = await result;
    console.log(data);
    return data
}

export const signup = async (nom, prenom, pseudo, mail, password) =>{
    const result = await api.post('user/signup', {
        userNom: nom,
        userPrenom: prenom,
        userPseudo: pseudo,
        userMail: mail,
        userPassword: password
    });
    const data = await result;
    console.log(data);
}

export const getAllUserId = async () =>{
    const result = await api.get("user/allUser");
    const data = await result;
    return data.data.data;

}

export const getUserInfos = async (id) =>{
    const result = await api.get(`user/oneUser&${id}`);
    const data = await result;
    return data;
}

export const updatePhotoProfil = async (data) => {
    const result = await api.post("user/upload", data);
    return result;
}