import React from "react";

import logo from "./assetsFooter/LOGOTIPO.png";

import { Link } from "react-router-dom";

import { FaDiscord } from "react-icons/fa";

import styled from "styled-components";

const ContainerFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  margin-top: auto;
  height: 100%;
`;

const ContainerImagen = styled.div`
  margin-left: 5rem;
`;

const ContainerNewsletter = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 30%;
  h4 {
    font-size: 1.2rem;
    color: var(--secondFontColor);
    font-weight: bold;
  }
  input {
    width: 90%;
  }
`;

const ContainerInfoFooter = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  text-align: center;
  margin-right: 7rem;
  h4 {
    color: var(--secondFontColor);
    font-weight: bold;
  }
`;

const ContainerInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: -1rem;
  h4 {
    color: var(--secondFontColor);
    font-weight: bold;
  }
  a {
    text-decoration: none;
    color: var(--colorInfo);
    &:hover {
      color: var(--secondFontColor);
      transition: all 0.3s ease-in-out;
    }
  }
`;

const ContainerSoporte = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: -1rem;
  h4 {
    color: var(--secondFontColor);
    font-weight: bold;
  }
  
  a {
    color: var(--colorInfo);
    text-decoration: none;
    &:hover {
      color: var(--secondFontColor);
      transition: all 0.3s ease-in-out;
    }
  }
`;

const Footer = () => {
  return (
    <footer style={{marginTop: "1.5rem"}}>
      <ContainerFooter>
        <ContainerImagen>
          <Link to="/home">
            <img style={{ width: "167px", height: "70px" }} src={logo} />
          </Link>
        </ContainerImagen>
        <ContainerInfo>
          <div>
            <h4>Informacion</h4>
          </div>
          <div>
            <p>
              <a href="https://coinmarketcap.com/es/" target="_blank">
                Cotizaciones de Criptomendas
              </a>
            </p>
          </div>
          <p>
            <a
              href="https://www.xataka.com/basics/que-nft-como-funcionan"
              target="_blank"
            >
              Que son los NFT ?
            </a>
          </p>
          <p><a href="#">Como comprar un NFT</a></p>
        </ContainerInfo>
        <ContainerSoporte>
          <div>
            <h4>Soporte</h4>
          </div>
          <p><a href="#">Danos tu opinion</a></p>
          <p><a href="#">Charla con el asistente virtual</a></p>
          <p><a href="#">Preguntas frecuentes</a></p>
        </ContainerSoporte>
        <ContainerInfoFooter>
          <div>
            <h4>Comunidad</h4>
          </div>
          <div>
            <a href="https://discord.gg/get6j98T" target="_blank">
              <FaDiscord
                style={{
                  color: "var(--colorInfo)",
                  width: "25px",
                  height: "25px",
                }}
              />
            </a>
          </div>
        </ContainerInfoFooter>
      </ContainerFooter>
      <h4
        style={{
          textAlign: "center",
          color: "var(--colorInfo)",
          fontSize: "1.2rem",
          paddingBottom: "1rem",
          paddingTop: "1rem",
        }}
      >
        @ Derechos reservados 7DevsNFT
      </h4>
    </footer>
  );
};

export default Footer;
