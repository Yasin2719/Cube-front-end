import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ChatIcon, DotsHorizontalIcon, SwitchHorizontalIcon, TrashIcon, HeartIcon, ChatAlt2Icon } from "@heroicons/react/solid";
import Comment from "../../comments"
import { deleteRessource } from "../../../pages/api/ressource";
import Likers from "../../likers/liker";
import { useRouter } from 'next/router';

export default function Post ({Post}){
    const [showComment, setShowComment] = useState(false);
    const [showLikers, setShowLikers] = useState(false);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshData = () => {
        router.replace(router.asPath);
        setIsRefreshing(true);
      }

    const showChatRessource = () =>{
        if(typeof Cookies.get("userId") != "undefined"){
            window.location.href = `/Chat/${id}`
        }
        else {
            window.location.href = "/Compte/SignIn"
        }
    }

    const showDeleteRessource = () =>{
        if(confirm("Etes vous sûr de vouloir supprimer cette ressource ?")){
            deleteRessource(Post._id)
            refreshData()
        }
    }

    const test = () =>{
        console.log("test likers");
        console.log(Post.video, Post.photo);
    }
    return(
        <div className="p-3 flex cursor-pointer border-b border-gray">
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex">
                    <div className="text-gray">
                        <div className="inline-block group">
                            <h4 className={`font-bold text-[22px] text-black group-hover:underline`}>{Post.posterPseudo}</h4>
                            <span></span>
                        </div>{" "}
                        {" "}
                        <span className="hover: underline text-sm sm:text-[15px]">
                            {" "}
                        </span>
                        <p>{'\u00A0'}</p>
                        <p className="text-gray text-[15px] sm:text-base mt-0.5 ml-2"> {Post.message}</p>
                        <p>{'\u00A0'}</p>
                        {/* {
                            Post.photo !== "" ? (
                                <img src={Post.photo} alt="" className="rounded-2xl max-h-[700px] object-cover mr-2" />
                            ) : (
                                null
                            )
                        } */}
                        
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <DotsHorizontalIcon className="h-5 text-gray group-hover:text-[#1DA1F2]" />
                    </div>
                </div>
                {
                    Post.photo && (
                    // test()
                    <div>
                        <img src={Post.photo} alt="" className="rounded-2xl max-h-[700px] object-cover mr-auto ml-auto" />
                    </div>
                    )
                }
                {
                    Post.video && (
                        <div className="relative">
                            <iframe
                                src={Post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={Post.video}
                                className="rounded-2xl h-[300px] w-[500px] object-cover mr-auto ml-auto"
                            ></iframe>
                        </div> 
                    )
                }
                {
                    Post.link && (
                        <div className="relative">
                            <a href={Post.link} className="text-[13px] text-black hover:text-[#1DA1F2]">{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}source: {Post.link}</a>
                        </div> 
                    )
                }

                {/* <div className="relative">
                            <iframe
                                src={Post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video}
                            ></iframe>
                        </div>  */}
                {
                    Post.video ? (
                        test()
                    //     <div className="relative">
                    //     <iframe
                    //         src={Post.video}
                    //         frameBorder="0"
                    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    //         allowFullScreen
                    //         title={video}
                    //     ></iframe>
                    // </div> 
                    ) : (
                        test()
                        // <div></div>
                    )
                }
                <div className={`text-[#6e767d] flex justify-between w-10/12`}>
                    <div className="flex items-center space-x-1 group" onClick={(e) => {
                        if(typeof Cookies.get("userId") != "undefined"){
                            e.stopPropagation();
                            setShowComment(!showComment);
                            setShowLikers(false);
                        }
                        else {
                            window.location.href = "/Compte/SignIn"
                        }
                    }}>
                        <div className="icon group-hover:bg-[#1DA1F2] group-hover:bg-opacity-10">
                        {
                            showComment ? (
                                <ChatIcon className="h-7 text-[#1DA1F2]"/>
                            ) : (
                                <ChatIcon className="h-5 group-hover:text-[#1DA1F2]"/>
                            )
                        }
                        </div>
                        {Post.comments.length > 0 && (
                            
                            <span className={`group-hover:text-[#1DA1F2] text-sm ${showComment && "text-[#1DA1F2]"}`}>{Post.comments.length}</span>
                        )}
                    </div>
                    <div
                            className="flex-items-center space-x-1 group"
                            onClick={(e) => {
                                    e.stopPropagation();
                                    showChatRessource();
                            }}
                        >
                            <div className="icon group-hover:bg-green-600/10">
                                {/* <TrashIcon className="h-5 group-hover:text-red-600" /> */}
                                <ChatAlt2Icon className="h-5 group-hover:text-green-600" />
                            </div>
                    </div>
                    <div
                            className="flex-items-center space-x-1 group"
                            onClick={(e) => {
                                if(typeof Cookies.get("userId") != "undefined"){
                                    e.stopPropagation();
                                    showDeleteRessource();
                                }
                                else {
                                    window.location.href = "/Compte/SignIn"
                                }
                            }}
                        >
                            <div className="icon group-hover:bg-red-600/10">
                                <TrashIcon className="h-5 group-hover:text-red-600" />
                            </div>
                    </div>
                    <div className="flex items-center space-x-1 group">
                        <div className="icon group-hover:textbg-purple-500/10">
                            <SwitchHorizontalIcon className="h-5 group-hover:text-purple-500"/>

                        </div>
                    </div>
                    <div className="flex items-center space-x-1 group" onClick={(e) => {
                        if(typeof Cookies.get("userId") != "undefined"){
                            e.stopPropagation();
                            setShowLikers(!showLikers);
                            setShowComment(false);
                        }
                        else {
                            window.location.href = "/Compte/SignIn"
                        }
                            }}>
                        <div className="icon group-hover:bg-pink-600/10">
                                    {showLikers ? (
                                        <HeartIcon className="h-7 text-pink-600"/>
                                    ) : (
                                        <HeartIcon className="h-5 group-hover:text-pink-600"/>
                                    )}
                        </div>
                        {
                                    Post.likers.length > 0 && (
                                        <span 
                                            className={`group-hover:text-pink-600 text-sm ${showLikers && "text-pink-600"}`}
                                        >
                                        {Post.likers.length}    
                                        </span>
                                    )
                                }
                    </div>
                </div>
                {
                showComment ? (
                    <div>
                        {
                            Post.comments.map((el)=>(
                                <div className="flex justify-between w-full">
                                    <Comment comment={el}/>
                                </div>                               
                            ))
                        }              
                    </div>
                ) : (
                    <div></div>
                )
            }
            {
                showLikers ? (
                    <div>
                        {
                            Post.likers.map((el)=>(
                                // test(el)
                                <div className="flex justify-between w-full">
                                    <Likers likers={el}/>
                                </div>                               
                            ))
                        }              
                    </div>
                ) : (
                    <div></div>
                )
            }
            </div>
        </div>
    )
}