import React, { useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import axiosInstance from "../../helpers/axiosInstance";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  const rooms = props.rooms;

  const [card, setCard] = useState(false);

  const createNewChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //Do some clever database stuff
      axiosInstance
        .post("/rooms/new", {
          name: roomName,
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="sidebar flex-1 md:flex-4 h-full">
      <div className="sidebar__header">
        <LazyLoadImage
          src={props.userImage}
          alt="user-connected"
          effect="blur"
          className="h-8 w-8 object-center bg-cover border border-gray-400 object-cover rounded-full md:h-10 md:w-10"
        />
        <div className="inline-flex items-center flex-row space-x-2 lg:space-x-6">
          {/*Need tobe Wrapped by the IconButton to be clickable*/}
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <div onClick={() => setCard(!card)} className="relative">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            {card ? (
              <div className="absolute bg-white top-0 right-0 rounded-md mt-8 shadow-lg cursor-pointer">
                <Link to="/logout">
                  <div className="rounded-md flex items-center font-semibold space-x-2 text-red-700 my-5 text-left cursor-pointer py-2 px-4 hover:bg-red-100 inline-block">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="whitespace-no-wrap">Se déconnecter</span>
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
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
          <h2 className="font-bold text-xl text-center text-gray-900">
            Add New Chat
          </h2>
        </div>
        {rooms.map((room) => {
          return <SidebarChat key={room._id} room={room} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userImage: state.auth.imageUrl,
    userEmail: state.auth.email,
  };
};

export default connect(mapStateToProps)(SideBar);
