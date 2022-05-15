import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import styled from "styled-components";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "react-google-login";

import axios from "axios";
import Button from "../shared/Button.jsx";

import Input from "../shared/Input.jsx";
import Swal from "sweetalert2";


const ContainerLogin = styled.form`
  width: 45%;
  background-color: #46198f53;
  border-radius: 1rem;
  margin: 7.5rem auto 0 auto;
  padding: 3.2rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ContainerUsuarioLogin = styled.div`
  display: grid;
  width: 60%;
  margin: 3rem auto;
  justify-content: space-evenly;
`;

const ContainerClaveLogin = styled.div`
  display: grid;
  width: 60%;
  margin: 3rem auto 1.5rem auto;
  justify-content: space-evenly;
`;

const ContainerButtonLogin = styled.div`
  width: 50%;
  padding-top: 1rem;
  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerButtonFacebookGoogle = styled.div`
  width: 50%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-evenly;
`;

const ButtonFacebook = styled.div`
  background-color: #166fe5;
  width: 50px;
  border-radius: 0.8rem;
  cursor: pointer;
  height: 45px;

  &:hover {
    background: rgb(61, 103, 154);
    background: radial-gradient(
      circle,
      rgba(61, 103, 154, 1) 0%,
      rgba(39, 71, 147, 1) 52%,
      #2d3164 100%
    );
    transition: all 0.5s ease-in-out;
  }
`;

const ButtonGoogle = styled.div`
  background-color: #fafafa;
  border-radius: 0.8rem;
  width: 50px;
  cursor: pointer;
  height: 45px;

  &:hover {
    background: rgb(111, 111, 111);
    background: radial-gradient(
      circle,
      rgba(111, 111, 111, 1) 0%,
      rgba(209, 209, 209, 1) 65%,
      rgba(92, 92, 92, 1) 100%
    );
    transition: all 0.5s ease-in-out;
  }
`;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  color: 'var(--secondFontColor)',
  background: '#46198fb3',
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const clientGoogle =
    "796413127660-tgktohi6gqfm0n183g1kqp6lqehl6ncq.apps.googleusercontent.com";

  const handleUser = (e) => {
    console.log(user);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = async (googleData) => {
    try {
      const dataGoogle = await axios.post(`https://sevendevs-backend.herokuapp.com/auth/google`, {
        tokenId: googleData.tokenId,
        givenName: googleData.profileObj.givenName,
        familyName: googleData.profileObj.familyName,
      });
      const finallyGoogle = await dataGoogle.data;
      localStorage.setItem("token", JSON.stringify(finallyGoogle.token));
      navigate("/home");
    } catch (error) {
      console.log(error);
        // alert("error no se pudo ingresar", error);
    }
  };


  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const auth = await authService.login(email, password);
      const verifyAuth = await auth;
      if (verifyAuth.ok === true) {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        navigate("/home");
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Correo no registrado",
      });
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <ContainerLogin onSubmit={handleSend}>
        <h1 style={{ color: "var(--secondFontColor)" }}>Login</h1>
        <ContainerUsuarioLogin>
          <label
            style={{ color: "var(--secondFontColor)", fontSize: "1.1rem" }}
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="email@email.com"
            value={email}
            onChange={handleUser}
            width="270px"
            padding=".6rem"
            height="40px"
          />
        </ContainerUsuarioLogin>
        <ContainerClaveLogin>
          <label
            style={{ color: "var(--secondFontColor)", fontSize: "1.1rem" }}
          >
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="password..."
            value={password}
            onChange={handleUser}
            padding=".6rem"
            width="270px"
            height="40px"
          />
        </ContainerClaveLogin>
        <div>
          <h4 style={{ color: "var(--secondFontColor)" }}>or login with</h4>
        </div>
        <ContainerButtonFacebookGoogle>
          <ButtonFacebook>
            <FaFacebookF
              style={{
                color: "var(--secondFontColor)",
                width: "40px",
                marginTop: "8px",
                height: "28px",
              }}
            />
          </ButtonFacebook>
          <GoogleLogin
            clientId={clientGoogle}
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            render={(renderProps) => (
              <ButtonGoogle
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle
                  style={{ width: "33px", height: "33px", marginTop: "6px" }}
                />
              </ButtonGoogle>
            )}
          />
        </ContainerButtonFacebookGoogle>
        <ContainerButtonLogin>
          <Button title="LOGIN" padding=".8rem 6.5rem" type="submit" />
        </ContainerButtonLogin>
      </ContainerLogin>
    </div>
  );
};

export default Login;
