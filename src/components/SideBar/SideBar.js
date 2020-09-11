import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";

const SideBar = () => {
  const createNewChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      console.log(roomName);
      //Do some clever database stuff
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu_rrbtucdPoTWMHxcF1YjIUerNYLPBIuD6yhiCj=s83-c-mo" />
        <div className="sidebar__headerRight">
          {/*Need tobe Wrapped by the IconButton to be clickable*/}
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or Start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <div className="sidebarChat" onClick={createNewChat}>
          <h2>Add New Chat</h2>
        </div>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default SideBar;
