import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContainerCollectionCard = styled.div`
  width: 380px;
  height: 432px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #46198f53;
  border: 1px solid #22a5a757;
  border-radius: 0.5rem;
  margin-bottom: 5rem;

  a {
    text-decoration: none;
  }

  &:hover {
    -webkit-box-shadow: 5px 5px 40px 20px rgba(43, 37, 70, 0.53);
    box-shadow: 5px 5px 40px 20px rgba(43, 37, 70, 0.53);
    transition: all .5s ease-in-out;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContainerImgCollection = styled.div`
  width: 90%;
  margin: 1rem auto;
`;

const ContainerDataCollection = styled.div`
  width: 100%;
  margin: 0.2rem auto;
  text-align: center;
  h3 {
    text-decoration: none;
    color: var(--secondFontColor);
    font-size: 1.4rem;
  }
`;

//Card renderiza lo que necesito

export default function CardCollection({ image, name, _id }) {
  return (
    <ContainerCollectionCard>
      <Link to={"/home/collections/nfts/" + name}>
        <ContainerImgCollection>
          <img
            className="image"
            src={image}
            alt="image"
            width="100%"
            height="235px"
          />
        </ContainerImgCollection>
        <ContainerDataCollection>
          <h3>Collection - {name}</h3>
          <p
            style={{
              textAlign: "justify",
              margin: ".71rem 1rem .2rem 1rem",
              color: "var(--colorInfo)",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            perferendis consequuntur quis similique, adipisci illo maiores natus
            earum modi omnis .
          </p>
        </ContainerDataCollection>
      </Link>
    </ContainerCollectionCard>
  );
}
