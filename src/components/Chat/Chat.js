import React, { useState } from "react";
import "./Chat.css";
import FirstOverview from "../FirstOverview/FirstOverview";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import moment from "moment";
import axiosInstance from "../../helpers/axiosInstance";
moment().format();

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    axiosInstance.post("/messages/new", {
      name: "Demo App",
      message: input,
      timestamp: new Date(),
      received: true,
    });
    setInput("");
  };
  return (
    <div className="chat">
      {/*<FirstOverview/>*/}
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
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

      <div className="chat__body">
        {messages.length
          ? messages.map((message) => {
              return (
                <p
                  key={message.id}
                  className={
                    message.received
                      ? "chat__message chat__receiver"
                      : "chat__message"
                  }
                >
                  <span className="chat__name">{message.name}</span>
                  {message.message}
                  <span className="chat__timestamp">
                    {moment(message.timestamp).fromNow()}
                  </span>
                </p>
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

export default Chat;
