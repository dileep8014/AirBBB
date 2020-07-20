import React, { useState, useEffect } from "react";
import axios from "axios";
import authenticate from "../../utils/auth/authenticate";
import styled from "styled-components";
import { AuthConsumer } from "../../context/AuthContext";

const FormWrapper = styled.div`
  margin-top: 50px;
`;

const FormContainer = styled.div`
  margin: 0 auto;
  width: 500px;
`;

const Form = styled.form`
  padding: 20px;
  font-size: 1rem;
  background-color: black;
  border: 1px solid yellow;
  color: white;
  border-radius: 0 0 3px 3px;
`;

const Input = styled.input`
  display: block;
  min-height: 35px;
  margin-top: 5px;
  margin-bottom: 15px;
  width: 100%;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  width: 100%;
  box-sizing: border-box; /* add this */
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`;

const SignUpButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  vertical-align: middle;
  background-position: -1px -1px;
  background-size: 110% 110%;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 0.25em;
  width: 100%;
  box-sizing: border-box; /* add this */
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`;
const Field = styled.div`
  width: 100%;
`;

const Register = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });

  // useEffect(() => {
  //   if (authenticate()) props.history.push("/");
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/v1/registrations",
        { user: { ...user } },
        { withCredentials: true }
      )
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <AuthConsumer>
      {({ isAuth, signup }) => (
        <FormWrapper>
          <FormContainer>
            <Form onSubmit={signup.bind(this, user, props)}>
              <h1>Sign Up</h1>
              <Field>
                <label>Email</label>
                <Input
                  onChange={handleChange}
                  type="email"
                  value={user.email}
                  placeholder="email"
                  name="email"
                />
              </Field>
              <Field>
                <label>Password</label>
                <Input
                  onChange={handleChange}
                  type="password"
                  value={user.password}
                  placeholder="password"
                  name="password"
                />
              </Field>
              <SignUpButton type="submit">Create Account</SignUpButton>
            </Form>
          </FormContainer>
        </FormWrapper>
      )}
    </AuthConsumer>
  );
};

export default Register;
