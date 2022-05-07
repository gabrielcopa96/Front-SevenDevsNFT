import React from "react";
import styled from "styled-components";
import { ViewNft } from "./elements/ViewNft/ViewNft.jsx";
// import { CollectionsCarousel } from "./elements/CollectionCarousel/CollectionsCarousel.jsx";



const HomeTitle = styled.div`
  color: var(--secondFontColor);
`;

function Home() {
  return (
    <>
      {/* <CollectionsCarousel /> */}
      <HomeTitle />
      <ViewNft />
     
    </>
  );
}

export default Home;
