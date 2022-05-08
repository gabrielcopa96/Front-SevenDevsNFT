import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import { filterByFileType, getFileTypes } from '../../../../../redux/actions';

const FilesTypeFilter = () => {
    const dispatch = useDispatch()
    const file_types = useSelector(state=> state.file_types)

    useEffect(()=>{
        dispatch(getFileTypes())
    },[])

    function handleChange(e){
        const id = e.target.value
        console.log(id)
        dispatch(filterByFileType(id))
    }

    return (
        <select name="" id="" onChange={(e)=>handleChange(e)}>
            <option value="" >Filter by File Type</option>
            {
                file_types && file_types.map(t=>{
                    return (
                        <option value={t._id}>{t.name}</option>
                    )
                })
            }
        </select>
    );
};

export default FilesTypeFilter;