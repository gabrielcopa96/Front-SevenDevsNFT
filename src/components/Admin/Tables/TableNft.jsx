import React, { useState } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import styles from "../admin.module.css";

import imagenvideo from "../../../assets/azuki-nft.gif";

import imagenaudio from "../../../assets/nft-audio.jpg";

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

export const TableNft = (props) => {
  const { currentPage, setCurrentPage, nft, itemsPerPage } = props;

  const pagesNft = []; //? pages for nft
  //? Paginado por nft
  for (let i = 1; i <= Math.ceil(nft.length / itemsPerPage); i++) {
    pagesNft.push(i);
  }

  const [openDrop, setOpenDrop] = useState(false);

  const handleClickPageNumbers = (number) => {
    setCurrentPage({
      ...currentPage,
      nft: number,
    });
  };

  const renderPageNumberNft = pagesNft.map((number) => {
    console.log(number);
    return (
      <ListTable
        key={number}
        id={number}
        name={number}
        value={number}
        onClick={(e) => handleClickPageNumbers(e.target.value)}
        className={currentPage.nft === number ? "active" : null}
        style={{ cursor: "pointer" }}
      >
        <span>{number}</span>
      </ListTable>
    );
  });

  const indexOfLastItemNft = currentPage.nft * itemsPerPage; //? valor = 9 , index last of nft
  const indexOfFirstItemNft = indexOfLastItemNft - itemsPerPage; //? valor = 0 , index first of nft

  const currentItemsNft = nft.slice(indexOfFirstItemNft, indexOfLastItemNft); //? items per nfts

  // const handlePhoto = () => {
  //   if (x.files_types.name === "Image") {
  //     return `${x.image}`;
  //   }
  //   if (x.files_types.name === "Video") {
  //     return `${imagenvideo}`;
  //   }
  //   if (x.file_types.name === "Audio") {
  //     return `${imagenaudio}`;
  //   }
  // };

  const handleRenderTableNft = currentItemsNft?.map((x, i) => {
    return (
      <tr key={i} style={{ color: "#141414", marginBottom: ".2rem" }}>
        <td> {x.name}</td>
        <td>
          {x.image ? (
            <img
              src={
                x.files_types.name === "Image"
                  ? x.image
                  : x.files_types.name === "Video"
                  ? imagenvideo
                  : x.files_types.name === "Audio"
                  ? imagenaudio
                  : null
              }
              style={{ width: "55px", height: "52px" }}
            />
          ) : (
            "S/N"
          )}
        </td>
        <td>{x.files_types.name}</td>
        <td>{x.description}</td>
        <td>{x.category.name}</td>
        <td>{x.sales_types.name}</td>
        <td>{x.details.user_creator.username}</td>
        <td>{x.details.owner.username}</td>
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

  const handlenNext = (e) => {
    e.preventDefault();
    // const valueName = e.target.name
    setCurrentPage({
      ...currentPage,
      nft: currentPage.nft + 1,
    });
  };

  const handlePrev = (e) => {
    e.preventDefault();

    setCurrentPage({
      ...currentPage,
      nft: currentPage.nft - 1,
    });
  };

  // console.log(currentPage.nft)

  const handleDespliegue = () => {
    if (openDrop === false) {
      setOpenDrop(true);
    }
    if (openDrop === true) {
      setOpenDrop(false);
    }
  };

  return (
    <div className={styles.table}>
      {/* <div className="enia">
        <h1>Prueba que se tiene que ver este cambio</h1>
      </div> */}
      <div className={styles.ContainerTitleTableAll}>
        <h2 style={{ borderBottom: "1px solid #fff" }}>Table NFT</h2>
        <i
          className="fa-solid fa-circle-chevron-down"
          onClick={() => handleDespliegue()}
        ></i>
      </div>
      <div className={openDrop === false ? styles.dropdown : styles.dropup}>
        <div>
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
                      <th>Title</th>
                      <th>Image</th>
                      <th>Files</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Sales</th>
                      <th>Creator</th>
                      <th>Owner</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{handleRenderTableNft}</tbody>
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
                  onClick={handlePrev}
                  name="nft"
                  disabled={currentPage.nft === pagesNft[0] ? true : false}
                  aria-label="Previus"
                  style={{ cursor: "pointer" }}
                >
                  <span aria-hidden="true" style={{ color: "#fff" }}>
                    &laquo;
                  </span>
                </ButtonPrevAndNext>
              </li>
              {renderPageNumberNft}
              <li>
                <ButtonPrevAndNext
                  onClick={handlenNext}
                  name="nft"
                  disabled={
                    currentPage.nft === pagesNft[pagesNft.length - 1]
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
      </div>
    </div>
  );
};
