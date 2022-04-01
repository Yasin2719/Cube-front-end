import cookieCutter from "cookie-cutter";
import api from "./api";

export const signin = async (mail, mdp) =>{
    // let options = `{
    //     "userMail": "${mail}",
    //     "userPassword": "${mdp}"
    // }`;
    // console.log(mail, mdp);
    // console.log(options);
    const result = await api.post('user/signin', {
        userMail: mail,
        userPassword: mdp
    });
    console.log("after fetch")
    const data = await result;
    console.log(data);
    return data
}