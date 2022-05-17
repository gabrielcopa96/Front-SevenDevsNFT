import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteNft } from "../../../redux/actions";

import styled from "styled-components";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

const ContainerCardsMisPublicaciones = styled.div`
  width: 100%;
  margin: 0.6rem auto;
`;

const ContainerPublicNft = styled.div`
  width: 95%;
  margin: 0 auto;
  border-radius: 0.7rem;
  padding: 1rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--mainBackGroundButtonColor);
`;

const ContainerDataNft = styled.div`
  display: flex;
  /* align-items: center; */
`;

const ContainerSecondDataNft = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnEliminatedNft = styled.span`
  color: var(--colorError);
  &:hover {
    cursor: pointer;
    border-bottom: 1px solid var(--colorError);
  }
`;

const BtnActive = styled.span`
  color: #48d848;
  font-weight: 700;
`;

const BtnInactive = styled.span``;

const BtnNft = styled.span`
  letter-spacing: 1px;
  border-bottom: 1px solid var(--mainBackGroundButtonColor);
  font-weight: 700;
  font-size: 1.1rem;

  &:hover {
    cursor: pointer;
    color: var(--colorInfo);
  }
`;

export const CardsMisPublicaciones = (props) => {
  const {
    id,
    category,
    currencies,
    imgCurrencies,
    contract,
    image,
    name,
    sales,
    price,
    description,
  } = props;

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleNftNavigate = (idNft) => {
    navigate(`/details/${idNft}`);
  };

  const handleEliminatedNft = (idNft) => {
    Swal.fire({
      title: "Do you really want to delete this nft?",
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
        dispatch(deleteNft(token, idNft));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <ContainerCardsMisPublicaciones>
      <ContainerPublicNft>
        <ContainerDataNft>
          <div style={{ paddingTop: "6px", marginRight: "1rem" }}>
            <img
              src={image}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: ".5rem",
              }}
            />
          </div>
          <ContainerSecondDataNft>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <BtnNft onClick={() => handleNftNavigate(id)}>
                {name.toUpperCase()}
              </BtnNft>
              <h4
                style={{
                  color: "rgb(71, 17, 137)",
                  backgroundColor: "var(--colorInfo)",
                  padding: "0 .4rem",
                  marginLeft: ".8rem",
                  borderRadius: ".4rem",
                  lineHeight: "1.7rem",
                  letterSpacing: "1px",
                }}
              >
                {category}
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: ".1rem",
                alignItems: "center",
                marginTop: ".2rem",
              }}
            >
              <p style={{ color: "var(--colorInfo)", marginRight: ".6rem" }}>
                Current Price
              </p>
              <img
                src={imgCurrencies}
                alt="eth"
                style={{ width: "20px", height: "20px", marginRight: ".5rem" }}
              />
              <p style={{ fontWeight: "600" }}>{price}</p>
              <p style={{ marginLeft: ".2rem", fontWeight: "600" }}>
                {currencies}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: ".2rem",
              }}
            >
              <p style={{ color: "var(--colorInfo)", marginRight: ".6rem" }}>
                Address
              </p>
              <p style={{ fontWeight: "600" }}>{contract}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: ".2rem",
              }}
            >
              <BtnEliminatedNft onClick={() => handleEliminatedNft(id)}>
                Delete NFT
              </BtnEliminatedNft>
              {/* <span style={{color: "aqua"}}>Update</span> */}
            </div>
          </ContainerSecondDataNft>
        </ContainerDataNft>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            letterSpacing: "1px",
          }}
        >
          <BtnActive>ACTIVE</BtnActive>
        </div>
      </ContainerPublicNft>
    </ContainerCardsMisPublicaciones>
  );
};
