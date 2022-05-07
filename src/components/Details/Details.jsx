import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { HiShare } from "react-icons/hi";
import { FcLike } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { SiEthereum } from "react-icons/si";
import { BsFillSuitHeartFill } from "react-icons/bs";

export const Details = () => {
  //const {img, image, name, price, id, category, files, currency, salestype, owner, imageCurrencies } =props;
  const location = useLocation();
  const [like, setLike] = useState(false);
  console.log(location);
  const id = location.pathname.split("/")[2];
  const cards = useSelector((state) => state.nfts);
  const nft = cards.filter((item) => item._id === id);
  console.log(nft[0].image)
  

  console.log(nft);
  
  const handleClick=(e)=>{
    e.preventDefault();
    setLike(!like);
   // nft[0].hasOwnProperty('likes')?(
   //    axios.put() 
   // )
  }
  
  return (
    <DetailsContainer>
      <Column>
        <Img img={nft[0].image} color='blue'  />
         <Row style={{ justifyContent: "space-between" }}>
          <h2>Description</h2>
          <IoIosArrowDown />
        </Row>
        <Row style={{ textAlign: "justify" }}>
          <p>{nft[0].description}</p>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <h2>Details</h2>
          <IoIosArrowDown />
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <p>Creator</p>
          <p>{nft[0].details.user_creator.username}</p>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <p>Owner</p>
          <p>{nft[0].details.owner.username}</p>
        </Row>
        {/*<Row style={{justifyContent:'space-between'}}>
      <p>Network</p>
      <p>La atarraya</p>
      </Row>
    */}
        <Row style={{ justifyContent: "space-between" }}>
          <p>Smart Contract</p>
          <p>{nft[0].details.contract_address}</p>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <p>Token Id</p>
          <p>{nft[0].details.token_id}</p>
        </Row>
      </Column>

      <Column1>
        <Row>
          <CollectionIcon src="https://public.nftstatic.com/static/nft/zipped/6a1d1afbc8654d64a8bbe6f8187a1f1e_zipped.png" />
        {
         nft[0].hasOwnProperty('collection_nft')&&<h3>{nft[0].collection_nft.name}</h3>
}
        </Row>
        <Row style={{ justifyContent: "left", gap: "50%", marginBottom:'0px', padding: '0px' }}>
          <Title>
            <h1>{nft[0].name}</h1>
            <p>{nft[0].category.name}</p>
          </Title>
          <LikeIcons  style={{ position:'absolute', top:'20%', left:'80%', padding:'0px', margin:'0px'}}>
            <HiShare
              style={{ width: "25px", height: "25px", cursor: "pointer", padding:'0px'}}
            />
            <BsFillSuitHeartFill
              onClick={handleClick}
              color={like ? "grey" : "red"}
              style={{ cursor: "pointer", width: "25px", height: "25px", padding:'0px' }}
            />
          </LikeIcons>
        </Row>
        <Row style={{position: 'absolute', top:'22%', left:'85%'}}>
         {nft[0].hasOwnProperty('likes')&&<p>{nft[0].likes}</p>}
        </Row>
        <Row style={{ justifyContent: "left", gap: "65%" }}>
          <p>Price</p>
          <p>Ends in</p>
        </Row>
        <Row style={{ justifyContent: "left", gap: "53%" }}>
          <Row>
            <img
              src={nft[0].currencies.image}
              style={{ width: "20px", height: "20px" }}
            />
            <h2>{nft[0].price}</h2>
          </Row>
          <p>
            44 <small>days</small> 30 <small>hours</small> 15 <small>min</small>{" "}
            00 <small>secs</small>
          </p>
        </Row>

        <Row style={{ gap: "5%" }}>
          <Button1 title="Buy Now" height="40px" width="100%"></Button1>
          <Button1 title="Make Offer" height="40px" width="100%"></Button1>
        </Row>

        <Row>
          <h3>Provenience</h3>
        </Row>
        <Row style={{ justifyContent: "space-around", textAlign: "left" }}>
          <h5>Name</h5>
          <h5>Action</h5>
          <h5>Trade Price</h5>
          <h5>Time</h5>
        </Row>
        <hr />
        <Row style={{ justifyContent: "space-around", textAlign: "left" }}>
          <p>Usuario1</p>
          <p>Purchased</p>
          <p>30.5 USDT</p>
          <p>2022-01-04 14:30:04</p>
        </Row>
        <Row style={{ justifyContent: "space-around", textAlign: "left" }}>
          <p>Usuario2</p>
          <p>Purchased</p>
          <p>25.8 USDT</p>
          <p>2022-01-04 14:30:04</p>
        </Row>
      </Column1>
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 7.5rem;
  display: flex;
  flex-direction: row;

  justify-content: space-around;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  color: white;
`;

const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  height: 15%;
  width: 50%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: white;
`;
const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: white;
`;

const Img = styled.div`
   background-image: url(${props => props.img});
   background-size: 100%;
   width: 500px;
   height: 500px;
   border-radius:5px;
   //background-color:${props=>props.color};
`;


const ImgNft = styled.img`
  height: 30%;
  width: 30%;
  border-radius: 5%;
`;

const CollectionIcon = styled.img`
  height: 30px;
  width: 30px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const LikeIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 0.3rem;
  margin: ${(props) => props.margin || ".5rem 0 .8rem 0"};
  cursor: pointer;
  color: var(--secondFontColor);
  padding: ${(props) => props.padding || ".2rem 1.8rem"};
  font-weight: 600;
  text-align: center;
  font-size: 1rem;
  outline: none;
  /* background: ${(props) => props.color || "#23136e"}; */
  background: ${(props) => props.color || "var(--mainBackGroundButtonColor)"};
  /* border: 1px solid ${(props) => props.color || "#23136e"}; */
  /* background: ${(props) => props.color || "#6d6a799f"}; */
  width: ${(props) => props.width || "60px"};
  height: ${(props) => props.height || "40px"};
  line-height: 30px;
  img {
    height: 20px;
  }

  ${(props) =>
    props.disabled
      ? css`
          opacity: 0.5;
        `
      : css`
          &:hover {
            background: white;
            transition: all 0.9s ease;
            color: ${(props) => props.color || "var(--mainFontColor)"};
          }
        `};
`;

const Button1 = ({
  disabled = false,
  title,
  onClick,
  padding,
  margin,
  width,
  height,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      padding={padding}
      margin={margin}
      width={width}
      height={height}
      title={title}
      onClick={onClick}
    >
      {title}
    </StyledButton>
  );
};
