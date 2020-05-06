import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import "./Board.css";
import CategoryColumn from "../category-column/CategoryColumn";
import { getBoard, updateBoard, setBoard } from "../../helpers/board";
import { getToken, getUser } from "../../helpers/auth";

const Board = (props) => {
  const [state, setState] = useState({
    user: null,
    token: null,
    board: null,
    loading: true,
  });
  const { token, user, board } = state;

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    const board = getBoard();
    setState({ ...state, token, user, board });
  }, []);

  const updateBoardTickets = (category, ticket) => {
    const b = board;
    b[`${category}Tickets`].push(ticket);
    setState({ ...state, board: b, loading: true });
    updateBoard(board, user._id, token)
      .then((data) => {
        setState({ ...state, board: data.board, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false });
      });
  };

  if (board) {
    return (
      <div>
        <Header />
        <div className="board-container">
          <CategoryColumn
            updateBoard={updateBoardTickets}
            category="todo"
            name="To Do"
            tickets={board.todoTickets}
            user={user}
            token={token}
            board={board}
          />
          <CategoryColumn
            updateBoard={updateBoardTickets}
            category="doing"
            name="Doing"
            tickets={board.doingTickets}
            user={user}
            token={token}
            board={board}
          />
          <CategoryColumn
            category="done"
            updateBoard={updateBoardTickets}
            name="Done"
            tickets={board.doneTickets}
            user={user}
            token={token}
            board={board}
          />
        </div>
      </div>
    );
  } else return <div> Loading ....</div>;
};

export default Board;
