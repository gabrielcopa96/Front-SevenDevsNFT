import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Swal from "sweetalert2";

import "sweetalert2/dist/sweetalert2.css";
import { putLikesNft } from "../../../../redux/actions";

import imagenaudio from "../../../../assets/nft-audio.jpg";
import imagenvideo from "../../../../assets/azuki-nft.gif";
import { useDispatch } from "react-redux";

const CardContainerNft = styled.div`
  width: 280px;
  height: 450px;
  border-radius: 10px;
  background-color: #46198f53;
  border: 1px solid #22a5a757;
  backdrop-filter: blur(5px);
  padding: 20px;
  margin: 0 auto 2rem auto;
  box-sizing: border-box;
  position: relative;
`;

const CardingImg = styled.div`
  height: 55%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &::after {
    content: url(https://rvs-nft-preview-card.netlify.app/images/icon-view.svg);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: hsla(178, 100%, 50%, 0.522);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    z-index: -1;
  }

  &:hover {
    ::after {
      z-index: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const CardBody = styled.div`
  height: 27%;
  color: hsl(215, 51%, 70%);
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid hsl(215, 32%, 27%);

  h4 {
    a {
      color: hsl(0, 0%, 100%);
      text-decoration: none;
      margin-bottom: 0;
      font-size: 18px;
      cursor: pointer;
      font-weight: 400;

      &:hover {
        color: hsl(178, 100%, 50%);
      }
    }
  }

  p {
    font-weight: 300;
  }
`;

const CardBodyFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    position: relative;
    padding-left: 1rem;
    margin-top: 1rem;

    &:nth-child(1) {
      color: hsl(178, 100%, 50%);
    }
    &:nth-child(2) {
      padding-left: 2rem;

      &:before {
        content: url(https://rvs-nft-preview-card.netlify.app/images/icon-clock.svg);
      }
    }
  }
`;

const CardFooter = styled.div`
  height: 16%;
  display: flex;
  align-items: center;
  column-gap: 15px;

  img {
    width: 25px;
    height: 25px;
    border: 1px solid hsl(0, 0%, 100%);
    border-radius: 50%;
  }

  p {
    font-size: 14px;
    color: hsl(215, 51%, 70%);
    font-weight: 300;
  }

  span {
    margin-left: 5px;
    color: hsl(0, 0%, 100%);
    cursor: pointer;

    &:hover {
      color: hsl(178, 100%, 50%);
    }
  }
`;

const PriceCard = styled.div`
  position: relative;
  padding-left: 18px;

  &:nth-child(1) {
    color: hsl(178, 100%, 50%);
  }
  &:nth-child(2) {
    padding-left: 22px;

    &:before {
      content: url(https://rvs-nft-preview-card.netlify.app/images/icon-clock.svg);
    }
  }
  &::before {
    content: url(https://rvs-nft-preview-card.netlify.app/images/icon-ethereum.svg);
    /* background-image: url('https://rvs-nft-preview-card.netlify.app/images/icon-ethereum.svg'); */
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    line-height: 0px;
  }
`;

const PruebaPrice = (props) => {
  const { title, priceN, image } = props;

  return (
    <PriceCard image={image}>
      {title} {priceN}
    </PriceCard>
  );
};

const ContainerHearth = styled.span`
  i {
    color: var(--colorInfo);

    &:hover {
      -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.67);
      box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.67);
      cursor: pointer;
    }
  }
`;

export const CardNft = (props) => {
  const {
    image,
    name,
    price,
    id,
    category,
    files,
    currency,
    salestype,
    owner,
    likes,
    token,
  } = props;

  const dispatch = useDispatch();
  const handlerLikes = () => {
    const acumLikes = {
      likes: 1,
    };
    if (token) {
      dispatch(putLikesNft(id, token, acumLikes));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        color: "var(--secondFontColor)",
        background: "#46198fb3",
        backdrop: `
            #46198f84
            `,
        text: "Not autenticated",
      });
    }
  };
  const handlePhoto = () => {
    if (files === "Image") {
      return `${image}`;
    }
    if (files === "Video") {
      return `${imagenvideo}`;
    }
    if (files === "Audio") {
      return `${imagenaudio}`;
    }
  };

  return (
    <CardContainerNft>
      <CardingImg
        onClick={() =>
          Swal.fire({
            imageUrl: `${handlePhoto()}`,
            imageHeight: 360,
            imageWidth: 400,
            title: `${name}`,
            color: "var(--secondFontColor)",
            background: "#46198fb3",
            backdrop: `
            #46198f84
            `,
          })
        }
      >
        <img src={handlePhoto()} alt="photo nft" />
      </CardingImg>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            top: "1.65rem",
            position: "relative",
          }}
        >
          <ContainerHearth onClick={handlerLikes}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </ContainerHearth>
          <span
            style={{
              fontSize: "1rem",
              marginLeft: ".5rem",
              color: "var(--colorInfo)",
            }}
          >
            {likes ? likes : 0}
          </span>
        </div>
      </div>
      <CardBody>
        <h4>
          <Link
            // style={{ textDecoration: "none", color: "var(--secondFontColor)" }}
            to={`/details/${id}`}
          >
            {name}
          </Link>
        </h4>
        <p>Our Equilibrium collection promotes balance and calm.</p>
        <CardBodyFooter>
          <PruebaPrice title={price} priceN={currency?.name} />
          <PruebaPrice title={salestype} />
        </CardBodyFooter>
      </CardBody>
      <CardFooter>
        <img src="https://rvs-nft-preview-card.netlify.app/images/image-avatar.png" />
        <p>
          Creation of{" "}
          <span onClick={() => alert("prueba de fuego")}> {owner} </span>
        </p>
      </CardFooter>
    </CardContainerNft>
  );
};
