import React, { useCallback, useEffect, useState } from "react";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Navigation, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Pagination } from "swiper/core";

import {
  ContainerNFT,
  NftTitle,
} from "../StylesHome/ViewNftStyles.jsx";

import { Link } from "react-router-dom";

import { CardNft } from "../CardNft/CardNft.jsx";

import { getAllNft } from "../../../../redux/actions/index";

import {
  FcSteam,
  FcSportsMode,
  FcStumbleupon,
  FcSignature,
} from "react-icons/fc";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ContainerTitleCategory = styled.div`
  border-bottom: 1px solid var(--mainBackGroundButtonColor);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    font-size: var(--large);
    color: var(--secondFontColor);

    &:hover {
      text-decoration-line: underline;
      text-decoration-thickness: 3px;
    }
  }
`;

SwiperCore.use([Pagination]);

export const ViewNft = () => {
  const nft = useSelector((state) => state.nfts);

  const dispatch = useDispatch();

  const instantCallback = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    if (nft.length === 0) {
      instantCallback(getAllNft());
    }
  }, [instantCallback]);

  const token = localStorage.getItem("token")

  return (
    <ContainerNFT>
      <h2
        style={{
          textAlign: "center",
          color: "var(--secondFontColor)",
          fontSize: "2rem",
          margin: "2.2rem 0 2.2rem 0",
        }}
      >
        Categories
      </h2>
      <ContainerTitleCategory>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NftTitle>Gaming</NftTitle>
          <FcSteam style={{ width: "30px", height: "30px" }} />
        </div>
        <Link to={`/nft`}>All NFT</Link>
      </ContainerTitleCategory>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        grabCursor={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 4,
            width: "1260",
            spaceBetween: 45,
          },
        }}
      >
        {
          nft?.filter((x) => x.category.name === "Gaming")
          .map((x, i) => (
            <SwiperSlide key={i}>
                <CardNft
                  image={x.image}
                  name={x.name}
                  price={x.price}
                  files={x.files_types.name}
                  category={x.category}
                  currency={x.currencies}
                  likes={x.likes}
                  token={token}
                  imageCurrencies={x.currencies.image}
                  owner={x.details.owner.username}
                  salestype={x.sales_types.name}
                  id={x._id}
                  key={x._id}
                />
              </SwiperSlide>
            ))
        }
      </Swiper>
      <ContainerTitleCategory>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NftTitle>Deportes</NftTitle>
          <FcSportsMode style={{ width: "30px", height: "30px" }} />
        </div>
        <Link to={`/nft`}>All NFT</Link>
      </ContainerTitleCategory>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 4,
            width: "1260",
            spaceBetween: 45,
          },
        }}
      >
        {nft
          ?.filter((x) => x.category.name === "Sports")
          .map((x, i) => (
            <SwiperSlide key={i+1}>
              <CardNft
                image={x.image}
                name={x.name}
                price={x.price}
                files={x.files_types.name}
                category={x.category}
                currency={x.currencies}
                imageCurrencies={x.currencies.image}
                owner={x.details.owner.username}
                likes={x.likes}
                token={token}
                salestype={x.sales_types.name}
                id={x._id}
                key={x._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <ContainerTitleCategory>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NftTitle>Multiverse</NftTitle>
          <FcStumbleupon style={{ width: "30px", height: "30px" }} />
        </div>
        <Link to={`/nft`}>All NFT</Link>
      </ContainerTitleCategory>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 4,
            width: "1260",
            spaceBetween: 45,
          },
        }}
      >
        {nft
          ?.filter((x) => x.category.name === "Entertainment")
          .map((x, i) => (
            <SwiperSlide key={i+2}>
              <CardNft
                image={x.image}
                name={x.name}
                price={x.price}
                files={x.files_types.name}
                category={x.category}
                currency={x.currencies}
                imageCurrencies={x.currencies.image}
                owner={x.details.owner.username}
                salestype={x.sales_types.name}
                likes={x.likes}
                token={token}
                id={x._id}
                key={x._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <ContainerTitleCategory>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NftTitle>Arte</NftTitle>
          <FcSignature style={{ width: "30px", height: "30px" }} />
        </div>
        <Link to={`/nft`}>All NFT</Link>
      </ContainerTitleCategory>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 4,
            width: "1260",
            spaceBetween: 45,
          },
        }}
      >
        {nft
          ?.filter((x) => x.category.name === "Art")
          .map((x, i) => (
            <SwiperSlide key={i+3}>
              <CardNft
                image={x.image}
                name={x.name}
                price={x.price}
                files={x.files_types.name}
                category={x.category}
                currency={x.currencies}
                imageCurrencies={x.currencies.image}
                owner={x.details.owner.username}
                likes={x.likes}
                token={token}
                salestype={x.sales_types.name}
                id={x._id}
                key={x._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <ContainerTitleCategory>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NftTitle>eSports</NftTitle>
          <FcStumbleupon style={{ width: "30px", height: "30px" }} />
        </div>
        <Link to={`/nft`}>All NFT</Link>
      </ContainerTitleCategory>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          980: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1400: {
            slidesPerView: 4,
            width: "1260",
            spaceBetween: 45,
          },
        }}
      >
        {nft
          ?.filter((x) => x.category.name === "eSports")
          .map((x, i) => (
            <SwiperSlide key={i+4}>
              <CardNft
                image={x.image}
                name={x.name}
                price={x.price}
                files={x.files_types.name}
                category={x.category}
                currency={x.currencies}
                imageCurrencies={x.currencies.image}
                owner={x.details.owner.username}
                likes={x.likes}
                token={token}
                salestype={x.sales_types.name}
                id={x._id}
                key={x._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </ContainerNFT>
  );
};
