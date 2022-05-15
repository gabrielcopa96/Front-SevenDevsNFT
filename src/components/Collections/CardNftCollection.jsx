import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { filterNft } from "../../redux/actions/index.js";
import { CardNft } from "../Home/elements/CardNft/CardNft.jsx";
import styled from "styled-components";

const ContenedorDeCardsColecciones = styled.div`
  width: 100%;
  margin-top: 7.5rem;
`;

const ContenedorMainColecciones = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ContenedorTitleCollectionsType = styled.div`
  margin: 0 auto;
  width: 85%;
`;

export default function CardNftCollection() {
  const dispatch = useDispatch(); //? las va a ejecutar a las actions, reemplaza el connect

  const { name } = useParams();
  console.log(name);

  useEffect(() => {
    dispatch(filterNft(name));
  }, [dispatch, name]); //? el array son las dependecias

  const myNft = useSelector((state) => state.filterNfts);

  return (
    <ContenedorDeCardsColecciones>
      <ContenedorTitleCollectionsType>
        <h1
          style={{
            color: "var(--secondFontColor)",
            textAlign: "center",
            marginBottom: "1.5rem",
            borderBottom: "2px solid var(--mainBackGroundButtonColor)",
          }}
        >
          Colecciones - {name}
        </h1>
      </ContenedorTitleCollectionsType>
      <ContenedorMainColecciones>
        {myNft?.length ? (
          myNft.map((x) => (
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
              id={x._id}
              key={x._id}
            />
          ))
        ) : (
          <div>
            <h2>No hay NFTs para esta coleccion</h2>
          </div>
        )}
      </ContenedorMainColecciones>
    </ContenedorDeCardsColecciones>
  );
}
