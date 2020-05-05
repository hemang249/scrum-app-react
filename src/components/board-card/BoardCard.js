import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./BoardCard.css";
import { setBoard } from "../../helpers/board";
import { Redirect } from "react-router-dom";

const BoardCard = (props) => {
  const [redirect, setRedirect] = useState(false);

  const onClick = (e) => {
    setBoard(props.board);
    setRedirect(true);
  };

  return (
    <div>
      {redirect && <Redirect to="/board" />}
      <Card className="board" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className="text-light">
            {props.board.name.toUpperCase()}
          </Card.Title>
          <Card.Text className="text-light">
            Created By :{" "}
            <span className="text-primary">
              {props.board.createdBy.username}
            </span>
          </Card.Text>
          <div className="my-4">
            <br /> <br />
            <Button onClick={onClick} variant="primary" block>
              View Board
            </Button>
            <Button variant="danger" block>
              Delete Board
            </Button>
            <Button variant="warning" block>
              Update Board
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BoardCard;
