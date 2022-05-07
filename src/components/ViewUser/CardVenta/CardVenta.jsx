import React from "react";
import { UltimasVentas, ImgNft } from "../elements/StyleViewUser.jsx";

export const CardVenta = (props) => {
  const { title, tiempo, tipo } = props;
  return (
    <UltimasVentas>
      <ImgNft></ImgNft>
      <div>
        {/* <h3 style={{borderBottom: '1.2px solid var(--mainBackGroundButtonColor)'}}>{title}</h3> */}
        <h3>{title}</h3>
        <p style={{fontSize: '.9rem', color: 'var(--colorInfo)'}}>
          {tiempo} - {tipo}
        </p>
      </div>
    </UltimasVentas>
  );
};
