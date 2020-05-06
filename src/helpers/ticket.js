import { API } from "../config";

export const createTicket = async (title, category, boardId, userId, token) => {
  try {
    const res = await fetch(`${API}/ticket/${boardId}/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, category }),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};
