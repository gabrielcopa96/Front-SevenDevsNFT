import React from "react";

import styled from "styled-components";

import Button from "../../shared/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { CardsMisPublicaciones } from "./CardsMisPublicaciones.jsx";

const ContainerMisPublicaciones = styled.div`
  width: 65%;
  margin: 7.5rem auto 2.5rem auto;
  color: var(--secondFontColor);
`;

const ContainerHeaderPublicaciones = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContainerPublicaciones = styled.div`
  width: 100%;
  border-radius: 0.3rem;
  padding: 0.6rem 0;
  margin: 2rem auto 0 auto;
  background-color: #181e5553;
`;

export const MisPublicaciones = () => {
  const nfts = useSelector((state) => state.nfts);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const misNfts = nfts.filter(
    (x) => x.details.owner.username === user.username
  );

  const { uid } = user;

  return (
    <ContainerMisPublicaciones>
      <>
        <ContainerHeaderPublicaciones>
          <h2>My Posts</h2>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Button
              title="BACK"
              onClick={() => navigate(`/myprofile/${uid}`)}
            />
            <Button
              title="CREATE NFT"
              onClick={() => navigate("/home/createnft")}
            />
          </div>
        </ContainerHeaderPublicaciones>
        <hr
          style={{
            borderColor: "var(--mainBackGroundButtonColor)",
            backgroundColor: "var(--mainBackGroundButtonColor)",
          }}
        />
      </>
      <ContainerPublicaciones>
        {misNfts?.map((x, y) => (
          <CardsMisPublicaciones
            id={x._id}
            key={y}
            category={x.category.name}
            currencies={x.currencies.name}
            imgCurrencies={x.currencies.image}
            contract={x.details.contract_address}
            image={x.image}
            name={x.name}
            sales={x.sales_types.name}
            price={x.price}
            description={x.description}
          />
        ))}
      </ContainerPublicaciones>
    </ContainerMisPublicaciones>
  );
};
