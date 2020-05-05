import React from "react";
import { Card } from "react-bootstrap";
import "./CreateBoardCard.css";

const CreateBoardCard = (props) => {
  return (
    <div>
      <Card
        onClick={props.onClick}
        className="create-board"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>Create A New</Card.Title>
          <div className="my-4">
            <br /> <br />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateBoardCard;
