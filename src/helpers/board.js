import { API } from "../config";

export const setBoard = (board) => {
  sessionStorage.setItem("board", JSON.stringify(board));
};

export const getBoard = () => {
  return JSON.parse(sessionStorage.getItem("board"));
};

export const createBoard = async (name, userId, token) => {
  try {
    const res = await fetch(`${API}/board/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

export const getAllBoards = async (userId, token) => {
  try {
    const res = await fetch(`${API}/board/all/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};
