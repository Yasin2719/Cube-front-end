import Image from "next/image";
import ProfilePanelLink from "./ProfilPanelLink";
import { Cog, Collection, ViewBoards, Photograph, User } from "heroicons-react";
import { useRef, useState } from "react";
import { updatePhotoProfil, uploadPicture } from "../pages/api/users";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";


export default function ProfilPanel({userData}){

    const filePickerRef = useRef(null);
    const [file, setFile] = useState(null);
    const [senderFile, setSenderFile] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const refreshData = () => {
        router.reload(window.location.pathname)
        // router.replace(router.asPath);
        // // router.replace(router.asPath, undefined, {scroll: false})
        // setLoading(true);
        // router.reload()
        // router.go(0)
      }
    // const userData = useSelector((state) => state.UserReducer);


    const addImageToPost = async(e) => {
        // setFile(e.target.files[0])
        e.preventDefault()
        // SetSelectedPP(URL.createObjectURL(e.target.files[0]));fault()
        // setFile(e.target.files[0]);
        console.log(file)
        setSenderFile(e.target.files[0]);
        const data = new FormData();
        data.append("userId", userData._id)
        data.append("name", userData.userPrenom),
        data.append("file", e.target.files[0]);
        const res = await updatePhotoProfil(data)
        .then((docs) => {
            refreshData()
        })
        .catch((err)=>(console.log(err)));

        // dispatch(uploadPicture(data, userData._id));
        // sendImage(data)
      };

    //   const sendImage = async () => {
    //     console.log(senderFile)
    //     const data = new FormData();
    //     data.append("userId", userData._id)
    //     data.append("name", userData.userPrenom),
    //     data.append("file", senderFile);

    //     const res = await updatePhotoProfil(data)
    //     .then((docs) => {
    //         refreshData()
    //     })
    //     .catch((err)=>(console.log(err)));
    //   }


    return (
        <div className="text-black flex-grow border-l border-r border-gray max-w-4xl sm:ml-[73px] xl:ml-[370px] font-bold">
            <div className="text-black flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray">
                <h2 className="ext-lg sm:text-xl font-bold">Profil</h2>
                <div>
                    {/* <SparklesIcon className="h-5 text-black" /> */}
                </div>
            </div>
            <div className="flex items-center border-b border-gray">
                <div className="text-center items-center w-40 h-52 hoverAnimation p-0 xl:ml-24 mt-2.5 text-black">
                    {
                        file ? (
                            <Image src={file} width={150} height={150} className="rounded-lg"/>
                        ) : (
                            
                             userData.pp ? (
                                <Image src={userData.pp} width={150} height={150} className="rounded-lg"/>
                                // <Image src={file ? (file) : (userData.pp)} width={130} height={130} className="rounded-lg"/>
                            ) : (
                                <Image src="https://rb.gy/jmkagt" width={150} height={150}/>
                            )
                        )

                    }
                        <button className="hidden xl:inline ml-auto bg-600 text-black rounded-full w-auto h-[52px] text-lg font-bold shadow-md hover:bg-[#1DA1F2] hover:text-white" onClick={() =>{
                            filePickerRef.current.click();
                                   
                        }}>Changer d'image</button>
                        <input type="file" id="pp-upload" name="file" hidden accept=".jpg, .jpeg, .png" onChange={(e) => {
                            setFile(URL.createObjectURL(e.target.files[0]))
                            addImageToPost(e)
                            }} ref={filePickerRef} />
                        {/* <button className="hidden xl:inline ml-auto bg-600 text-black rounded-full w-auto h-[30px] text-lg font-bold shadow-md hover:bg-[#1DA1F2] hover:text-white" onClick={() => {sendImage()}}>Send</button> */}

                </div>
                <div className="items-center justify-center p-3 ml-24">
                <h2 className="text-lg sm:text-xl font-bold">{userData.userPseudo}</h2><br></br>
                <h2 className="text-lg sm:text-xl font-bold">Membre depuis le : {userData.createdAt}</h2><br></br>
                <button className="hidden xl:inline bg-600 text-black rounded-full w-[300px] h-[52px] text-lg font-bold shadow-md hover:bg-[#1DA1F2] hover:text-white" onClick={() =>{
                                   
                        }}>Abonnements:{'\u00A0'}{userData.following ? userData.following.length : ""}</button><br></br><br></br>
                <button className="hidden xl:inline bg-600 text-black rounded-full w-[300px] h-[52px] text-lg font-bold shadow-md hover:bg-[#1DA1F2] hover:text-white" onClick={() =>{
                                   
                        }}>Abonnés:{'\u00A0'}{userData.followers ? userData.followers.length : ""}</button>
                </div>
                
                
            </div>

            <ProfilePanelLink text="Données Personelles" Icon={User} link={`/Compte/${userData.userPseudo}`}/>
            <ProfilePanelLink text="Mes Ressources" Icon={Photograph} link={`/Compte/ressources/${userData._id}`}/>
            <ProfilePanelLink text="Bibliothèque" Icon={Collection} link="#"/>
            <ProfilePanelLink text="Tableau de Progression" Icon={ViewBoards} link="/"/>
            <ProfilePanelLink text="Settings" Icon={Cog} link="#"/>
        </div>
    )
}