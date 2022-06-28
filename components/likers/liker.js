import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { getUserInfos } from "../../pages/api/users";

export default function Likers({likers}){

    const [likerPseudo, setLikerPseudo] = useState("");
    
    const getInfosLiker = async() => {
        const data = await getUserInfos(likers);
        setLikerPseudo(data.data.userPseudo);
    }
    useEffect(()=>{
        console.log(likers)
        getInfosLiker()
        
        // console.log("Cookie userId: ",Cookies.get("userId"));
    })

    return (
    <div className="p-3 flex cursor-pointer border-b border-gray w-10/12">
        <div className="flex flex-col w-full">
            <div className="flex">
                <div className="text-gray">
                    <div className="inline-block group">
                        <h4 className={`font-bold text-[15px] sm:text-base text-black group-hover:underline`}>{likerPseudo}</h4>
                        <span></span>
                    </div>{" "}
                </div>
                <div className="icon group flex-shrink-0 ml-auto">
                    <DotsHorizontalIcon className="h-5 text-gray group-hover:text-[#1DA1F2]" />
                </div>
            </div>
        </div>
    </div>
    )
}