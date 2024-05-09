/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";
import { FailToast } from "../modules/sharedModule/components/toasts/Toast";
import { mainURL } from "../utils";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loggedUserInfo, setLoggedUserInfo] = useState({});

  const RequestAuthorization = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const gettingUserData = async () => {
    try {
      let res = await axios.get(`${mainURL}/Users/currentUser`, {
        headers: {
          ...RequestAuthorization,
        },
      });
      setLoggedUserInfo(res.data);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        RequestAuthorization,
        loggedUserInfo,
        setLoggedUserInfo,
        gettingUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
