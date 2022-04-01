import cookieCutter from "cookie-cutter";
import api from "./api";

export const getRessources = async () => {
    console.log("entrer getRessources")
    const result = await api.get('ressource/', {
        // userMail: mail,
        // userPassword: mdp
    });
    console.log("after fetch")
    const data = await result.data;
    console.log(data);
    return data
}