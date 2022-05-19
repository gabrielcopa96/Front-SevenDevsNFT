import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../../../Loading/Loading.jsx";
import { getNftQuery, removeNftQuery, searchBarFilter } from "../../../../redux/actions/index";

import { CardNft } from "../CardNft/CardNft.jsx";
import CategoryFilter from "./filters/CategoryFilter.jsx";
import CurrenciesFilter from "./filters/CurrenciesFilter.jsx";
import SalesFilter from "./filters/SalesFilter.jsx";
import FilesTypeFilter from "./filters/FilesTypeFilter.jsx";

import Input from '../../../shared/Input.jsx';

const ContainerAll = styled.div`
  width: 100%;
`;

const ContainerNft = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 0.2rem;
  margin: 0 auto;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 0.2rem 6rem!important;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ContainerTitleFilter = styled.div`
  width: 100%;
  height: 70px;
  margin: 2rem auto 2rem auto;
  border-radius: 0.5rem;
  display: grid;
`;

const ContainerFiltrosMain = styled.div`
  width: 90%;
  height: 70px;
  text-align: center;
  border-radius: 0.5rem;
  display: grid;
  margin: 2rem auto 2rem auto;
  grid-template-columns: auto auto auto auto auto;
  gap: 5rem;
  background-color: #46198f53;
  color: #fff;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: 250px;
    padding: 30px;
    color: #fff;
  }
`;

const ContainerLoader = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
`;


const ContainerAllNftTotalMain = styled.div`
  padding-top: 6.25rem;
  color: #fff;
`;

const ContainerSearch = styled.div`
  margin-top: 1rem;
  color: #fff;
  input {
    background-color: rgba(71, 17, 137, 1);
    border-radius: .5rem;
    color: #fff;
  }
`;



export const AllNft = () => {
  const nftAll = useSelector((state) => state.nfts);
  const nft = useSelector((state) => state.nftquery);
  const hasMore = useSelector((state) => state.hasMore);
  // const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")

  const instantCallback = useCallback(dispatch, [dispatch]);

  const handleInputSearch = (e) => {
    const value = e.target.value;
    setSearch(value)
    if(value === "") {
      fecthNft()
    } else {
      dispatch(searchBarFilter(search))
    }
  }

  useEffect(() => {
    instantCallback(getNftQuery(page));
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
    <ContainerAllNftTotalMain>
      <ContainerFiltrosMain>

        <ContainerSearch>
          <Input type="text" value={search} onChange={(e) => handleInputSearch(e)} width="80%" height="35px" placeholder="Search..." padding=".3rem"/>
        </ContainerSearch>

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
          style={{ overflow: "hidden" }}
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
                creator={x.details.user_creator.username}
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
    </ContainerAllNftTotalMain>
  );
};
