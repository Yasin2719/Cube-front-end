import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { Picker } from "emoji-mart";

export default function Input(){
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendPost = () =>{
        if(loading) return;
        setLoading(true);
    }

    const addImageToPost = () =>{};
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
                    {
                        selectedFile && (
                            <div className="relative">
                                <div className="absolute w-8 h-8 bg-white hover: bg-white bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer" onClick={() => setSelectedFile(null)}>
                                    <XIcon className="text-black h-5" />
                                </div>
                                <img src={selectedFile} alt="" className="rounded-2-xl max-h-80 object-contain" />
                            </div>
                        )
                    }

                </div>

                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex items-center">
                        <div className="icon" onClick={() => filePickerRef.current.click()}>
                            <PhotographIcon className="h-[22px] text-[#1d9bf0]"/>
                            <input type="file" hidden onChange={addImageToPost} ref={filePickerRef}/>
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
                <button className="bg-[#1DA1F2] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover: bg-[#1a9cd8] disabled:hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-default" disabled={!input.trim() && !selectedFile}>Post</button>
                </div>
            </div>
        </div>
    )
}