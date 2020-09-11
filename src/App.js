import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import Chat from "./components/Chat/Chat";
import "./App.css";
import Pusher from "pusher-js";
import axiosInstance from "./helpers/axiosInstance";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    //We have to fetch inital message
    axiosInstance
      .get("/messages/sync")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("a490cbd4671f82b47b87", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      //clean up functions to allow the navigator to not be slow
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="header" />
      <div className="app__body">
        <SideBar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
