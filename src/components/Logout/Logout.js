import React from "react";
import * as actions from "../../store/actions/index";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Logout(props) {
    useEffect(() => {
        props.onLogout();
    }, []);
    
    return <Redirect to="/" />;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.authLogout()),
    };
};
export default connect(null, mapDispatchToProps)(Logout);
