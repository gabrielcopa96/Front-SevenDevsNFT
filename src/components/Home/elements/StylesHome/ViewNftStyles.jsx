import styled from "styled-components";
import image from "../../../../assets/NOT-FOUND.png";

export const ContainerNFT = styled.div`
  width: 90%;
  margin: 0 auto;

  /* background-color: var(--mainContainersColor); */
`;

export const NftTitle = styled.h1`
  font-size: 1.5rem;
  color: var(--secondFontColor);
  margin-top: 1rem;
  margin-bottom: 1rem;
  /* border-bottom: 1px solid var(--mainBackGroundButtonColor); */
`;

export const ContainerCards = styled.div`
  display: flex;
  gap: 20px;
`;

const Cards = styled.div`
  width: 280px;
  text-align: center;
  line-height: 320px;
  display: flex;
  /* margin:s 0 auto; */
  height: 320px;
  /* position: relative; */
  border-radius: 1rem;
  background-image: url(${(props) => props.backgroundImage || `${image}`});
  background-size: cover;
  justify-self: center;
  background-position: center;
  background-repeat: no-repeat;

  /* background-attachment: fixed; */
  /* background-color: #50505099; */
  /* background-color: var(--mainContainersColor); */
`;

export const ContainerDataCard = styled.div`
  /* background-color: red; */
  width: 280px;
  margin-top: 0.7rem;
  color: #fff;
  bottom: -30px;
  padding: 0.42rem 0 0.42rem 0.1rem;
  border-radius: 0 0 0.6rem 0.6rem;

  &:hover {
    /* border: 1px solid var(--mainBackGroundButtonColor); */
    /* position: absolute; */
  }
  /* border-radius: .6rem .6rem 0 0; */
`;

export const ContainerCategory = styled.div`
  &:hover {
    -moz-transform: skew(-4deg, 0deg);
    -webkit-transform: skew(-4deg, 0deg);
    -o-transform: skew(-4deg, 0deg);
    -ms-transform: skew(-4deg, 0deg);
    transform: skew(-4deg, 0deg);
    transition: all 0.5s ease;
  }
  /* -webkit-box-shadow: 0px 0px 55px 5px rgba(22, 28, 86, 0.79);
    box-shadow: 0px 0px 21px 5px rgba(22, 28, 86, 0.79); */
`;

export const Card = (props) => {
  const { backgroundImage } = props;

  return <Cards backgroundImage={backgroundImage} />;
};

