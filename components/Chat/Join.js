import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { default as socket } from "./ws";

function Join() {
    const [nickname, setNickname] = useState();
    const handleOnClick = () => window.location.href(`/chat/${nickname}`);

    useEffect(() => {
        localStorage.setItem("chatConnected", "true");
      }, []);

      const submitNickname = () => {
        socket.emit("user nickname", nickname);
      };
}