import { API } from "../config";

export const setUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

export const setToken = (token) => {
  sessionStorage.setItem("token", JSON.stringify(token));
};

export const getToken = () => {
  return JSON.parse(sessionStorage.getItem("token"));
};

export const registerUser = async (email, username, password) => {
  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};
