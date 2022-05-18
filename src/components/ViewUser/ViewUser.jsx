import React, { useEffect, useState } from "react";
import {
  ContainerHeaderUser,
  ContainerButton,
  ContainerBodyUser,
  ContainerMisDatos,
  ContainerMisPreferencias,
  ContenedorUltimasVentas,
  ContainerEliminarUser,
  InputData,
  ImagenPerfil,
  ModificacionPerfil,
} from "./elements/StyleViewUser.jsx";

import { modificacionUser, putImagePerfil } from "../../redux/actions/index";
import Swal from "sweetalert2";

import { Favorito } from "./Favorito/Favorito.jsx";

import "sweetalert2/dist/sweetalert2.css";
import Input from "../shared/Input.jsx";
import Button from "../shared/Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/authService";
import { removeUser, getFileTypes } from "../../redux/actions/index";
import styled from "styled-components";

import axios from "axios";

const BtnPrev = styled.button`
  background-color: #6b48ff;
  border: none;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const BtnNext = styled.button`
  background-color: #6b48ff;
  border: none;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  border-radius: 0.5rem;
`;

export const ViewUser = React.memo(() => {
  const { idUser } = useParams();

  const paginaWallet = () => window.open(`https://metamask.io/download/`);

  const [disabled, setDisabled] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const filetypes = useSelector((state) => state.files_type);

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    console.log(ethereum);

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log("account", accounts);
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found!");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      return paginaWallet();
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address:", accounts[0]); //numero de cuenta en accounts
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
    if (filetypes.length === 0) {
      dispatch(getFileTypes());
    }
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Pon tu nuevo usuario",
      html: '<input id="swal-input1" class="swal2-input" placeholder="nuevo usuario..."><div id="recaptcha"></div>',
      focusConfirm: false,
      color: "var(--secondFontColor)",
      background: "#46198fb3",
      showCancelButton: true,
      preConfirm: () => {
        const valores = document.getElementById("swal-input1").value;
        return {
          username: valores,
        };
      },
    });

    if (formValues) {
      Swal.fire({
        title: "Este es tu nuevo usuario",
        text: `${formValues.username}`,
      });
      setTimeout(() => {
        dispatch(modificacionUser(idUser, formValues));
      }, 2500);
    }
  };

  const handleEliminatedUser = () => {
    Swal.fire({
      title: "Do you want to delete your user?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      color: "var(--secondFontColor)",
      background: "#46198fb3",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminated!", "", "success");
        const eliminarUser = await axios.delete(
          `https://sevendevs-backend.herokuapp.com/users/${idUser}`
        );
        authService.logut();
        dispatch(removeUser());
        navigate("/home");
        return eliminarUser;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleModificationImgProfile = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      background: "#46198fb3",
      color: "var(--secondFontColor)",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });
    const formData = new FormData();
    formData.append("img", file);
    dispatch(putImagePerfil(token, idUser, formData));
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          background: "#46198fb3",
          color: "var(--secondFontColor)",
          imageAlt: "The uploaded picture",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  //? <i className="fas fa-edit"></i>

  const { username, image, favorite, collectionNft } = user;

  const pages = [];

  for (let i = 1; i <= Math.ceil(favorite.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexItem = currentPage * itemsPerPage;
  const indexFirstItem = indexItem - itemsPerPage;

  const currentItemsFavorite = favorite.slice(indexFirstItem, indexItem);

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <ContainerHeaderUser>
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            <ImagenPerfil background={image} />
            <ModificacionPerfil onClick={() => handleModificationImgProfile()}>
              <i
                className="fas fa-plus"
                style={{ position: "relative", left: "5px" }}
              ></i>
            </ModificacionPerfil>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h2>{username}</h2>
              <span>
                {currentAccount ? (
                  <span
                    style={{
                      padding: ".2rem",
                      border: "1px solid #22a4a7",
                      borderRadius: ".4rem",
                      color: "#94c97c",
                    }}
                  >
                    Wallet Connected
                  </span>
                ) : (
                  currentAccount
                )}
              </span>
            </div>
            <p style={{ color: "var(--colorInfo)" }}>
              {
                <>
                  Wallet Address:{" "}
                  {currentAccount ? currentAccount : "No Wallet Connected"}
                </>
              }
            </p>
          </div>
        </div>

        <ContainerButton>
          <Button
            title="MY POSTS"
            onClick={() => navigate(`/myprofile/mispublicaciones`)}
          />
          <Button
            title={currentAccount ? "WALLET CONNECTED" : "CONNECT WALLET"}
            onClick={connectWalletHandler}
          />
          <Button title="LOGOUT" />
        </ContainerButton>
      </ContainerHeaderUser>
      <ContainerBodyUser>
        <div>
          <h2>My Favorites</h2>
          <ContainerMisPreferencias>
            {favorite.length === 0 ? (
              <h1>Not favorites</h1>
            ) : (
              currentItemsFavorite.map((x, y) => (
                <Favorito
                  key={y}
                  id={x._id}
                  files={filetypes}
                  filesid={x.files_types}
                  setCurrentPage={setCurrentPage}
                  name={x.name}
                  price={x.price}
                  currencies={"ETH"}
                  image={x.image}
                />
              ))
            )}
            <div
              style={{
                display: "flex",
                margin: "0 auto",
                width: "30%",
                gap: ".5rem",
                alignItems: "center",
              }}
            >
              <BtnPrev
                onClick={handlePrev}
                disabled={currentPage === pages[0] ? true : false}
              >
                <span aria-hidden="true" style={{ color: "white" }}>
                  &laquo;
                </span>
              </BtnPrev>
              <span
                style={{
                  display: "flex",
                  margin: "0 auto",
                  color: "var(--colorInfo)",
                }}
              >
                {currentPage}/<span>{pages[pages.length - 1]}</span>
              </span>
              <BtnNext
                onClick={handleNext}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
              >
                <span aria-hidden="true" style={{ color: "white" }}>
                  &raquo;
                </span>
              </BtnNext>
            </div>
          </ContainerMisPreferencias>
          <h2 style={{ marginTop: ".8rem" }}>My Collections</h2>
          <ContenedorUltimasVentas>
            {collectionNft?.length === 0 ? (
              <h2 style={{ color: "var(--colorInfo)" }}>Hasn't collections</h2>
            ) : (
              <h2 style={{ color: "var(--colorInfo)" }}>Tiene collections</h2>
            )}
          </ContenedorUltimasVentas>
        </div>
        <div
          style={{ borderLeft: "1px solid var(--mainBackGroundButtonColor)" }}
        >
          <ContainerMisDatos>
            <h2>Mis datos</h2>
            <div
              style={{
                display: "grid",
                fontSize: "1.2rem",
                marginBottom: ".8rem",
              }}
            >
              <label>Username</label>
              <InputData>
                <Input
                  type="text"
                  disabled={disabled}
                  placeholder={username}
                  height="32px"
                  padding=".4rem"
                  width="12rem"
                />
                <Button
                  title="CAMBIAR USUARIO"
                  padding=".28rem 1.8rem"
                  margin="0"
                  onClick={handleUser}
                />
              </InputData>
            </div>
            <div
              style={{
                display: "grid",
                fontSize: "1.2rem",
                margin: ".8rem auto",
              }}
            >
              <label>Passoword</label>
              <div
                style={{ display: "flex", alignItems: "center", gap: ".6rem" }}
              >
                <Input
                  type="text"
                  placeholder="*************"
                  height="32px"
                  padding=".4rem"
                  width="12rem"
                />
                <Button
                  title="CAMBIAR CLAVE"
                  padding=".25rem 2rem"
                  margin="0 .42rem"
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                fontSize: "1.2rem",
                margin: ".8rem auto",
              }}
            >
              <label>Mobil</label>
              <Input
                type="text"
                placeholder="+54 387 65678904"
                height="32px"
                padding=".4rem"
                width="12rem"
              />
            </div>
          </ContainerMisDatos>
          <ContainerEliminarUser>
            <Button
              title="ELIMINAR CUENTA"
              color="var(--colorError)"
              onClick={handleEliminatedUser}
            />
          </ContainerEliminarUser>
        </div>
      </ContainerBodyUser>
    </>
  );
});
