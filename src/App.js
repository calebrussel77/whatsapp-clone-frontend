import React, { useEffect, useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import Chat from "./components/Chat/Chat";
import "./assets/css/index.css";
import "./assets/css/tailwind.css";
import Pusher from "pusher-js";
import axiosInstance from "./helpers/axiosInstance";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import FirstOverview from "./components/FirstOverview/FirstOverview";
import { connect } from "react-redux";
import Login from "./components/Login/Login";
import * as actions from "./store/actions/index";
import Logout from "./components/Logout/Logout";

function App(props) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    props.onCheckSignIn();
  });

  useEffect(() => {
    //We have to fetch inital rooms
    axiosInstance
      .get("/rooms/sync")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const pusher = new Pusher("1e4a066974f307cf86f1", {
      cluster: "eu",
    });

    const channelRooms = pusher.subscribe("rooms");
    channelRooms.bind("inserted", (newRoom) => {
      setRooms([...rooms, newRoom]);
    });

    return () => {
      channelRooms.unbind_all();
      channelRooms.unsubscribe();
    };
  }, [rooms]);

  let routes = (
    <Switch>
      <Route exact path="/" component={Login} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path="/rooms">
          <SideBar rooms={rooms} />
          <FirstOverview />
        </Route>
        <Route exact path="/rooms/:roomId">
          <div className="hidden md:block">
            <SideBar rooms={rooms} />
          </div>
          <Chat />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Redirect to='/rooms'/>
      </Switch>
    );
  }

  return (
    <div className="app">
      <div className="header" />
      <div className="app__body ">{routes}</div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckSignIn: () => dispatch(actions.authCheckStatus()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
