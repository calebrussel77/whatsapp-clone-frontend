import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";
import axiosInstance from "../../helpers/axiosInstance";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SidebarChat = (props) => {
  const room = props.room;
  const [lastMsg, setLastMsg] = useState("");

  useEffect(() => {
    if (room._id) {
      axiosInstance
        .get(`/rooms/last-message/${room._id}`)
        .then((response) => setLastMsg(response.data.message));
    }
  }, [lastMsg, room._id]);

  useEffect(() => {
    const pusher = new Pusher("1e4a066974f307cf86f1", {
      cluster: "eu",
    });

    const channelLastMsg = pusher.subscribe("lastMsg");
    channelLastMsg.bind("inserted", (newLastMsg) => {
      setLastMsg(newLastMsg.message);
    });

    return () => {
      //clean up functions to allow the navigator to not be slow
      channelLastMsg.unbind_all();
      channelLastMsg.unsubscribe();
    };
  }, [lastMsg]);

  return (
    <Link to={`/rooms/${room._id}`}>
      <div className="sidebarChat" onClick={() => console.log("salut")}>
        <LazyLoadImage
          src={room.image}
          alt="girl"
          effect="blur"
          className="h-12 w-12 object-center bg-cover border border-gray-400 object-cover rounded-full md:h-16 md:w-16"
        />
        <div className="pl-8">
          <h2 className="font-bold text-xl text-gray-900">{room.name}</h2>
          <p className="text-sm text-gray-600">{lastMsg}</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
