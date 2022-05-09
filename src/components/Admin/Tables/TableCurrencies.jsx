import React from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { PostCurrencies } from "../../../redux/actions";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

import "sweetalert2/dist/sweetalert2.css";

const ContainerPagination = styled.div`
  margin: 0 auto;
  width: 50%;
`;

const ContainerNavTable = styled.div`
  width: 100%;
`;

const RowNavTable = styled.div`
  width: 100%;
`;

const ColNavTable = styled.div`
  width: 100%;
`;

const ButtonAgregar = styled.div`
  width: 32px;
  height: 32px;
  background-color: #46198f;
  margin: 0.3rem 0 0.3rem 0;
  line-height: 32px;
  text-align: center;
  border-radius: 0.2rem;

  &:hover {
    background-color: #301955;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

const ContainerTable = styled.table`
  width: 100%;
`;

const ContainerPaginationTable = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 1rem auto;
  list-style: none;
`;

const ButtonPrevAndNext = styled.button`
  background-color: #6b48ff;
  border: none;
  padding: 0.4rem 0.75rem;
`;

const ButtonEliminar = styled.div`
  width: 38px;
  height: 35px;
  background-color: var(--colorError);
  border: none;
  border-radius: 0.2rem;
  margin-top: 0.4rem;
  line-height: 35px;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: #bb2222;
  }
`;

const ContainerButtonEditar = styled.div`
  width: 38px;
  height: 35px;
  background-color: #27c0c0;
  line-height: 35px;
  margin-top: 0.4rem;
  text-align: center;
  border-radius: 0.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const ListTable = styled.li`
  margin: 0 0.2rem;
  padding: 0.25rem 0.7rem;
  border: 1px solid #22a5a757;
`;

export const TableCurrencies = (props) => {
  const { currentPage, itemsPerPage, setCurrentPage, currencies } = props;
  const pagesCurrencies = []; //? pages for currencies

  const dispatch = useDispatch();

  //? Paginado por categoria
  for (let i = 1; i <= Math.ceil(currencies.length / itemsPerPage); i++) {
    pagesCurrencies.push(i);
  }

  const indexOfLastItemCurrencies = currentPage.currencies * itemsPerPage; //? index last of currencies
  const indexOfFirstItemCurrencies = indexOfLastItemCurrencies - itemsPerPage; //? index first of currencies

  const currentItemsCurrencies = currencies.slice(
    indexOfFirstItemCurrencies,
    indexOfLastItemCurrencies
  ); //? items per currencies

  const handleRenderTableCurrencies = currentItemsCurrencies?.map((x, i) => {
    return (
      <tr key={i} style={{ color: "white", marginBottom: ".2rem" }}>
        <td> {x._id}</td>
        <td> {x.name}</td>
        <td> {x.image}</td>
        <td style={{ display: "flex", justifyContent: "space-evenly" }}>
          <ContainerButtonEditar>
            <Link to={`/edit/${x._id}`} style={{ color: "#fff" }}>
              <i className="fas fa-edit"></i>
            </Link>
          </ContainerButtonEditar>
          <ButtonEliminar onClick={() => console.log("se hizo click")}>
            <i className="fas fa-trash-alt" style={{ color: "#fff" }}></i>
          </ButtonEliminar>
        </td>
      </tr>
    );
  });

  const renderPageNumberCurrencies = pagesCurrencies.map((number) => {
    return (
      <ListTable
        key={number}
        id={number}
        name={number}
        value={number}
        onClick={(e) => handleClickPageNumbers(e.target.value)}
        className={currentPage.currencies === number ? "active" : null}
        style={{ cursor: "pointer" }}
      >
        <span>{number}</span>
      </ListTable>
    );
  });

  const handlenNext = (e) => {
    e.preventDefault();
    setCurrentPage({
      ...currentPage,
      currencies: currentPage.currencies + 1,
    });
  };

  const handlenPrev = (e) => {
    e.preventDefault();
    // const valueName = e.target.name
    setCurrentPage({
      ...currentPage,
      currencies: currentPage.currencies - 1,
    });
  };

  const handleCreateCurrencies = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Escribe la nueva moneda",
      html: '<input id="swal-input1" class="swal2-input" placeholder="nueva moneda..."><div id="recaptcha"></div>',
      focusConfirm: false,
      color: "var(--secondFontColor)",
      background: "#46198fb3",
      showCancelButton: true,
      preConfirm: () => {
        const valores = document.getElementById("swal-input1").value;
        return {
          name: valores,
        };
      },
    });

    if (formValues) {
      Swal.fire({
        title: "Este es tu nueva moneda",
        text: `${formValues.name}`,
      });
      setTimeout(() => {
        dispatch(PostCurrencies(formValues));
      }, 2500);
    }
  };

  //? postCurrencies

  return (
    <>
      <div>
        <h2 style={{ borderBottom: "1px solid #fff" }}>Currencies</h2>
        <ContainerNavTable>
          <RowNavTable>
            <ColNavTable>
              <ButtonAgregar onClick={() => handleCreateCurrencies()}>
                {/* <button to="/admin/create" style={{ color: "#fff" }}> */}
                <i className="fas fa-plus"></i>
                {/* </button> */}
              </ButtonAgregar>
              <Link to="/"></Link>
              <ContainerTable>
                <thead className="tableTheadBg">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{handleRenderTableCurrencies}</tbody>
              </ContainerTable>
            </ColNavTable>
          </RowNavTable>
        </ContainerNavTable>
      </div>
      <ContainerPagination>
        <nav
          className="Page navigation example"
          style={{ margin: "0 auto", width: "40%" }}
        >
          <ContainerPaginationTable>
            <li>
              <ButtonPrevAndNext
                onClick={handlenPrev}
                name="currencies"
                disabled={
                  currentPage.currencies === pagesCurrencies[0] ? true : false
                }
                aria-label="Previus"
                style={{ cursor: "pointer" }}
              >
                <span aria-hidden="true" style={{ color: "#fff" }}>
                  &laquo;
                </span>
              </ButtonPrevAndNext>
            </li>
            {renderPageNumberCurrencies}
            <li>
              <ButtonPrevAndNext
                onClick={handlenNext}
                name="currencies"
                disabled={
                  currentPage.currencies ===
                  pagesCurrencies[pagesCurrencies.length - 1]
                    ? true
                    : false
                }
                aria-label="Next"
                style={{ cursor: "pointer" }}
              >
                <span aria-hidden="true" style={{ color: "#fff" }}>
                  &raquo;
                </span>
              </ButtonPrevAndNext>
            </li>
          </ContainerPaginationTable>
        </nav>
      </ContainerPagination>
    </>
  );
};
