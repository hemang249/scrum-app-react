import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./Ticket.css";

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket-card my-3 p-2">
      {ticket.title}
      <br />
      Created By : {ticket.createdBy.username}
    </div>
  );
};

export default Ticket;
