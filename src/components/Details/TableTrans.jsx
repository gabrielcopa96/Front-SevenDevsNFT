import React from "react";

export const TableTrans = (props) => {
  const { id, amount, date, curr, nftId, transactiontype, name, price } = props;
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{amount} {curr}</td>
        <td style={{letterSpacing: "1.5px"}}>{date}</td>
        <td style={{letterSpacing: "1.5px"}}>{transactiontype}</td>
      </tr>
    </>
  );
};
