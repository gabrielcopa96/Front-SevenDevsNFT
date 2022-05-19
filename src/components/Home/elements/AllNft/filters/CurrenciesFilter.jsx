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
                currencies && currencies.map((t, y)=>{
                    return (
                        <option value={t._id} key={y}>{t.name}</option>
                    )
                })
            }
        </SelectStyle>
    );
};

export default CurrenciesFilter;