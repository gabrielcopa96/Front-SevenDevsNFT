import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByFileType, getFileTypes } from "../../../../../redux/actions";

import styled from "styled-components";

const SelectStyle = styled.select`
  outline: 0;
  box-shadow: none;
  border: 0;
  background-color: rgba(71, 17, 137, 1);
  color: var(--secondFontColor);
  border-radius: 10px;
  height: 55%;
  margin: 1rem;
  /* padding: 1rem; */

  /* @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: 250px;
    padding: 30px;

    select {
      width: 100%;
    }
  } */
`;

const FilesTypeFilter = () => {
  const dispatch = useDispatch();
  const file_types = useSelector((state) => state.files_type);

  useEffect(() => {
    // if (file_types.length === 0) {
      dispatch(getFileTypes());
    // }
  }, []);

  function handleChange(e) {
    const id = e.target.value;
    console.log(id);
    dispatch(filterByFileType(id));
  }

  return (
    <SelectStyle name="" id="" onChange={(e) => handleChange(e)}>
      <option value="">Filter by File Type</option>
      {file_types &&
        file_types.map((t) => {
          return <option value={t._id}>{t.name}</option>;
        })}
    </SelectStyle>
  );
};

export default FilesTypeFilter;
