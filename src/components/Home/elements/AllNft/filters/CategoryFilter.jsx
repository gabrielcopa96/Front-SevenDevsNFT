import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { filterByCategory, getCategory } from '../../../../../redux/actions';

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
        <select name="" id="" onChange={(e)=>handleChange(e)}>
            <option value="" >Filter by Category</option>
            {
                categories && categories.map(t=>{
                    return (
                        <option value={t._id}>{t.name}</option>
                    )
                })
            }
        </select>
    );
};

export default CategoryFilter;