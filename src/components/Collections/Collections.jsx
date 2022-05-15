import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections, getAllNft } from "../../redux/actions/index";
import CardCollection from "../Collections/CardCollection.jsx";
import styled from "styled-components";

const ColletionMain = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 7.5rem;
`;
const CentrarCard = styled.div`
  margin: 0 auto;
  width: 85%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
`;

export default function Collections() {
  const dispatch = useDispatch();
  const selectorNfts = useSelector((state) => state.nfts);
  const selectorCollections = useSelector((state) => state.collections);

  useEffect(() => {
    dispatch(getAllCollections());
  }, []);

  useEffect(() => {
    dispatch(getAllNft());
  }, []);

  return (
    <ColletionMain>
    <div style={{width: '85%', margin: '3rem auto 5rem auto', textAlign: 'center'}}>
      <h1 style={{color: 'var(--secondFontColor)'}}>Collections</h1></div>
      <CentrarCard>
        {selectorCollections.length > 0 ? (
          selectorCollections.map((c) => {
            return (
              <CardCollection
                image={c.image}
                name={c.name}
                _id={c._id}
                key={c._id}
              />
            );
          })
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </CentrarCard>
    </ColletionMain>
  );
}
