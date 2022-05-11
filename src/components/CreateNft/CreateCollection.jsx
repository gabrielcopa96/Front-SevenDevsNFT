import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {putImageNft} from '../../redux/actions'

export const CreateCollection = () => {

//  const imagen = useSelector((state) => state.img)


 const token = localStorage.getItem("token")

 const [imageSelected, setImageSelected] = useState()
 
    const dispatch = useDispatch();
// useEffect(() => {
//     // dispatch(putImageNft(token))
// }, [])

    const formData = new FormData();
    formData.append('img', imageSelected);


    function handlePruebaUpdate() {
        // e.preventDefault();
        dispatch(putImageNft(token, formData));
    }

  return (
  <div style={{margin: "7.5rem auto", width: "70%"}}>
      <h1 style={{color: "white"}}>Hola mundo</h1>

      <p style={{color: "white"}}>Prueba de modificacion de imagen</p>
      <input type="file" onChange={ e => setImageSelected(e.target.files[0])} style={{color: "white"}}/>
      <button onClick={handlePruebaUpdate}>Upload Image</button>
      </div>
  );
};
