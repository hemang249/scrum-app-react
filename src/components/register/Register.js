import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Register.css";
import { registerUser, setUser } from "../../helpers/auth";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    loading: false,
    success: false,
    error: null,
  });
  const { email, username, password, loading, success, error } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setState({ ...state, loading: true });
      registerUser(email, username, password)
        .then((data) => {
          setState({
            ...state,
            loading: false,
            success: true,
            email: "",
            password: "",
            username: "",
          });
          setUser(data);
        })
        .catch((err) => {
          setState({
            ...state,
            loading: false,
            success: false,
            error: err,
            email: "",
            password: "",
            username: "",
          });
          console.log(err);
        });
    }
  };

  const isFormValid = () => {
    if (!email || !username || !password) {
      setState({ ...state, error: "Please fillout all the fields" });
      return false;
    } else {
      return true;
    }
  };

  const renderError = () => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    } else return null;
  };

  return (
    <div className="register">
      {success && <Redirect to="/" />}
      <Container className="my-4 text-center">
        <h2>Scrum App</h2>
      </Container>

      <Container className="register-container">
        <Form className="register-form">
          {renderError()}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              value={username}
              onChange={handleChange}
              type="text"
              placeholder="Pick a Username"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="password"
              value={password}
              placeholder="Enter a password"
            />
          </Form.Group>

          <div className="text-center my-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="warning"
              type="submit"
              size="md"
              block
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
            <p className="text-light my-3">
              Already a User ?{" "}
              <Link className="text-light" to="/">
                Login Here
              </Link>
            </p>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
