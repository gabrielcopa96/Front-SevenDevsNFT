import React from "react";

import styled from "styled-components";

import logo from "../../../../assets/logo.png";

import primerpaso from "../../../../assets/img-steps/primerpaso.jpg";
import segundopaso from "../../../../assets/img-steps/segundopaso.jpg";
import tercerpaso from "../../../../assets/img-steps/tercerpaso.jpg";
import cuartopaso from "../../../../assets/img-steps/cuartopaso.jpg";
import quintopaso from "../../../../assets/img-steps/quintopaso.jpg";

const ContainerMainHowToBuy = styled.div`
  width: 75%;
  margin: 7.5rem auto 2.5rem auto;
  /* text-align: center; */
  img {
    width: 10%;
    height: 49px;
  }
`;

const ContainerTitleHowToBuy = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerPrimarySteps = styled.div`
  width: 90%;
  display: grid;
  margin: 1.8rem auto;
  align-items: center;
  gap: 8%;
  grid-template-columns: 50% 50%;
`;

export const HowToBuy = () => {
  return (
    <div>
      <ContainerMainHowToBuy>
        <ContainerTitleHowToBuy>
          <h1 style={{ color: "white", borderBottom: "1px solid #22a4a7" }}>
            How to buy an nft on
          </h1>
          <img
            src={logo}
            alt="logo"
            style={{ color: "white", borderBottom: "1px solid #22a4a7" }}
          />
        </ContainerTitleHowToBuy>
        <ContainerPrimarySteps>
          <div>
            <h1 style={{ color: "white" }}>Step 1 :</h1>
            <p
              style={{
                color: "#ccc",
                fontSize: "1.3rem",
                textAlign: "justify",
              }}
            >
              First, we look at the great variety of nft that the page has, I
              choose the one that I like the most and I click on the name of the
              nft which would take me to the detail.
            </p>
          </div>
          <img
            src={primerpaso}
            style={{
              width: "88%",
              height: "92%",
              borderRadius: ".2rem 2rem .2rem 2rem",
              border: "1px solid #22a4a7",
            }}
          />
        </ContainerPrimarySteps>
        <ContainerPrimarySteps>
          <img
            src={segundopaso}
            alt="segundopaso"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: ".2rem 2rem .2rem 2rem",
              border: "1px solid #22a4a7",
            }}
          />
          <div style={{width: "87%"}}>
            <h1 style={{ color: "white" }}>Step 2 :</h1>
            <p
              style={{
                color: "#ccc",
                fontSize: "1.3rem",
                textAlign: "justify",
              }}
            >
              Second, we go into the detail of this nft, right here we would get
              a button to buy if you want to buy click on that button.
            </p>
          </div>
        </ContainerPrimarySteps>
        <ContainerPrimarySteps>
          <div>
            <h1 style={{ color: "white" }}>Step 3 :</h1>
            <p
              style={{
                color: "#ccc",
                fontSize: "1.3rem",
                textAlign: "justify",
              }}
            >
              Third, when clicking on the buy button, the metamask tab will
              open, which before we should have already registered and connected
              the account with metamask, after this the payment of the nft is
              confirmed and the currency transfer would be made crypto with your
              fee.
            </p>
          </div>
          <img
            src={tercerpaso}
            style={{
              width: "90%",
              height: "85%",
              borderRadius: ".2rem 2rem .2rem 2rem",
              border: "1px solid #22a4a7",
            }}
          />
        </ContainerPrimarySteps>
        <ContainerPrimarySteps>
          <img
            src={cuartopaso}
            alt="segundopaso"
            style={{
              width: "95%",
              height: "95%",
              borderRadius: ".2rem 2rem .2rem 2rem",
              border: "1px solid #22a4a7",
            }}
          />
          <div>
            <h1 style={{ color: "white" }}>Step 4 :</h1>
            <p
              style={{
                color: "#ccc",
                fontSize: "1.3rem",
                textAlign: "justify",
              }}
            >
              It is confirmed that the purchase was made successfully
            </p>
          </div>
        </ContainerPrimarySteps>
        <ContainerPrimarySteps>
          <div style={{width: "93%"}}>
            <h1 style={{ color: "white" }}>Step 5 :</h1>
            <p
              style={{
                color: "#ccc",
                fontSize: "1.3rem",
                textAlign: "justify",
              }}
            >
              Finally we will go to our profile in the tab of my publications
              and we will see that there is the nft that we just bought
            </p>
          </div>
          <img
            src={quintopaso}
            style={{
              width: "100%",
              height: "98%",
              borderRadius: ".2rem 2rem .2rem 2rem",
              border: "1px solid #22a4a7",
            }}
          />
        </ContainerPrimarySteps>
      </ContainerMainHowToBuy>
    </div>
  );
};
