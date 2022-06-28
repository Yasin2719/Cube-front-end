import { SparklesIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Post from "./Post";

export default function Feed({ressources}){
    const [showAddPost, setShowAddPost] = useState(false);

    return (
        <div className="text-black flex-grow border-l border-r border-gray max-w-4xl sm:ml-[73px] xl:ml-[370px] font-bold">
            <div className="text-black flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray">
                <h2 className="ext-lg sm:text-xl font-bold">Mes Ressources</h2>
                <div>
                    <SparklesIcon className="h-5 text-black" />
                </div>
            </div>
            <div className="pb-72">
                {ressources.data.map((el)=>(
                    <Post key={el._id} id={el._id} Post={el} PostPage={el.message}/>
                ))
                }
            </div>
            {/* <div className="absolute bg-[#1d9bf0] text-white hoverAnimation xl:ml-[720px] mb-8 hover:bg-white hover:text-[#1d9bf0]">
                <PlusIcon className="h-12 hidden xl:inline" onClick={() =>{setShowAddPost(!showAddPost)}}/>
            </div> */}
        </div>
    )
}