import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBIm76UyWmrMlEuFb8dInRWza8iFlTdYtDbg&usqp=CAU" />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>This is the last message </p>
      </div>
    </div>
  );
};

export default SidebarChat;
