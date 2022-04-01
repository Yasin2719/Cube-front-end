import Image from "next/image";
import ProfilePanelLink from "./ProfilPanelLink";
import { Cog, Collection, ViewBoards, Photograph, User } from "heroicons-react";


export default function ProfilPanel(){
    return (
        <div className="text-black flex-grow border-l border-r border-gray max-w-4xl sm:ml-[73px] xl:ml-[370px] font-bold">
            <div className="text-black flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray">
                <h2 className="ext-lg sm:text-xl font-bold">Profil</h2>
                <div>
                    {/* <SparklesIcon className="h-5 text-black" /> */}
                </div>
            </div>
            <div className="flex items-center border-b border-gray">
                <div className="flex items-center justify-center w-40 h-40 hoverAnimation p-0 xl:ml-24 text-black">
                    <Image src="https://rb.gy/jmkagt" width={150} height={150}/>                
                </div>
                <div className="flex items-center justify-center p-3 ml-24">
                <h2 className="ext-lg sm:text-xl font-bold">Marokino270_3atay</h2>
                </div>
                
            </div>
            <ProfilePanelLink text="Données Personelles" Icon={User} link="#"/>
            <ProfilePanelLink text="Mes Ressources" Icon={Photograph} link="/"/>
            <ProfilePanelLink text="Bibliothèque" Icon={Collection} link="#"/>
            <ProfilePanelLink text="Tableau de Progression" Icon={ViewBoards} link="/"/>
            <ProfilePanelLink text="Settings" Icon={Cog} link="#"/>
        </div>
    )
}