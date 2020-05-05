import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import { loginUser, setUser, setToken } from "../../helpers/auth";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
    success: false,
    error: null,
  });
  const { email, password, loading, success, error } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setState({ ...state, loading: true });
      loginUser(email, password)
        .then((data) => {
          setState({
            ...state,
            loading: false,
            success: true,
            email: "",
            password: "",
          });
          setUser(data.user);
          setToken(data.token);
        })
        .catch((err) => {
          setState({
            ...state,
            loading: false,
            success: false,
            error: "Incorrect Email or Password!",
            email: "",
            password: "",
          });
          console.log(err);
        });
    }
  };

  const isFormValid = () => {
    if (!email || !password) {
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
    <div className="login">
      {success && <Redirect to="/home" />}
      <Container className="my-4 text-center">
        <h2>Scrum App</h2>
      </Container>

      <Container className="login-container">
        <Form className="login-form">
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
              Not a User ?{" "}
              <Link className="text-light" to="/register">
                Register Here
              </Link>
            </p>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
