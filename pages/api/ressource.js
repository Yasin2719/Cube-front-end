import cookieCutter from "cookie-cutter";
import api from "./api";
import Cookies from "js-cookie";
import useSWR from "swr";

export const getRessources = async () => {
    const result = await api.get('ressource/', {
        // userMail: mail,
        // userPassword: mdp
    });
    // const data = useSWR('ressource/');
    // console.log(data);
    const data = await result.data;
    return data
};

export const getRessourcesById = async (id) => {
    const result = await api.get(`ressource/ressource-infos/&${id}`, {
    });

    const data = await result.data;
    return data
};

export const getRessourcesByUserId = async (id) =>{
    const result = await api.get(`ressource/user-ressource/&${id}`, 
    );
    const data = await result.data;
    return data
};

export const postRessource = async (data) =>{
    console.log(data);
    console.log(Cookies.get("userId"));
    const result = await api.post('ressource/add', 
        data
        // posterId: Cookies.get("userId"),
        // ressourceStatut: "PUBLIC",
        // message: message,
        // file : RessourceFile,
        // //photo: image,
        // // video: req.body.video,
        // likers: [],
        // comments: [],
        // ressourceIsValid: true,//false par defaut des lors du backoffice
        );
    return result;
}

// export const likedRessource = async (RessourceId) =>{
    
// }

export const likeRessource = async (liked, RessourceId) =>{
    if(liked){
        const result = await api.patch(`ressource/unlike-ressource/${RessourceId}`, {
            id: Cookies.get("userId"),
        });
        console.log("ress:",result);
        return result;
    }else{
        const result = await api.patch(`ressource/like-ressource/${RessourceId}`, {
            id: Cookies.get("userId"),
        });
        console.log(result);
        return result;
    }

}

export const commentRessource = async (UserId, userPseudo, RessourceId, text) =>{
    const result = await api.patch(`ressource/comment-ressource/&${RessourceId}`, {
        commenterId: UserId,
        commenterPseudo: userPseudo,
        text: text
    });
    return result;
}

export const deleteCommentRessource = async (idRessource, idCommentaire) => {
    const result = await api.patch(`/ressource/delete-comment-ressource/&${idRessource}`, {
        commentId: idCommentaire
    })
    .then((res)=>{
        console.log("succes");
        return res;
    })
    .catch((error) => {
        console.log("erreur");
        return error
    })
}

export const deleteRessource = async (RessourceId) =>{
    const result = await api.delete(`ressource/&${RessourceId}`);
    return result
}

export const updateRessource = async (RessourceId, newMessage) =>{
    const result = await api.put(`ressource/&${RessourceId}`, {
        message: newMessage
    });
    return result
}