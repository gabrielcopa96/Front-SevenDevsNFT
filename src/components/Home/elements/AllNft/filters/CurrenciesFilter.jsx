import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { filterByCurrencies, getCurrencies } from '../../../../../redux/actions';

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
        <select name="" id="" onChange={(e)=>handleChange(e)}>
            <option value="" >Filter by Currency</option>
            {
                currencies && currencies.map(t=>{
                    return (
                        <option value={t._id}>{t.name}</option>
                    )
                })
            }
        </select>
    );
};

export default CurrenciesFilter;