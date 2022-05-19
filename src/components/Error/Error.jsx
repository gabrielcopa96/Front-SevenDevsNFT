import React from "react";

import styled from "styled-components";

import imagenerror from "../../assets/error404.png";

const ContainerError = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  align-items: center;
`;

export const Error = () => {
  return (
    <div>
      <ContainerError>
        <img src={imagenerror} style={{ width: "50vw", height: "100vh" }} />
      </ContainerError>
    </div>
  );
};
