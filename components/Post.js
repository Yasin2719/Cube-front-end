import { ChatIcon, DotsHorizontalIcon, SwitchHorizontalIcon, TrashIcon, HeartIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

export default function Post ({id, Post, postPage}){
    const [liked, setLiked] = useState(false);
    console.log(Post);
    useEffect(()=> {
        Post.likers.map((liker)=>{
                if(liker = '6244144eb32a6258adc7bbc3'){
                    setLiked(true);
                }
        })
    })
    // const likePost = async () = {
    //     if (liked) {
    //         await
    //     }
    // }
    return(
        <div className="p-3 flex cursor-pointer border-b border-gray">
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex">
                    <div className="text-gray">
                        <div className="inline-block group">
                            <h4 className={`font-bold text-[15px] sm:text-base text-black group-hover:underline`}>{Post.posterId}</h4>
                            <span></span>
                        </div>{" "}
                        {" "}
                        <span className="hover: underline text-sm sm:text-[15px]">
                            {" "}
                        </span>
                        <p>{" "}</p>
                        <p className="text-gray text-[15px] sm:text-base mt-0.5">{Post.message}</p>
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <DotsHorizontalIcon className="h-5 text-gray group-hover:text-[#1DA1F2]" />
                    </div>
                </div>
                <div
                className={`text-[#6e767d] flex justify-between w-10/12 ${
                    postPage && "mx-auto"
                }`}
                >
                                    <div className="flex items-center space-x-1 group" onClick={(e) => {
                    e.stopPropagation();
                    setPostId(id);
                    setIsOpen(true);
                }}>
                    <div className="icon group-hover:bg-[#1DA1F2] group-hover:bg-opacity-10">
                        <ChatIcon className="h-5 group-hover:text-[#1DA1F2]"/>
                    </div>
                    {Post.comments.length > 0 && (
                        <span className="group-hover:text-[#1DA1F2] text-sm">{Post.comments.length}</span>
                    )}
                </div>
                {Post._id != Post._id ? (
                    <div
                        className="flex-items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteDoc();
                        }}
                    >
                        <div className="icon group-hover:bg-red-600/10">
                            <TrashIcon className="h-5 group-hover:text-red-600" />
                        </div>
                    </div>
                ): (
                    <div className="flex items-center space-x-1 group">
                        <div className="icon group-hover:textbg-green-500/10">
                            <SwitchHorizontalIcon className="h-5 group-hover:text-green-500"/>

                        </div>
                    </div>
                )}
                <div 
                    className="flex items-center space-x-1 group"
                    onClick={(e) => {
                        e.stopPropagation();
                        likePost();
                    }}
                >
                     <div className="icon group-hover:bg-pink-600/10">
                        {liked ? (
                            <HeartIcon className="h-5 text-pink-600"/>
                        ) : (
                            <HeartIcon className="h-5 group-hover:text-pink-600"/>
                        )}
                     </div>
                     {
                         Post.likers.length > 0 && (
                            <span 
                                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                            }`}
                            >
                             {Post.likers.length}    
                             </span>
                         )
                     }
                </div>
                </div>
            </div>
        </div>
    )
}