import React from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

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

export const TableCategory = (props) => {
  const { currentPage, itemsPerPage, setCurrentPage, category } = props;
  const pagesCategory = []; //? pages for category

  //? Paginado por categoria
  for (let i = 1; i <= Math.ceil(category.length / itemsPerPage); i++) {
    pagesCategory.push(i);
  }

  const indexOfLastItemCategory = currentPage.category * itemsPerPage; //? index last of category
  const indexOfFirstItemCategory = indexOfLastItemCategory - itemsPerPage; //? index first of category

  const currentItemsCategory = category.slice(
    indexOfFirstItemCategory,
    indexOfLastItemCategory
  ); //? items per category

  const handleRenderTableCategory = currentItemsCategory?.map((x, i) => {
    return (
      <tr key={i} style={{ color: "white", marginBottom: ".2rem" }}>
        <td> {x.name}</td>
        <td> {x._id}</td>
        <td style={{ display: "flex", justifyContent: "space-evenly" }}>
          <ContainerButtonEditar>
            <Link to={`/edit/${x._id}`} style={{ color: "#fff" }}>
              <i className="fas fa-edit"></i>
            </Link>
          </ContainerButtonEditar>
          <ButtonEliminar onClick={() => handelRemoveNft(x._id)}>
            <i className="fas fa-trash-alt" style={{ color: "#fff" }}></i>
          </ButtonEliminar>
        </td>
      </tr>
    );
  });

  const renderPageNumberCategory = pagesCategory.map((number) => {
    return (
      <ListTable
        key={number}
        id={number}
        name={number}
        value={number}
        onClick={(e) => handleClickPageNumbers(e.target.value)}
        className={
          currentPage.category === number ? "active" : null
        }
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
      category: currentPage.category + 1,
    });
  };

  const handlenPrev = (e) => {
    e.preventDefault();
    // const valueName = e.target.name
    setCurrentPage({
      ...currentPage,
      category: currentPage.category - 1,
    });
  };

  return (
    <>
      <div>
        <h2 style={{ borderBottom: "1px solid #fff" }}>Category</h2>
        <ContainerNavTable>
          <RowNavTable>
            <ColNavTable>
              <ButtonAgregar>
                <Link to="/admin/create" style={{ color: "#fff" }}>
                  <i className="fas fa-plus"></i>
                </Link>
              </ButtonAgregar>
              <Link to="/"></Link>
              <ContainerTable>
                <thead className="tableTheadBg">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{handleRenderTableCategory}</tbody>
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
                name="category"
                disabled={
                  currentPage.category === pagesCategory[0] ? true : false
                }
                aria-label="Previus"
                style={{ cursor: "pointer" }}
              >
                <span aria-hidden="true" style={{ color: "#fff" }}>
                  &laquo;
                </span>
              </ButtonPrevAndNext>
            </li>
            {renderPageNumberCategory}
            <li>
              <ButtonPrevAndNext
                onClick={handlenNext}
                name="category"
                disabled={
                  currentPage.category ===
                  pagesCategory[pagesCategory.length - 1]
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
