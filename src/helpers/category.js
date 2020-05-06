import { API } from "../config";

export const createCategory = async (name, boardId, userId, token) => {
  try {
    const res = await fetch(`${API}/category/${boardId}/${userId}`, {
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
