import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBySaleWay, getSalesType } from "../../../../../redux/actions";
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
  /* padding-top: 1rem; */

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

const SalesFilter = () => {
  const dispatch = useDispatch();
  const sales_type = useSelector((state) => state.sales_type);

  useEffect(() => {
    dispatch(getSalesType());
  }, []);

  function handleChange(e) {
    const id = e.target.value;
    console.log(id);
    dispatch(filterBySaleWay(id));
  }

  return (
    <SelectStyle name="" id="" onChange={(e) => handleChange(e)}>
      <option value="">Filter by Sale method</option>
      {sales_type &&
        sales_type.map((t) => {
          return <option value={t._id}>{t.name}</option>;
        })}
    </SelectStyle>
  );
};

export default SalesFilter;
