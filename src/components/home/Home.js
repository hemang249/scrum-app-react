import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import {
  Form,
  Alert,
  Row,
  Col,
  Container,
  Modal,
  Button,
} from "react-bootstrap";
import "./Home.css";
import BoardCard from "../board-card/BoardCard";
import CreateBoardCard from "../create-board-card/CreateBoardCard";
import { getAllBoards, setBoard, createBoard } from "../../helpers/board";
import { getUser, getToken } from "../../helpers/auth";

const Home = (props) => {
  const [state, setState] = useState({
    showModal: false,
    name: "",
    error: null,
    success: false,
    loading: false,
    boards: [],
    user: null,
    token: null,
  });
  const {
    showModal,
    user,
    token,
    name,
    error,
    success,
    loading,
    boards,
  } = state;

  useEffect(() => {
    const token = getToken();
    const user = getUser();
    getAllBoards(user._id, token)
      .then((data) => {
        console.log(data);
        setState({ ...state, user, token, boards: data.boards });
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleModal = (e) => {
    setState({ ...state, showModal: true });
  };

  const handleClose = () => {
    setState({ ...state, showModal: false });
  };

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });
    createBoard(name, user._id, token)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          success: true,
          showModal: false,
          name: "",
          error: null,
        });
        setBoard(data.board);
      })
      .catch((err) => {
        setState({
          ...state,
          loading: false,
          success: false,
          showModal: true,
          name: "",
          error: "Unable to create the board. Try again later.",
        });
      });
  };

  const renderError = () => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    } else return null;
  };

  const renderModalForm = () => {
    return (
      <Form>
        {renderError()}
        <Form.Group controlId="formBasicText">
          <Form.Label>Board Name</Form.Label>
          <Form.Control
            name="name"
            value={name}
            onChange={handleChange}
            type="text"
            placeholder="Enter board name..."
          />
        </Form.Group>
      </Form>
    );
  };

  const renderCreateBoardModal = () => {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A New Board</Modal.Title>
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

  const renderBoards = () => {
    let content = [];

    let len = boards.length;
    let iterations = Math.ceil(len / 3);
    for (let i = 0; i < iterations; i++) {
      content.push(
        <Row className="my-4">
          {boards[3 * i] && (
            <Col>
              <BoardCard key={boards[3 * i]._id} board={boards[3 * i + 0]} />
            </Col>
          )}
          {boards[3 * i + 1] ? (
            <Col>
              <BoardCard
                key={boards[3 * i + 1]._id}
                board={boards[3 * i + 1]}
              />
            </Col>
          ) : null}
          {boards[3 * i + 2] ? (
            <Col>
              <BoardCard
                key={boards[3 * i + 2]._id}
                board={boards[3 * i + 2]}
              />
            </Col>
          ) : null}
        </Row>
      );
      return content;
    }
  };

  return (
    <div>
      <Header />

      <Container className="home">
        {renderCreateBoardModal()}
        <h4>Your Boards</h4>
        <Button variant="primary" size="md" onClick={toggleModal}>
          Create Board
        </Button>
        {renderBoards()}
      </Container>
    </div>
  );
};

export default Home;
