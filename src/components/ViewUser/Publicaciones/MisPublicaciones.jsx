import React from "react";

import "./publicaciones.css";

import styled from "styled-components";

import Button from "../../shared/Button.jsx";
import { useNavigate } from "react-router-dom";

const ContainerMisPublicaciones = styled.div`
  width: 85%;
  margin: 6.5rem auto 0 auto;
  color: var(--secondFontColor);
`;

const ContainerPublicaciones = styled.div`
  width: 100%;
  height: 70vh;
  text-align: center;
  border-radius: .3rem;
  line-height: 68vh;
  margin: 2rem auto 0 auto;
  background-color: #181e5553;
`;

const ContainerHeaderPublicaciones = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MisPublicaciones = () => {

  const navigate = useNavigate();


  return (
    <ContainerMisPublicaciones>
      <>
        <ContainerHeaderPublicaciones>
          <h2>Mis Publicaciones</h2>
          <Button title="CREATE NFT" onClick={() => navigate("/home/createnft")}/>
        </ContainerHeaderPublicaciones>
        <hr
          style={{
            borderColor: "var(--mainBackGroundButtonColor)",
            backgroundColor: "var(--mainBackGroundButtonColor)",
          }}
        />
      </>
      <ContainerPublicaciones>
        <h1>No tiene nft creados</h1>
      </ContainerPublicaciones>
    </ContainerMisPublicaciones>
  );
};
