import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../../../Loading/Loading.jsx";
import { getNftQuery, removeNftQuery } from "../../../../redux/actions/index";

import { CardNft } from "../CardNft/CardNft.jsx";
import CategoryFilter from "./filters/CategoryFilter.jsx";
import CurrenciesFilter from "./filters/CurrenciesFilter.jsx";
import SalesFilter from "./filters/SalesFilter.jsx";
import FilesTypeFilter from "./filters/FilesTypeFilter.jsx";

const ContainerAll = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ContainerFilterNft = styled.div`
  width: 100%;
`;

const ContainerNft = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: .1rem;
  margin: 0 auto 0 10rem;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* grid-template-row; */
  }
`;

const ContainerTitleFilter = styled.div`
  width: 100%;
  height: 70px;
  margin: 2rem auto 2rem auto;
  border-radius: 0.5rem;
  display: grid;

  /* @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: 250px;
    padding: 30px;
  } */
`;

const ContainerFiltrosMain = styled.div`
  width: 90%;
  height: 70px;
  text-align: center;
  border-radius: 0.5rem;
  display: grid;

  /* padding-top: 2rem; */
  margin: 2rem auto 2rem auto;
  grid-template-columns: auto auto auto auto;
  gap: 5rem;
  background-color: #46198f53;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: 250px;
    padding: 30px;
  }
`;

const ContainerLoader = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
`;

// const ContainerLoading = styled.div`
//   background-color: red;
//   width: 50%;
//   margin: 0 auto;
// `

export const AllNft = () => {
  const nftAll = useSelector((state) => state.nfts);
  const nft = useSelector((state) => state.nftquery);
  const hasMore = useSelector((state) => state.hasMore);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const instantCallback = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    // if(hasMore) {
    instantCallback(getNftQuery(page));
    // }
  }, [instantCallback, page]);

  const token = localStorage.getItem("token");

  console.log(token);

  const fecthNft = () => {
    setTimeout(() => {
      if (hasMore) {
        setPage((prevState) => prevState + 1);
      }
    }, 1500);
  };

  return (
    <div style={{ marginTop: "7.5rem" }}>
      <ContainerFiltrosMain>
        <CurrenciesFilter className={"filters"} />

        <CategoryFilter className={"filters"} />

        <SalesFilter className={"filters"} />

        <FilesTypeFilter className={"filters"} />
      </ContainerFiltrosMain>
      <ContainerAll>
        <InfiniteScroll
          dataLength={page * 10} //? 8
          next={fecthNft} //2
          hasMore={hasMore}
          style={{ overflow: "hidden", width: "100%", margin: "0 auto"}}
          // loader={<h3 style={{color: 'var(--secondFontColor)', textAlign: 'center'}}>Loading...</h3>}
          loader={
            <ContainerLoader>
              <div
                style={{
                  width: "120px",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                <Loading />
              </div>
            </ContainerLoader>
          }
          endMessage={
            <hr style={{ borderColor: "var(--mainBackGroundButtonColor)" }} />
          }
        >
          <ContainerNft>
            {nft?.map((x) => (
              <CardNft
                image={x.image}
                name={x.name}
                price={x.price}
                files={x.files_types?.name}
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
            ))}
          </ContainerNft>
        </InfiniteScroll>
      </ContainerAll>
    </div>
  );
};
