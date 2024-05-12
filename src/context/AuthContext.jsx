/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { FailToast } from "../modules/sharedModule/components/toasts/Toast";
import { mainURL } from "../utils";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loggedUserInfo, setLoggedUserInfo] = useState({});

  const RequestAuthorization = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const gettingUserData = useCallback(async () => {
    try {
      let res = await axios.get(`${mainURL}/Users/currentUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.getItem("token") && setLoggedUserInfo(res.data);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    gettingUserData();
  }, [gettingUserData]);

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
