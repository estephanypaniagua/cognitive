import { AuthProvider } from "ra-core";

import { authRequest } from "#root/api/axios";

import { getAccessToken, setAccessToken } from "./accessToken";
import { UserIdentity } from "react-admin";

const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    try {
      const res = await authRequest.post("/login", {
        mail: username,
        password,
      });
      setAccessToken(res.data?.token);
      // localStorage.setItem("username", username);
      // accept all username/password combinations
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err?.response?.data?.message ?? err.message);
    }
  },

  // called when the user clicks on the logout button
  logout: () => {
    setAccessToken("");
    // localStorage.removeItem("username");
    return Promise.resolve();
  },

  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      setAccessToken("");
      // localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    if (window.location.hash === "#/landing") return Promise.resolve();

    return getAccessToken() ? Promise.resolve() : Promise.reject();
    // return localStorage.getItem("username") ? Promise.resolve() : Promise.reject();
  },

  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: async () => {
    if (window.location.hash === "#/landing") return Promise.resolve();
    try {
      const accessToken = getAccessToken();
      if (!accessToken) return Promise.reject();
      const res = await authRequest.get("/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const role = res.data?.role;
      return role;
    } catch (err) {
      return Promise.reject("guest");
      // return Promise.reject(err?.response?.data?.message ?? err.message);
    }
  },

  getIdentity: async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) return Promise.reject();
      const res = await authRequest.get("/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userIdentity: UserIdentity = {
        id: res.data?.id,
        fullName: res.data?.name,
        // avatar: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg",
        avatar: `https://ui-avatars.com/api/?name=${res.data?.name}`,
      };
      return userIdentity;
    } catch (err) {
      return Promise.reject(err?.response?.data?.message ?? err.message);
    }
  },
};

export default authProvider;
