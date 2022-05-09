import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { filterByCurrencies, getCurrencies } from '../../../../../redux/actions';
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

const CurrenciesFilter = () => {

    const dispatch = useDispatch()
    const currencies = useSelector(state=> state.currencies)

    useEffect(()=>{
        dispatch(getCurrencies())
    },[])

    function handleChange(e){
        const id = e.target.value
        console.log(id)
        dispatch(filterByCurrencies(id))
    }

    console.log(currencies)
    return (
        <SelectStyle name="" id="" onChange={(e)=>handleChange(e)}>
            <option value="" >Filter by Currency</option>
            {
                currencies && currencies.map(t=>{
                    return (
                        <option value={t._id}>{t.name}</option>
                    )
                })
            }
        </SelectStyle>
    );
};

export default CurrenciesFilter;