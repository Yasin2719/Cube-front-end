import Image from "next/image";
import SidebarLink from "./SidebarLink";
import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    DotsCircleHorizontalIcon,
    UserIcon,
    DotsHorizontalIcon
} from "@heroicons/react/solid";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getUserInfos } from "../pages/api/users";
import { useSelector } from "react-redux";

export default function Sidebar({activeLink}){
    const [userConnected, setUserConnected] = useState(false);
    const userData = useSelector((state) => state.UserReducer);
    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [Pseudo, setPseudo] = useState("");

    const getCurrentUser = async (id) => {
        const reponse = await getUserInfos(id);
        const data = reponse.data;
        setPrenom(data.userPrenom);
        setNom(data.userNom);
        setPseudo(data.userPseudo);
    }

    useEffect(()=>{
        if(typeof Cookies.get("userId") != "undefined"){
            getCurrentUser(Cookies.get("userId"));
            setUserConnected(true);
        }
    })
    return(
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:x-[340px] p-2 fixed h-full">
            <div className="flex items-center justify-center w-30 h-30 hoverAnimation p-0 xl:ml-16 text-black">
                {/* <Image src="https://rb.gy/jmkagt" width={30} height={30}/> */}
                <Image src="/logoRE.jpg" width={100} height={100} className="rounded-full"/>
            </div>
            {
                userConnected ? (
                    
                        activeLink ? (
                            <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-12">
                                <SidebarLink text="Home" Icon={HomeIcon} link="/"/>
                                <SidebarLink text="Profil" Icon={UserIcon} active link={`/Compte/Profil/${Cookies.get("userId") ? (Cookies.get("userId")) : ""}`}/>
                                <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
                            </div>
                        ) : (
                            <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-12">
                                <SidebarLink text="Home" Icon={HomeIcon} active link="/"/>
                                <SidebarLink text="Profil" Icon={UserIcon}  link={`/Compte/Profil/${userData._id}`}/>
                                <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
                            </div>
                        )
                    
                ) : (
                    <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-12">
                        <SidebarLink text="Home" Icon={HomeIcon} active link="/"/>
                        <SidebarLink text="Profil" Icon={UserIcon}  link={`/Compte/Profil/SignIn`} />
                        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
                    </div>
                )
            }
                {/* {
                    activeLink ? (
                        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-12">
                            <SidebarLink text="Home" Icon={HomeIcon} link="/"/>
                            <SidebarLink text="Profil" Icon={UserIcon} active link={`/Compte/Profil/${userId}`} />
                            <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
                        </div>
                    ) : (
                        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-12">
                            <SidebarLink text="Home" Icon={HomeIcon} active link="/"/>
                            <SidebarLink text="Profil" Icon={UserIcon}  link={`/Compte/Profil/${userId}`} />
                            <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
                        </div>
                    )
                } */}
                {/* <SidebarLink text="Explore" Icon={HashtagIcon}/>
                <SidebarLink text="Notifications" Icon={BellIcon}/>
                <SidebarLink text="Messages" Icon={InboxIcon}/>
                <SidebarLink text="Bookmarks" Icon={BookmarkIcon}/>
                <SidebarLink text="Lists" Icon={ClipboardListIcon}/> */}           
                {
                    userConnected ?(
                        <button className="hidden xl:inline ml-auto bg-600 text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1DA1F2] hover:text-white" onClick={() =>{
                            Cookies.remove("userId");   
                            window.location.href = "/Compte/SignIn";
                                   
                        }}>Deconnexion</button>
                    ):(
                        <button className="hidden xl:inline ml-auto bg-600 text-black rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1DA1F2] hover:text-white" onClick={() =>{
                            Cookies.remove("userId");   
                            window.location.href = "/Compte/SignIn";  
                                     
                        }}>Connexion</button>
                    )
                }

                {
                    userConnected ? (
                        <div className="text-black flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto">
                            <img src="https://lh3.googleusercontent.com/-S39qlmxYztQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYC58uiGPG_o3RUu5jK_ZzIUTW2w/photo.jpg?sz=46" alt="" className="h-10 w-10 rounded-full xl:mr-2.5"/>
                            <div className="hidden xl:inline leading-5">
                                <h4 className="font-bold">{Nom}{" "}{Prenom}</h4>
                                <p className="text-black">@{Pseudo}</p>
                            </div>
                            <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
                        </div>
                    ) : (
                        <div></div>
                    )
                }


        </div>
    )
}