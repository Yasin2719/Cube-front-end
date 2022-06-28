import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { commentRessource } from "../pages/api/ressource";
import { getUserInfos } from "../pages/api/users";
import { useRouter } from "next/router";

export default function InputCommentaire({idRessource}){
    const [CommentMessage, setCommentMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const refreshData = () => {
        // router.replace(router.asPath);
        router.replace(router.asPath, undefined, {scroll: false});
        setLoading(true);
      }

    const sendComment = async() =>{
        if(loading) return;
        setLoading(true);
        if (!CommentMessage.trim()) return ;
        if (!Cookies.get("userId")){
            setLoading(false);
            alert("utilisateur non connéctés");
            window.location.href = '/Compte/SignIn';
        }
        else{
            const userId = Cookies.get("userId");
            if(userId){
                console.log(userId);
                const user = await getUserInfos(userId)
                console.log(user);
                const response = await commentRessource(userId, user.data.userPseudo, idRessource, CommentMessage)
                .then(()=>{
                    console.log("succes");
                    refreshData()
                })
                .catch((err)=>(console.log(err)));
                setCommentMessage("");
            }
            else{
                console.log("non connecté");
                window.location.href = "/Compte/SignIn"
            }

        }
    }

    return (
            <div className={`border-b border-gray p-3 flex overflow-y-scroll w-10/12`}>
                <div className="w-full divide-y divide-gray">
                    <div className={`${CommentMessage && "space-y-2.5"}`}>
                        <textarea value={CommentMessage} rows="2" placeholder="Exemple: Trop Cool !" className="bg-transparent outline-none text-black text-lg placeholder-gray tracking-wide w-full min-h-[50px]" onChange={(e) => setCommentMessage(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between pt-2.5">
                    <button className="bg-[#1DA1F2] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover: bg-[#1a9cd8] disabled:hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-default" disabled={!CommentMessage.trim()} onClick={sendComment}>Envoi</button>
                    </div>
                </div>
            </div>
    )
}