import React, { useState, useEffect } from "react";
import "./CategoryColumn.css";
import { createTicket } from "../../helpers/ticket";
import { Button, Modal, Form } from "react-bootstrap";
import Ticket from "../ticket/Ticket";
import { ReactSortable } from "react-sortablejs";

const CategoryColumn = ({
  board,
  user,
  token,
  name,
  category,
  updateBoard,
  tickets,
}) => {
  const [state, setState] = useState({
    hasBeenCreated: false,
    title: "",
    showModal: false,
    loading: false,
  });
  const [list, setList] = useState(tickets);
  const { title, loading, showModal } = state;

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    createTicket(title, category, board._id, user._id, token)
      .then((data) => {
        setState({ ...state, loading: false, showModal: false });
        setList(list.concat(data.ticket));
        updateBoard(category, data.ticket);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => setState({ ...state, showModal: false });

  const toggleModal = () => setState({ ...state, showModal: true });

  const renderModalForm = () => {
    return (
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Label>Ticket Title</Form.Label>
          <Form.Control
            name="title"
            value={title}
            onChange={handleChange}
            type="text"
            placeholder="Enter column name..."
          />
        </Form.Group>
      </Form>
    );
  };

  const renderCreateTicketModal = () => {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A New Column</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalForm()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={onSubmit} disabled={loading} variant="primary">
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <div className="category text-center p-3  m-4">
      <h4>{name}</h4>
      {renderCreateTicketModal()}
      <Button onClick={toggleModal} className="my-3" block variant="warning">
        Add Ticket
      </Button>
      <ReactSortable list={list} setList={setList}>
        {list.map((t) => (
          <Ticket ticket={t} key={t._id} />
        ))}
      </ReactSortable>
    </div>
  );
};

export default CategoryColumn;
