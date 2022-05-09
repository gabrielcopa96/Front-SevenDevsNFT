import React from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import "sweetalert2/dist/sweetalert2.css";

import axios from "axios";

import { removeUser } from "../../../redux/actions";
import { useDispatch } from "react-redux";



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

export const TableUsers = (props) => {
  const { currentPage, setCurrentPage, users, itemsPerPage } = props;

  const dispatch = useDispatch();


  const pagesUsers = []; //? pages for nft
  //? Paginado por nft
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pagesUsers.push(i);
  }

  console.log(pagesUsers);

  const renderPageNumberUser = pagesUsers.map((number) => {
    return (
      <ListTable
        key={number}
        id={number}
        name={number}
        value={number}
        onClick={(e) => handleClickPageNumbers(e.target.value)}
        className={currentPage.user === number ? "active" : null}
        style={{ cursor: "pointer" }}
      >
        <span>{number}</span>
      </ListTable>
    );
  });

  console.log(users);

  const indexOfLastItemUser = currentPage.user * itemsPerPage; //? valor = 9 , index last of nft
  const indexOfFirstItemUser = indexOfLastItemUser - itemsPerPage; //? valor = 0 , index first of nft

  const currentItemsUser = users.slice(
    indexOfFirstItemUser,
    indexOfLastItemUser
  ); //? items per nfts

  

  const handlenNext = (e) => {
    e.preventDefault();
    setCurrentPage({
      ...currentPage,
      user: currentPage.user + 1,
    });
  };

  const handlePrev = (e) => {
    e.preventDefault();

    setCurrentPage({
      ...currentPage,
      user: currentPage.user - 1,
    });
  };

  const handleEliminateUser = (id) => {
    Swal.fire({
      title: "Do you want to delete your user?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      color: "var(--secondFontColor)",
      background: "#46198fb3",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminated!", "", "success");
        const eliminarUser = await axios.delete(
          `http://localhost:4000/users/${id}`
        );
        return eliminarUser;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleRenderTableUser = currentItemsUser?.map((x, i) => {
    return (
      <tr key={i} style={{ color: "white", marginBottom: ".2rem" }}>
        <td> {x.uid}</td>
        <td>
          {x.image ? (
            <img src={x.image} style={{ width: "55px", height: "52px" }} />
          ) : (
            "S/N"
          )}
        </td>
        <td>{x.username}</td>
        <td>{x.firstName}</td>
        <td>{x.lastName}</td>
        <td>{x.email}</td>
        <td>{x.user_type.name}</td>
        <td>{x.wallet?.length > 0 ? x.wallet : "No cuenta con wallet"}</td>
        <td style={{ display: "flex", justifyContent: "space-evenly" }}>
          <ContainerButtonEditar>
            <Link to={`/edit/${x.uid}`} style={{ color: "#fff" }}>
              <i className="fas fa-edit"></i>
            </Link>
          </ContainerButtonEditar>
          <ButtonEliminar onClick={() => handleEliminateUser(x.uid)}>
            <i className="fas fa-trash-alt" style={{ color: "#fff" }}></i>
          </ButtonEliminar>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div>
        <h2 style={{ borderBottom: "1px solid #fff" }}>Users</h2>
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
                    <th>Image</th>
                    <th>username</th>
                    <th>firstName</th>
                    <th>LastName</th>
                    <th>email</th>
                    <th>user type</th>
                    <th>wallet</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{handleRenderTableUser}</tbody>
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
                disabled={currentPage.user === pagesUsers[0] ? true : false}
                aria-label="Previus"
                style={{ cursor: "pointer" }}
              >
                <span aria-hidden="true" style={{ color: "#fff" }}>
                  &laquo;
                </span>
              </ButtonPrevAndNext>
            </li>
            {renderPageNumberUser}
            <li>
              <ButtonPrevAndNext
                onClick={handlenNext}
                name="nft"
                disabled={
                  currentPage.user === pagesUsers[pagesUsers.length - 1]
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
