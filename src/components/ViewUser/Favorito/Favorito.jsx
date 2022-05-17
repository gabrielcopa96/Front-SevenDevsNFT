import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import imagenvideo from "../../../assets/azuki-nft.gif";
import imagenaudio from "../../../assets/nft-audio.jpg";

import { putLikesNft } from "../../../redux/actions";

const ContainerMisFavoritos = styled.div`
  width: 95%;
  background-color: #46198f53;
  border: 1px solid var(--mainBackGroundButtonColor);
  border-radius: 0.2rem;
  padding: 0.3rem;
  align-items: center;
  margin: 1rem auto;
  display: flex;
  flex-direction: row;
`;

const EliminatedFavoriteBtn = styled.span`
  color: var(--colorError);
  font-size: 0.8rem;

  &:hover {
    border-bottom: 1px solid var(--colorError);
    cursor: pointer;
  }
`;

export const Favorito = (props) => {
  const { id, name, currencies, image, price, files, filesid } = props;

  const images = files[2]?._id;
  const audio = files[0]?._id;
  const video = files[1]?._id;

  const handleImage = () => {
    if (filesid === images) {
      return image;
    }
    if (filesid === audio) {
      return imagenaudio;
    }
    if (filesid === video) {
      return imagenvideo;
    }
  };

  const token = localStorage.getItem("token")

  const dispatch = useDispatch();

  const handleEliminatedFavorite = (idNftFav) => {
    const acumLikes = {
      likes: 1
    }
    dispatch(putLikesNft(idNftFav, token, acumLikes))
    console.log("se elimino de tus favoritos este nft")
  }
  // const handleNext = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(prev => prev + 1)
  // }

  // const handlePrev = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(prev => prev - 1)
  // }

  return (
    <div>
      <ContainerMisFavoritos>
        <img
          src={handleImage()}
          alt="foto"
          style={{
            width: "65px",
            height: "65px",
            borderRadius: ".5rem",
            margin: ".4rem",
          }}
        />
        <div>
          <h4 style={{ borderBottom: "3px solid #22a4a7" }}>
            {name.toUpperCase()}
          </h4>
          <div style={{ display: "flex" }}>
            <p>
              <span style={{ color: "var(--colorInfo)", fontSize: ".9rem" }}>
                Current Price
              </span>{" "}
              - {price}
            </p>
            <p style={{ marginLeft: ".3rem" }}>{currencies}</p>
          </div>
          <EliminatedFavoriteBtn onClick={() => handleEliminatedFavorite(id)}>Eliminated Favorite</EliminatedFavoriteBtn>
        </div>
      </ContainerMisFavoritos>
    </div>
  );
};
