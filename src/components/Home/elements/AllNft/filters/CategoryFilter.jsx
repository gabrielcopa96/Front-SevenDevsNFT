import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { filterByCategory, getCategory } from '../../../../../redux/actions';

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

const CategoryFilter = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state=> state.category)

    useEffect(()=>{
        dispatch(getCategory())
    },[])

    function handleChange(e){
        const id = e.target.value
        console.log(id)
        dispatch(filterByCategory(id))
    }

    return (
        <SelectStyle name="" id="" onChange={(e)=>handleChange(e)}>
            <option value="" >Filter by Category</option>
            {
                categories && categories.map(t=>{
                    return (
                        <option value={t._id}>{t.name}</option>
                    )
                })
            }
        </SelectStyle>
    );
};

export default CategoryFilter;