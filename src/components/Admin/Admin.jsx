import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TableNft } from "./Tables/TableNft.jsx";
import { TableCategory } from "./Tables/TableCategory.jsx";
import { TableUsers } from "./Tables/TableUsers.jsx";
import { TableCurrencies } from "./Tables/TableCurrencies.jsx";
import { TableSaleTypes } from "./Tables/TableSaleTypes.jsx";
import { TableFileTypes } from "./Tables/TableFileTypes.jsx";
import {MenuAdmin} from "./MenuAdmin.jsx";

import styles from './admin.module.css';

import {
  getAllNft,
  deleteNft,
  getUsers,
  getCategory,
  getCurrencies,
  getSalesType,
  getFileTypes
} from "../../redux/actions/index";

// const ContainerPrimario = styled.div`
//   width: 70%;
//   margin: 3.5rem auto 0 24%;
//   padding-top: 2rem;
//   padding-bottom: 2rem;
// `;

const ContainerPagination = styled.div`
  margin: 0 auto;
  width: 50%;
`;

const ContainerMenu = styled.div`
  width: 100%;
  background-color: #46198f53;
  padding: 2rem;
  text-align: center;
  border-radius: 0.4rem;
  border: 1px solid #22a5a757;

  h4 {
    &:hover {
      cursor: pointer;
      background-color: #57575752;
    }
  }
`;

export const Admin = () => {
  const nfts = useSelector((state) => state.nfts);

  const currencies = useSelector((state) => state.currencies);

  const category = useSelector((state) => state.category);

  const isOpen = useSelector((state) => state.open);

  const sales = useSelector((state) => state.sales_type);

  const files = useSelector((state) => state.files_type);

  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const instantCallback = useCallback(dispatch, [dispatch]);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState({
    nft: 1,
    category: 1,
    user: 1,
    currencies: 1,
    salesType: 1,
    fileTypes: 1
  });

  const token = localStorage.getItem("token"); //? token localStorage del usuario

  useEffect(() => {
    // if (nfts.length === 0 && category.length === 0) {
      instantCallback(getAllNft());
      instantCallback(getCategory());
      instantCallback(getUsers(token));
      instantCallback(getCurrencies())
      instantCallback(getSalesType())
      instantCallback(getFileTypes())
    // }
  }, [instantCallback]);

  const handelRemoveNft = (id) => {
    dispatch(deleteNft(token, id));
  };

  console.log(files)

  return (
    <>
      <div className={isOpen === true ? styles.containerPrimario : styles.containerPrimarioClose}>
          <TableNft
            nft={nfts}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <TableCategory
            category={category}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
          <TableUsers
            users={users}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <TableCurrencies
            currencies={currencies}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> 
          <TableSaleTypes
            sales={sales}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <TableFileTypes
            file={files}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
      </div>
    </>
  );
};
