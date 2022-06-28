import React, {useState, useEffect} from "react";
import {default as socket} from "../../components/Chat/ws";
import toast, { ToastContainer  } from "react-nextjs-toast";
import Cookies from "js-cookie";
import UserOnline from "../../components/Chat/UserOnline";
import { getUserInfos } from "../api/users"
import { getRessources, getRessourcesById } from "../api/ressource";

export default function ChatBox({ressource}) {
    // let { user_nickName } = useParams();
    // const user_nickName = getUserName(Cookies.get("userId")) ;
    const [nickname, setNickname] = useState("");
    const [msg, setMsg] = useState("");
    const [chat, setChat] = useState([]);
    const [usersOnline, setUsersOnline] = useState([]);
    const [toUser, setToUser] = useState("");
    // const history = useHistory();

    const getUserName = async (id)=>{
      console.log("entrer");
      const res = await getUserInfos(id)
      .then((result)=>{
        setNickname(result.data.userPseudo);
        socket.emit("user nickname", nickname);
        return (result.data.userPseudo);
      })
      .catch(()=>{
        alert("error");
      })
    }

    useEffect(() => {    
        // window.addEventListener("beforeunload", () =>
        //   localStorage.removeItem("chatConnected")
        // );
        const userConnected = Cookies.get("userId");
        if(typeof Cookies.get("userId") === "undefined") {
          window.location.href = "/Compte/SignIn"
        }
        else{
          const userPseudo = getUserName(userConnected);
          if (!localStorage.getItem("chatConnected")) {
            history.push(`/`);
          }
      
          // window.addEventListener("beforeunload", () =>
          //   localStorage.removeItem("chatConnected")
          // );
      
          setNickname("yasin");
          socket.on("chat message", ({ nickname, msg }) => {
            setChat([...chat, { nickname, msg }]);
          });
      
          // socket.on("private msg", ({ id, nickname, msg }) => {
          //   setChat([...chat, `🔒 Private Message from ${nickname}: ${msg}`]);
          // });
      
          let objDiv = document.getElementById("msg");
          objDiv.scrollTop = objDiv.scrollHeight;
      
          return () => {
            socket.off();
          };
        }
      }, [chat, toUser, nickname]);
    
      useEffect(() => {
        socket.on("connect", () => {
          socket.emit("new-user");
        });
    
        socket.on("users-on", (list) => {
          setUsersOnline(list);
        });
    
        socket.on("welcome", (user) => {
          setChat([...chat, `Welcome to our chat ${user} 😃`]);
        });
    
        socket.on("user-disconnected", (user) => {
          if (user !== null) {
            setChat([...chat, `${user} left the chat 👋🏻`]);
          }
        });
    
        return () => {
          socket.off();
        };
      }, [chat]);

    const submitMsg = (e) => {
        e.preventDefault();
    
        if (msg === "") {
          toast.notify("Enter a message.", {
            duration: 4000,
            type: "error",
            // Custom Icon
            // icon: "⚠️",
            // // Aria
            // role: "status",
            // ariaLive: "polite",
          });
        } else if (toUser === nickname) {
          toast.notify("Select a different user.", {
            duration: 4000,
            type: "error",
          });
        } else if (toUser !== "") {
          let selectElem = document.getElementById("usersOn");
          selectElem.selectedIndex = 0;
          socket.emit("chat message private", { toUser, nickname, msg });
          setChat([...chat, { nickname, msg }]);
          setChat([...chat, `🔒 Private Message for ${toUser}: ${msg}`]);
          setMsg("");
          setToUser("");
        } else {
          socket.emit("chat message", { nickname, msg });
          setChat([...chat, { nickname, msg }]);
          setMsg("");
        }
      };

      const saveUserToPrivateMsg = (userID) => {
        setToUser(userID);
      };

      return (
        <div className="flex w-screen main-chat lg:h-screen bg-white divide-solid">
          <ToastContainer />
             <div className="flex w-full lg:w-5/6 lg:h-5/6 lg:mx-auto lg:my-auto shadow-md">
                {/* Users online */}
                <div className="hidden lg:block pl-4 pr-4 w-64 bg-[#1DA1F2] text-white">
                    <p className="font-black my-4 text-xl">
                        {" "}
                        Créateur {ressource.posterPseudo}
                    </p>
                    <p className="font-black my-4 text-xl">
                        {" "}
                        # Online: ({usersOnline !== null ? usersOnline.length : "0"}):
                    </p>
                    <ul className="divide-y divide-gray-300 truncate">
                        {usersOnline !== null
                        ? usersOnline.map((el, index) => (
                            <button
                                key={index}
                                // onClick={() => saveUserToPrivateMsg(el)}
                                className="block focus:outline-none truncate"
                            >
                                <UserOnline nickname={el} />
                            </button>
                            ))
                        : ""}
                        {nickname}
                    </ul>
                </div>
                <div className="flex flex-col flex-grow lg:max-w-full bg-blue-50">
                    <p className="font-black mt-4 mb-2 pl-4 lg:pl-8 text-2xl">
                        Main Chat
                    </p>
                    <div id="msg" className="h-5/6 overflow-y-auto pl-4 lg:pl-8 pt-4 mb-2 lg:mb-0">
                        <ul className="w-full lg:w-96">
                        {chat.map((el, index) => (
                            <li
                            key={index}
                            className="w-screen break-words pr-6 lg:pr-0 lg:w-full"
                            >
                            {el.nickname != null ? (
                              <div>
                                <p className="font-black">{el.nickname} :</p>
                                <p>{el.msg}</p>
                                <br></br>
                              </div>

                            ) : (
                                <p className="text-base font-semibold text-purple-900 rounded py-1">
                                {el}
                                </p>
                            )}
                            </li>
                        ))}
                        </ul>
                    </div>
                    <form className="">
                      <div className="w-full flex p-4 lg:p-8 bg-purple-50">
                        {" "}
                        <div className="flex relative w-full lg:w-5/6">
                          <span className="rounded-l-md inline-flex items-center px-1 lg:px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            {toUser === "" ? (
                              <p className="bg-purple-400 text-white text-xs lg:text-base font-normal rounded p-1">
                                To: Everyone
                              </p>
                            ) : (
                              <p className="bg-purple-700 text-white text-xs lg:text-base font-semibold rounded p-1 w-20 lg:w-28 truncate">
                                To: {toUser}
                              </p>
                            )}
                          </span>
                          <input
                            type="text"
                            className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-1 lg:px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                            name="message"
                            onChange={(e) => setMsg(e.target.value)}
                            value={msg}
                          />
                        </div>
                        <div className="hidden lg:block w-1/6">
                          <button
                            className="ml-8 flex-shrink-0 bg-green-400 text-gray-700 text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2"
                            onClick={(e) => submitMsg(e)}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
                </div>
             </div>
        </div>
      )
}

export const getStaticPaths = async() => {
  const ressources = await getRessources();
  const paths = ressources.data.map((ressource) => ({
      params: {ressource: ressource._id}
  }));
  return{
      paths,
      fallback: false
  }
}

export async function getStaticProps({params}){

  const response = await getRessourcesById(params.ressource);
  return {props: {ressource: response.data}}
}