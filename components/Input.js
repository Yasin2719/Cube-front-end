import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { Picker } from "emoji-mart";
import { postRessource } from "../pages/api/ressource";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';

export default function Input({categories}){
    const [input, setInput] = useState("");
    const [categorie, setCategorie] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [file, setFile] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState("");
    const [link , setLink] = useState("");
    const router = useRouter();

    const refreshData = () => {
        // router.replace(router.asPath);
        // // router.replace(router.asPath, undefined, {scroll: false})
        // setLoading(true);
        router.reload()
      }

    const handleVideo = () => {
        let findLink = input.split(" ");
        console.log(findLink);
        for (let i = 0; i < findLink.length; i++){
            if(findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')){
                let embed = findLink[i].replace('watch?v=', "embed/");
                console.log(embed.split('&')[0])
                setVideo(embed.split('&')[0]);
                findLink.splice(i,1);
                setInput(findLink.join(" "));
                setSelectedFile('');
                setLink('');
            }
            else {
                if(findLink[i].includes("https://") || findLink[i].includes("http://")){
                    setLink(findLink[i]);
                    findLink.splice(i,1);
                    setInput(findLink.join(" "));
                    setSelectedFile('');
                    setVideo('');
                }
            }
        }
    }

    useEffect(() =>{
        handleVideo()
    }, [input, video])

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(categories);
    })

    const sendPost = async() =>{
        // if(loading) return;
        // setLoading(true);
        // if (!input.trim()) return ;
        if (!Cookies.get("userId")){
            setLoading(false);
            alert("utilisateur non connéctés");
            window.location.href = '/Compte/SignIn';
        }
        else{
            const userId = Cookies.get("userId");
            // if (selectedFile == null){
            //     alert("vide");
            //     console.log(selectedFile);
            // } else {
            //     alert("plein");
            // }
            if(userId){
                console.log(categorie);
                alert("ok");
                const data = new FormData()
                data.append("posterId", Cookies.get("userId"));
                data.append("message", input);
                if (file){
                    data.append("file", file);
                    console.log("oui");
                }else if(video) data.append("video", video)
                else if (link) data.append("link", link) 
                data.append("RessourceCategorieId", categorie)
                // data.append("ressourceStatut", "PUBLIC");
                // data.append("likers", []);
                // data.append("comments", []);
                // data.append("ressourceIsValid", true);
                const response = await postRessource(data)
                .then((docs) => (refreshData()))
                .catch((err)=>(console.log(err)));
                alert("ok");
                setLoading(false);
                setInput("");
                setSelectedFile(null);
                setFile(null);
                setVideo(null);
                setLink(null);
                
            }
            else{
                console.log("non connecté");
                window.location.href = "/Compte/SignIn"
            }

        }
    }

    const addImageToPost = (e) => {
        setSelectedFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo("");
        setLink("")
      };

    // const addImageToPost = (e) => {
    //     const reader = new FileReader();
    //     if (e.target.files[0]) {
    //       reader.readAsDataURL(e.target.files[0]);
    //     }
    
    //     reader.onload = (readerEvent) => {
    //       setSelectedFile(readerEvent.target.result);
    //     };
    //   };

    const addEmoji = (e) =>{
        let sym = e.unified.split("-");
        let codeArray = [];
        sym.forEach((el) => codeArray.push("0x"+el));
        let emoji = String.fromCodePoint(...codeArray);
        setInput(input + emoji);
    }
    return (
        <div className={`border-b border-gray p-3 flex space-x-3 overflow-y-scroll`}>
            <img src="https://lh3.googleusercontent.com/-S39qlmxYztQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnYC58uiGPG_o3RUu5jK_ZzIUTW2w/photo.jpg?sz=46" alt="" className="h-11 w-11 rounded-full cursor-pointer"/>
            <div className="w-full divide-y divide-gray">
                <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                    <textarea value={input} rows="2" placeholder="What's happening ?" className="bg-transparent outline-none text-black text-lg placeholder-gray tracking-wide w-full min-h-[50px]" onChange={(e) => setInput(e.target.value)} />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => {
                    setSelectedFile(null);
                    setFile(null);
                }}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />

            </div>
          )}
            {
                video && (
                    <div className="relative">
                        <div
                            className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                            onClick={() => {
                                setVideo("")
                            }}
                        >
                            <XIcon className="text-white h-5" />
                        </div>
                        <iframe
                            src={video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video}
                        ></iframe>
                    </div>
                )}
                {
                link && (
                    <div className="relative">
                        <div
                            className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                            onClick={() => {
                                setLink("")
                            }}
                        >
                            <XIcon className="text-white h-5" />
                            <div>
                            <p>{"  "}</p>
                        </div>
                        </div>
                        <div>
                            <p>{"  "}</p>
                        </div>
                        <div className={`text-[#1DA1F2] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation`}>
                            <a href={link} className="hidden xl:inline text-black">{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}source: {link}</a>
                        </div>
                    </div>
                )}

                </div>

                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center">
                        <div className="icon" onClick={() => filePickerRef.current.click()}>
                        {/* <div className="icon"> */}
                            <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                            <input type="file" id="file-upload" name="file" hidden onChange={(e) => addImageToPost(e)} ref={filePickerRef} />
                            {/* <input type="file" hidden onChange={addImageToPost} ref={filePickerRef}/> */}
                        </div>

                        <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]"/>
                        </div>

                        <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]"/>
                        </div>

                        <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]"/>
                        </div>

                        <div className="p-2">
                            <select name="Categ" onChange={(e)=>(setCategorie(e.target.value))}>
                                <option value={"0"}>Catégorie</option>
                                {
                                    categories.data.map((el) =>(
                                        <option value={el._id}>{el.CategorieLibelle}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="p-2">
                            <select name="TypeRelastion" >
                                <option>Relation</option>
                                <option>Soi</option>
                                <option>En Famille</option>
                            </select>
                        </div>
                        {showEmojis && (
                            <Picker 
                            onSelect={addEmoji}
                            style={{
                                position: "absolute",
                                marginTop: "53500px",
                                marginLeft: -40,
                                maxWidth: "350px",
                                maxHeight: "450px",
                                borderRadius: "200px",
                                backgroundColor: "black",
                                color: "white",
                                // display: "none",
                                // visibly: "hidden"
                            }}
                            theme="auto" />
                        )}
                    </div>
                <button className="bg-[#1DA1F2] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover: bg-[#1a9cd8] disabled:hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-default" disabled={!input.trim() && !selectedFile} onClick={sendPost}>Post</button>
                </div>
            </div>
        </div>
    )
}