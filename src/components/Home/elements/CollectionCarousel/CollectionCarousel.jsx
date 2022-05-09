import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Scrollbar, Pagination, Autoplay } from "swiper";
import styled from "styled-components";

import image1 from "../../../../assets/img-carousel/img1.jpg";
import image2 from "../../../../assets/img-carousel/img2.png";
import image3 from "../../../../assets/img-carousel/img3.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCollections } from "../../../../redux/actions";

const ContainerCarousel = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const SlideMain = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  height: 100vh;
  font-size: 1.5rem;
  position: relative;
  background-image: ${(props) =>
    `url(${props.backgroundImage})` || "url('../../../assets/imagen1.png')"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ContainerDataSlider = styled.div`
  width: 100%;
  padding-top: 2rem;
  position: absolute;
  bottom: 0;
  height: 42%;
  text-align: justify;
  line-height: 32px;
  background-color: #ececec13;
  backdrop-filter: blur(20px);
`;

const Slide = (props) => {
  const { backgroundImage, title, subtitle } = props;

  return (
    <SlideMain backgroundImage={backgroundImage}>
      <ContainerDataSlider>
        <h2
          style={{
            fontSize: "1.9rem",
            color: "var(--secondFontColor)",
            marginLeft: "6.8rem",
            borderBottom: "1.2px solid var(--mainBackGroundButtonColor)",
            marginRight: "6.8rem",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: "var(--secondFontColor)",
            marginLeft: "6.8rem",
            marginRight: "6.8rem",
          }}
        >
          {subtitle}
        </p>
      </ContainerDataSlider>
    </SlideMain>
  );
};

export const CollectionsCarousel = () => {
  const collection = useSelector((state) => state.collections);
  const dispatch = useDispatch();

  useEffect(() => {
    if (collection.length === 0) {
      dispatch(getAllCollections());
    }
  }, [dispatch]);

  return (
    <div>
      <ContainerCarousel>
        <Swiper
          modules={[Pagination, Scrollbar, Autoplay]}
          autoplay={{
            delay: 2500,
          }}
          pagination={{ clickable: true }}
          slidesPerView={1}
        >
          {collection?.map((x, i) => (
            <SwiperSlide key={i}>
              <Slide
                backgroundImage={x.image}
                key={x._id}
                title={`Collection - ${x.name}`}
                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mauris orci, dapibus nec pretium ut, efficitur eu ex. Maecenas convallis, augue ac placerat ultricies, metus libero condimentum ipsum, eget finibus elit purus eu justo. Sed id lacus sed orci convallis vehicula non sed sapien. Curabitur gravida dictum libero. Aenean volutpat bibendum nunc, eget ultricies urna facilisis vulputate. Donec dolor dolor, commodo eu molestie et, egestas quis magna. Ut magna ante, tempor eu purus sollicitudin, laoreet feugiat lorem."
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ContainerCarousel>
    </div>
  );
};
