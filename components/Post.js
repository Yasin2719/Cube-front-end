import { ChatIcon, DotsHorizontalIcon, SwitchHorizontalIcon, TrashIcon, HeartIcon, ChatAlt2Icon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { likeRessource } from "../pages/api/ressource";
import Cookies from "js-cookie";
import InputCommentaire from "./InputComment"
import Comment from "./comments"
import { useRouter } from 'next/router';
import { getCategorieById } from "../pages/api/categorie";

export default function Post ({id, Post, postPage}){
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [nbLike, setNbLike] = useState(null)
    const [creator, setCreator] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    let UserId = ""
    const [categorie, setCategorie] = useState("")

    const refreshData = () => {
        // router.replace(router.asPath);
        router.replace(router.asPath, undefined, {scroll: false})
        setIsRefreshing(true);
        // router.reload()
      }

    const getCategorieLibelle = async(id) =>{
        if (id !== "" && typeof id !== "undefined"){
            const data = await getCategorieById(id)
            .then((data) =>{
            setCategorie(data.CategorieLibelle);
            })
            .catch(()=>{
                // alert("error")
            })

        }


    }

    useEffect(() => {
        setIsRefreshing(false);
      }, [Post]);

    useEffect(()=>{
        setLikes(Post.likers);
        setNbLike(Post.likers.length)
        if(typeof Post.RessourceCategorieId !== "undefined" && Post.RessourceCategorieId !== "" && Post.RessourceCategorieId != "undefined"){
            getCategorieLibelle(Post.RessourceCategorieId);
            // console.log(Post.RessourceCategorieId);
        } 
        // console.log(Post._id);
        // console.log("Cookie userId: ",Cookies.get("userId"));
    })

    useEffect(()=> {
        UserId = Cookies.get("userId");
        // console.log(UserId)
        // console.log("useEffect");
        if (Post.posterId == UserId){
            setCreator(true);
        }
        Post.likers.map((liker)=>{
            if(liker == UserId){
                setLiked(true);
            }
        })
        // console.log(Post.photo)
    }, [likes])
    const likePost = async(id) =>{
        setLiked(!liked);
        
        const response = await likeRessource(liked, id)
        .then((data)=>{
            console.log(data.data.data.likers.length)
            refreshData();
            // setNbLike(data.data.data.likers.length)
        })
        .catch((err)=>(console.log(err)));  
    }

    const showChatRessource = () =>{
        if(typeof Cookies.get("userId") != "undefined"){
            window.location.href = `/Chat/${id}`
        }
        else {
            window.location.href = "/Compte/SignIn"
        }

    }
    return(
        <div className="p-3 flex cursor-pointer border-b border-gray">
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex justify-between">
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
                    {
                        creator ? (
                            <div className="icon group flex-shrink-0 ml-auto">
                                <DotsHorizontalIcon className="h-5 text-gray group-hover:text-[#1DA1F2]" />
                            </div>
                        ) : (
                            <div></div>
                        )
                    }

                </div>
                {
                    Post.photo && (
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
                <div
                className={`text-[#6e767d] flex justify-between w-10/12 ${
                    postPage && "mx-auto"
                }`}
                >
                <div className="flex items-center space-x-1 group" onClick={(e) => {
                    if(typeof Cookies.get("userId") != "undefined"){
                        e.stopPropagation();
                        setShowComment(!showComment);
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
                        <span className="group-hover:text-[#1DA1F2] text-sm">{Post.comments.length}</span>
                    )}
                </div>
                <div className="flex-items-center space-x-1 group" onClick={(e) => {
                                e.stopPropagation();
                                showChatRessource();
                            }}>
                    <div className="icon group-hover:bg-green-600/10">
                        {/* <TrashIcon className="h-5 group-hover:text-red-600" /> */}
                        <ChatAlt2Icon className="h-5 group-hover:text-green-600" />
                    </div>
                </div>
                <div className="flex items-center space-x-1 group">
                    <div className="icon group-hover:textbg-purple-500/10">
                        <SwitchHorizontalIcon className="h-5 group-hover:text-purple-500"/>

                    </div>
                </div>
                {
                // creator ? (
                //     <div
                //         className="flex-items-center space-x-1 group"
                //         onClick={(e) => {
                //             e.stopPropagation();
                //             // deleteDoc();
                //         }}
                //     >
                //             <div className="icon group-hover:bg-green-600/10">
                //                 {/* <TrashIcon className="h-5 group-hover:text-red-600" /> */}
                //                 <ChatAlt2Icon className="h-5 group-hover:text-green-600" />
                //             </div>
                //     </div>
                // ): (
                //     <div className="flex items-center space-x-1 group">
                //         <div className="icon group-hover:textbg-green-500/10">
                //             <SwitchHorizontalIcon className="h-5 group-hover:text-green-500"/>

                //         </div>
                //     </div>
                // )
                }
                    <div 
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            if(typeof Cookies.get("userId") != "undefined"){
                                e.stopPropagation()
                                let l = nbLike 
                                liked ? setNbLike(l - 1) : setNbLike(nbLike +1)
                                // setNbLike(nbLike)
                                likePost(Post._id);
                                // console.log(nbLike);
                            }
                            else {
                                window.location.href = "/Compte/SignIn"
                            }
                        }}
                    >
                         <div className="icon group-hover:bg-pink-600/10">
                            {liked ? (
                                <HeartIcon className="h-5 text-pink-600"/>
                            ) : (
                                <HeartIcon className="h-5 group-hover:text-pink-600"/>
                            )}
                         </div>
                         <span 
                                    className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                                }`}
                                >
                                 {Post.likers.length}    
                                 </span>
                         {/* {
                             nbLike && (
                                <span 
                                    className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                                }`}
                                >
                                 {nbLike}    
                                 </span>
                             )
                         } */}
                    </div>
                    {
                        categorie && (
                            <div>
                                <span>{categorie}</span>
                            </div>
                        )
                    }

                    {
                        (Post.ressourceTypeRelation.length > 0) && (
                            <div>
                                <select onChange={(e) => (e.preventDefault())}>
                                {
                                    Post.ressourceTypeRelation.map((el) => (
                                        <option>{el}</option>
                                                            
                                    ))
                                }
                            </select>
                            </div>

                        )
                    }


                {
                    // !creator ? (
                    //     <div 
                    //     className="flex items-center space-x-1 group"
                    //     onClick={(e) => {
                    //         // e.stopPropagation();
                    //         likePost(Post._id);
                            
                    //     }}
                    // >
                    //      <div className="icon group-hover:bg-pink-600/10">
                    //         {liked ? (
                    //             <HeartIcon className="h-5 text-pink-600"/>
                    //         ) : (
                    //             <HeartIcon className="h-5 group-hover:text-pink-600"/>
                    //         )}
                    //      </div>
                    //      {
                    //          Post.likers.length > 0 && (
                    //             <span 
                    //                 className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                    //             }`}
                    //             >
                    //              {Post.likers.length}    
                    //              </span>
                    //          )
                    //      }
                    // </div>
                    // ):(
                    //     <div></div>
                    // )
                }
                </div>
                {
                showComment ? (
                    <div>
                        {
                            Post.comments.map((el)=>(
                                <div className="flex justify-between w-full">
                                    <Comment comment={el} idRessource={id}/>
                                </div>                               
                            ))
                        }
                        <div className="flex justify-between w-full">
                            <InputCommentaire idRessource={id} />
                        </div>
                        
                    </div>
                ) : (
                    <div></div>
                )
            }
            </div>
        </div>
    )
}