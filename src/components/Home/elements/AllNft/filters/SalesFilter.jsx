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
        sales_type.map((t, y) => {
          return <option value={t._id} key={y}>{t.name}</option>;
        })}
    </SelectStyle>
  );
};

export default SalesFilter;
