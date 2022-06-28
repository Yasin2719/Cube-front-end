import api from "./api";
import Cookies from "js-cookie";
import axios from "axios";

export const getCategorie = async () => {
    const result = await api.get('categorie/allCAtegorie', {
        // userMail: mail,
        // userPassword: mdp
    });
    const data = await result.data;
    return data
};

export const addCategorie = async (libelle) => {
    const result = await api.post('categorie/NewCategorie', {
        CategorieLibelle: libelle
        // userMail: mail,
        // userPassword: mdp
    });
    const data = await result.data;
    return data
};


export const deleteCategorie = async (id) => {
    const result = await api.delete(`categorie/deleteCategorie&${id}`, {
        // userMail: mail,
        // userPassword: mdp
    });
    const data = await result.data;
    return data
};

export const getCategorieById = async (id) => {
    const result = await api.get(`categorie/getLibelleCategorie&${id}`);
    const data = await result.data;
    return data;
}