import React, { useEffect, useState } from "react";
import "./Chat.css";
import { IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import moment from "moment";
import axiosInstance from "../../helpers/axiosInstance";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const pusher = new Pusher("1e4a066974f307cf86f1", {
      cluster: "eu",
    });

    const channelMsgs = pusher.subscribe("messages");
    channelMsgs.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      //clean up functions to allow the navigator to not be slow
      channelMsgs.unbind_all();
      channelMsgs.unsubscribe();
    };
  }, [messages]);

  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const initialRoomState = {
    image: "",
    name: "",
    _id: null,
  };
  const [roomDetails, setRoomDetails] = useState(initialRoomState);

  useEffect(() => {
    if (roomId) {
      axiosInstance
        .get(`/rooms/messages/${roomId}`)
        .then((response) => {
          setRoomDetails({
            image: response.data.image,
            name: response.data.name,
            _id: response.data._id,
          });
          setMessages(response.data.messageId);
        })
        .catch((err) => console.log(err));
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    axiosInstance.post(`/messages/new/${roomId}`, {
      name: props.userName,
      message: input,
      received: true,
      timestamp: new Date(),
    });
    setInput("");
  };
  return (
    <div className="chat animate__fadeIn animate__animated flex-1">
      <div className="flex flex-row items-center px-6 md:px-10 py-3 space-x-6">
        <LazyLoadImage
          src={roomDetails.image}
          alt={roomDetails.name}
          effect="blur"
          className="h-8 w-8 object-center bg-cover border border-gray-400 object-cover rounded-full md:h-16 md:w-16"
        />
        <div className="chat__headerInfo m-0 ">
          <h3 className="font-bold text-lg lg:text-xl leading-6 mb-2 truncate w-20 md:w-auto ">
            {roomDetails.name}
          </h3>
          <marquee className="text-xs md:w-full text-base lg:hidden text-gray-600">
            Last seen at{" "}
            {moment(messages[messages.length - 1]?.timestamp).format(
              "ddd, hh:mm A"
            )}
          </marquee>
          <p className="text-xs md:w-full text-base hidden lg:block text-gray-600">
            Last seen at{" "}
            {moment(messages[messages.length - 1]?.timestamp).format(
              "ddd, hh:mm A"
            )}
          </p>
        </div>
        <div className="inline-flex flex-row space-x-2 items-center lg:w-56 lg:space-x-6">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body animate__fadeIn animate__animated lg:px-32 lg:py-16">
        {messages.length
          ? messages.map((message) => {
              return (
                <div
                  key={message._id}
                  className={
                    message.name === props.userName
                      ? "chat__message chat__receiver"
                      : "chat__message"
                  }
                >
                  <span className="chat__name text-xs text-gray-900 font-semibold leading-tight whitespace-no-wrap">
                    {message.name}
                  </span>
                  {message.message}
                  <p className="text-xs text-gray-600 font-light text-right px-1">
                    {moment(message.timestamp).format("ddd, hh:mm A")}
                  </p>
                </div>
              );
            })
          : null}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userName: state.auth.userName,
    imageUrl: state.auth.imageUrl,
  };
};

export default connect(mapStateToProps)(Chat);
