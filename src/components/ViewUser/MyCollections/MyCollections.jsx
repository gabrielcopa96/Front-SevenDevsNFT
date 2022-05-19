import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCollections } from "../../../redux/actions";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

export const MyCollections = (props) => {
  const { id, name, user } = props;

  const dispatch = useDispatch();

  const collections = useSelector((state) => state.collections);

  const nfts = useSelector((state) => state.nfts);

  const filterEliminated = nfts.filter((x) => x.collection_nft?._id === id);

  console.log(filterEliminated);

  const handleEliminatedCollection = (idCollection) => {
    if (filterEliminated?.length === 0) {
      dispatch(deleteCollections(idCollection));
      alert("se elimino correctamente");
    }
    if (filterEliminated?.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes eliminar una collection, si contiene nfts",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #22a4a7",
          paddingBottom: ".45rem",
          paddingTop: ".65rem",
        }}
      >
        <span>
          <Link
            to={`/home/collections/nfts/${name}`}
            style={{ textDecoration: "none", color: "#ccc" }}
          >
            Collections - {name}
          </Link>
          <span
            style={{
              color: "#22a4a7",
              fontWeight: "700",
              fontSize: "1.2rem",
              marginLeft: ".6rem",
              cursor: "pointer",
            }}
            onClick={() => handleEliminatedCollection(id)}
          >
            X
          </span>
        </span>
      </div>
    </div>
  );
};
