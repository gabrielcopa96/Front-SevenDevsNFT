import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TableNft } from "./Tables/TableNft.jsx";
import { TableCategory } from "./Tables/TableCategory.jsx";
import { TableUsers } from "./Tables/TableUsers.jsx";

import {
  getAllNft,
  deleteNft,
  getUsers,
  getCategory,
} from "../../redux/actions/index";

const ContainerPrimario = styled.div`
  width: 90%;
  margin: 7.5rem auto 1.5rem auto;
  color: var(--secondFontColor);
  /* display: grid;
  grid-template-columns: 10% 90%; */
`;

// const ContainerMainAdmin = styled.div`
//   width: 85%;
//   margin: 0 auto;
//   color: var(--secondFontColor);
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

  const category = useSelector((state) => state.category);

  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const instantCallback = useCallback(dispatch, [dispatch]);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState({
    nft: 1,
    category: 1,
    user: 1,
  });

  const token = localStorage.getItem("token"); //? token localStorage del usuario

  useEffect(() => {
    // if (nfts.length === 0 && category.length === 0) {
      instantCallback(getAllNft());
      instantCallback(getCategory());
      instantCallback(getUsers(token));
    // }
  }, [instantCallback]);

  const handelRemoveNft = (id) => {
    dispatch(deleteNft(token, id));
  };

  // const handlenNext = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.name)
  //   console.log(e.target.value)
  //   // const valueName = e.target.name
  //   setCurrentPage({
  //     ...currentPage,
  //     [e.target.name]: parseInt(e.target.value) + 1
  //   });
  // };

  // const handlenPrev = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.name)
  //   console.log(e.target.value)
  //   // const valueName = e.target.name
  //   setCurrentPage({
  //     ...currentPage,
  //     [e.target.name]: parseInt(e.target.value) - 1
  //   });
  // };

  // const renderPageNumberNft = pagesNft.map((number) => {
  //   return (
  //     <ListTable
  //       key={number}
  //       id={number}
  //       name={number}
  //       value={number}
  //       onClick={(e) => handleClickPageNumbers(e.target.value)}
  //       className={currentPage === number ? "page-item active" : "page-item"}
  //       style={{ cursor: "pointer" }}
  //     >
  //       <span>{number}</span>
  //     </ListTable>
  //   );
  // });

  // const renderPageNumberCategory = pagesCategory.map((number) => {
  //   return (
  //     <ListTable
  //       key={number}
  //       id={number}
  //       name={number}
  //       value={number}
  //       onClick={(e) => handleClickPageNumbers(e.target.value)}
  //       className={currentPage === number ? "page-item active" : "page-item"}
  //       style={{ cursor: "pointer" }}
  //     >
  //       <span>{number}</span>
  //     </ListTable>
  //   );
  // });

  // const handleRenderTableNft = currentItemsNft?.map((x, i) => {
  //   return (
  //     <tr key={i} style={{ color: "white", marginBottom: ".2rem" }}>
  //       <td> {x.name}</td>
  //       <td>
  //         {x.image ? (
  //           <img src={x.image} style={{ width: "55px", height: "52px" }} />
  //         ) : (
  //           "S/N"
  //         )}
  //       </td>
  //       <td>{x.files_types.name}</td>
  //       <td>{x.description}</td>
  //       <td>{x.category.name}</td>
  //       <td>{x.sales_types.name}</td>
  //       <td>{x.details.user_creator.username}</td>
  //       <td>{x.details.owner.username}</td>
  //       <td style={{ display: "flex", justifyContent: "space-evenly" }}>
  //         <ContainerButtonEditar>
  //           <Link to={`/edit/${x._id}`} style={{ color: "#fff" }}>
  //             <i className="fas fa-edit"></i>
  //           </Link>
  //         </ContainerButtonEditar>
  //         <ButtonEliminar onClick={() => handelRemoveNft(x._id)}>
  //           <i className="fas fa-trash-alt" style={{ color: "#fff" }}></i>
  //         </ButtonEliminar>
  //       </td>
  //     </tr>
  //   );
  // });

  // const handleRenderTableCategory = currentItemsCategory?.map((x, i) => {
  //   return (
  //     <tr key={i} style={{ color: "white", marginBottom: ".2rem" }}>
  //       <td> {x.name}</td>
  //       <td> {x._id}</td>
  //       <td style={{ display: "flex", justifyContent: "space-evenly" }}>
  //         <ContainerButtonEditar>
  //           <Link to={`/edit/${x._id}`} style={{ color: "#fff" }}>
  //             <i className="fas fa-edit"></i>
  //           </Link>
  //         </ContainerButtonEditar>
  //         <ButtonEliminar onClick={() => handelRemoveNft(x._id)}>
  //           <i className="fas fa-trash-alt" style={{ color: "#fff" }}></i>
  //         </ButtonEliminar>
  //       </td>
  //     </tr>
  //   );
  // });

  return (
    <>
      <ContainerPrimario>
        {/* <ContainerMenu> */}
          {/* <h4
            onClick={() => console.log("clickeate aqui")}
            style={{ color: "var(--secondFontColor)" }}
          >
            Tables
          </h4> */}
        {/* </ContainerMenu> */}
        {/* <ContainerMainAdmin> */}
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
        {/* </ContainerMainAdmin> */}
      </ContainerPrimario>
    </>
  );
};
