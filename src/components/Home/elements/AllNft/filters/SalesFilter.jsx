import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { filterBySaleWay, getSalesType } from '../../../../../redux/actions';

const SalesFilter = () => {
    const dispatch = useDispatch()
    const sales_type = useSelector(state=> state.sales_type)

    useEffect(()=>{
        dispatch(getSalesType())
    },[])

    function handleChange(e){
        const id = e.target.value
        console.log(id)
        dispatch(filterBySaleWay(id))
    }

    return (
        <select name="" id="" onChange={(e)=>handleChange(e)}>
            <option value="" >Filter by Sale method</option>
            {
                sales_type && sales_type.map(t=>{
                    return (
                        <option value={t._id}>{t.name}</option>
                    )
                })
            }
        </select>
    );
};

export default SalesFilter;