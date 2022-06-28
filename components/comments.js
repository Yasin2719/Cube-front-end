import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { deleteCommentRessource } from "../pages/api/ressource";
import { useRouter } from "next/router";
import { useState } from "react";

export default function comment({comment, idRessource}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const refreshData = () => {
        // router.replace(router.asPath);
        router.replace(router.asPath, undefined, {scroll: false});
        setLoading(true);
        // router.reload()
      }

    const deleteComment = async () =>{
        setLoading(true)
        const result = await deleteCommentRessource(idRessource, comment._id)
        .then(() =>{
            refreshData()
        })
        .catch((err)=>{
            console.log("erreur ",err);
            alert("error");
        })
    }

    return (<div className="p-3 flex cursor-pointer border-b border-gray w-10/12">
        <div className="flex flex-col space-y-2 w-full">
            <div className="flex">
                <div className="text-gray">
                    <div className="inline-block group">
                        <h4 className={`font-bold text-[15px] sm:text-base text-black group-hover:underline`}>{comment.commenterPseudo}</h4>
                        <span></span>
                    </div>{" "}
                        {" "}
                    <span className="hover: underline text-sm sm:text-[15px]">
                        {" "}
                    </span>
                    <p>{" "}</p>
                    <p>{" "}</p>
                    <p className="font-medium text-gray text-[15px] sm:text-base mt-0.5">{comment.text}</p>
                </div>
                <div className="icon group flex-shrink-0 ml-auto" onClick={()=>{
                        deleteComment()
                    }}>
                    <DotsHorizontalIcon className="h-5 text-gray group-hover:text-[#1DA1F2]" />
                </div>
            </div>
        </div>
    </div>)
}