import React from "react";
import Log from "../../assets/images/Login.svg";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";

import * as actions from "../../store/actions/index";
import { authenticate } from "../../helpers/auth";
import axiosInstance from "../../helpers/axiosInstance";

const Login = (props) => {
  const sendGoogleToken = (idToken) => {
    axiosInstance
      .post("/login/google", { idToken: idToken })
      .then((response) => {
        console.log(response.data);
        informParent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const informParent = (data) => {
    props.onSignInSuccess(
      data.token,
      data.user._id,
      data.user.name,
      data.user.imageUrl,
      data.user.email,
      data.user.bio
    );
    authenticate(data, () => {
      console.log("déjà dans le local storage !");
      props.history.push("/rooms");
    });
  };

  //get response from GOOGLE
  const responseGoogle = (response) => {
    sendGoogleToken(response.tokenId);
  };

  return (
    <div className="m-auto max-w-lg md:w-full">
      <div className="w-full inline-flex flex-col space-y-6 px-3">
        <img
          src={Log}
          alt="men with messages"
          className="w-56 h-56 md:w-full md:inline-block lg:h-full"
        />
        <GoogleLogin
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              className="focus:outline-none inline-flex space-x-5 items-center p-2 shadow-md rounded max-w-lg justify-center"
              style={{ backgroundColor: "#009688" }}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <svg
                className="h-6 w-6 fill-current md:h-8 md:w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                  fill="#fbbd00"
                />
                <path
                  d="M256 392l-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                  fill="#0f9d58"
                />
                <path
                  d="M139.131 325.477l-86.308 86.308a260.085 260.085 0 0022.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                  fill="#31aa52"
                />
                <path
                  d="M512 256a258.24 258.24 0 00-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 01-51.884 55.638l86.216 86.216a260.085 260.085 0 0025.235-22.158C485.371 388.667 512 324.38 512 256z"
                  fill="#3c79e6"
                />
                <path
                  d="M352.167 159.833l10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                  fill="#cf2d48"
                />
                <path
                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 00-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                  fill="#eb4132"
                />
              </svg>
              <p className="text-sm text-white font-bold md:text-base lg:text-lg hover:text-gray-400">
                Se connecter avec Google
              </p>
            </button>
          )}
        />
        <p className="text-sm text-gray-600 font-medium leading-6 text-center">
          Made by{" "}
          <a
            href="https://github.com/calebrussel77"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800"
          >
            @caleb Russel
          </a>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInSuccess: (token, userId, userName, imageUrl, bio, email) =>
      dispatch(
        actions.authSignInSuccess(token, userId, userName, imageUrl, bio, email)
      ),
  };
};

export default connect(null, mapDispatchToProps)(Login);
