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

import { Favorito } from "./Favorito/Favorito.jsx";

import { modificacionUser } from "../../redux/actions/index";
import Swal from "sweetalert2";

import "sweetalert2/dist/sweetalert2.css";
import Input from "../shared/Input.jsx";
import Button from "../shared/Button.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/authService";
import { removeUser } from "../../redux/actions/index";

import axios from "axios";

export const ViewUser = React.memo(() => {
  const { idUser } = useParams();

  const dispatch = useDispatch();

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
        console.log("Entro a eliminar la cuenta!");
        return eliminarUser;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  //? <i className="fas fa-edit"></i>

  const { username, image, favorite, collectionNft } = user;

  return (
    <>
      <ContainerHeaderUser>
        <div style={{ display: "flex" }}>
          <div style={{position: "relative"}}>
            <ImagenPerfil background={image} />
            <ModificacionPerfil onClick={() => console.log("enia")}><i className="fas fa-plus" style={{position: "relative", left: "5px"}}></i></ModificacionPerfil>
          </div>
          <div>
            <h2>{username}</h2>
            <p style={{ color: "var(--colorInfo)" }}>
              Calificacion como vendedor - 10/10
            </p>
          </div>
        </div>

        <ContainerButton>
          <Button
            title="MIS PUBLICACIONES"
            onClick={() => navigate(`/myprofile/mispublicaciones`)}
          />
          <Button title="WALLET" />
          <Button title="LOGOUT" />
        </ContainerButton>
      </ContainerHeaderUser>
      <ContainerBodyUser>
        <div>
          <h2>Mis Favoritos</h2>
          <ContainerMisPreferencias>
            <h2>No tienes favoritos</h2>
          </ContainerMisPreferencias>
          <h2 style={{ marginTop: ".8rem" }}>Mis Collecciones</h2>
          <ContenedorUltimasVentas>
            {collectionNft?.length === 0 ? (
              <h2>No tienes colleciones</h2>
            ) : (
              "Tiene"
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
