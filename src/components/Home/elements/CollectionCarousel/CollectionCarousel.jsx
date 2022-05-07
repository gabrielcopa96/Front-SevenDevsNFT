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
`;

const Slide = (props) => {
  const { backgroundImage, title, subtitle } = props;

  return (
    <SlideMain backgroundImage={backgroundImage}>
      <ContainerDataSlider>
        <h2 style={{ fontSize: "1.9rem", color: "var(--secondFontColor)", marginLeft: "6.8rem", borderBottom: '1.2px solid var(--mainBackGroundButtonColor)', marginRight: "6.8rem"}}>
          {title}
        </h2>
        <p style={{color: "var(--colorInfo)", marginLeft: "6.8rem", marginRight: "6.8rem"}}>{subtitle}</p>
      </ContainerDataSlider>
    </SlideMain>
  );
};

export const CollectionsCarousel = () => {
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
          <SwiperSlide>
            <Slide
              backgroundImage={image1}
              title="Collection Electronic"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mauris orci, dapibus nec pretium ut, efficitur eu ex. Maecenas convallis, augue ac placerat ultricies, metus libero condimentum ipsum, eget finibus elit purus eu justo. Sed id lacus sed orci convallis vehicula non sed sapien. Curabitur gravida dictum libero. Aenean volutpat bibendum nunc, eget ultricies urna facilisis vulputate. Donec dolor dolor, commodo eu molestie et, egestas quis magna. Ut magna ante, tempor eu purus sollicitudin, laoreet feugiat lorem. Curabitur posuere metus posuere, congue arcu eget, lacinia sapien. Sed vulputate efficitur turpis. Integer vestibulum nec nulla non rhoncus. Proin vitae felis sit amet est accumsan luctus. "
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              backgroundImage={image2}
              title="Collection Streaming"
              subtitle="Quisque posuere erat ex, vel ornare nunc interdum non. Aliquam ut mattis felis. Vivamus aliquet erat ante, aliquam dictum ligula consectetur in. Suspendisse eu tortor condimentum, gravida libero non, aliquet nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim mauris ultrices faucibus placerat. Morbi hendrerit malesuada nibh, vel tempor dui pretium eget. Sed nec consequat quam, molestie luctus dolor. Nunc fringilla facilisis auctor. Aenean sed ipsum risus. Mauris ut lorem lectus. Phasellus magna nunc, dignissim sit amet libero eget, posuere facilisis ipsum. Curabitur ullamcorper ut nisl et maximus. Maecenas nec tortor sodales, lacinia magna at, pharetra risus. "
            />
          </SwiperSlide>
          <SwiperSlide>
            <Slide
              backgroundImage={image3}
              title="Collection Shoes"
              subtitle="Vivamus in sollicitudin ligula. Aenean rutrum molestie ipsum sed pulvinar. Duis velit nisl, aliquam sed sollicitudin et, semper sodales lacus. Sed iaculis, urna ut aliquam porta, est nulla convallis diam, nec tincidunt augue leo at nisl. Ut non hendrerit eros. Pellentesque efficitur quam quis nibh dapibus, consequat molestie libero lobortis. Integer tempor nibh eu sem sollicitudin, eget sollicitudin enim auctor. Vivamus eget egestas turpis. Vivamus eget tincidunt urna. "
            />
          </SwiperSlide>
        </Swiper>
      </ContainerCarousel>
    </div>
  );
};
