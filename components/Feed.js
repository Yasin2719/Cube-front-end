import { SparklesIcon, PlusIcon } from "@heroicons/react/solid"
import Input from "./Input"
import { useState } from "react";
import Post from '../components/Post';
import Cookies from "js-cookie";
export default function Feed({ressources, categories}){
    const [showAddPost, setShowAddPost] = useState(false);

    return (
        <div className="text-black flex-grow border-l border-r border-gray max-w-4xl sm:ml-[73px] xl:ml-[370px] font-bold">
            <div className="text-black flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray">
                <h2 className="ext-lg sm:text-xl font-bold">Home</h2>
                <div>
                    <SparklesIcon className="h-5 text-black" />
                </div>
            </div>
            {showAddPost && (
               <Input categories={categories}/> 
            )
            }
            <div className="pb-72">
                {ressources.data.map((el)=>(
                    <Post key={el._id} id={el._id} Post={el} PostPage={el.message}/>
                ))
                }
            </div>
            <div className="fixed bottom-3.5 right-1/3 bg-[#1d9bf0] text-white hoverAnimation xl:ml-[720px] hover:bg-white hover:text-[#1d9bf0]">
                <PlusIcon className="h-12 hidden xl:inline" onClick={() =>{
                    if(typeof Cookies.get("userId") != "undefined"){
                        setShowAddPost(!showAddPost);
                    }
                    else{
                        window.location.href = "/Compte/SignIn";
                    }
                    
                    }}/>
            </div>
        </div>
    )
}