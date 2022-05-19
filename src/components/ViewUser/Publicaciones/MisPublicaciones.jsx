import React, { useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import contract from "../../Contract/Contrato-NFT/contracts/contract.json";

import Swal from "sweetalert2";

import Button from "../../shared/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CardsMisPublicaciones } from "./CardsMisPublicaciones.jsx";

const contractAddress = "0x301e98022EcccA30a656bC090C0342044cb81bC6";

const abi = contract.abi;

const ContainerMisPublicaciones = styled.div`
  width: 65%;
  margin: 7.5rem auto 2.5rem auto;
  color: var(--secondFontColor);
`;

const ContainerHeaderPublicaciones = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContainerPublicaciones = styled.div`
  width: 100%;
  border-radius: 0.3rem;
  padding: 0.6rem 0;
  margin: 2rem auto 0 auto;
  background-color: #181e5553;
`;

export const MisPublicaciones = () => {
  const nfts = useSelector((state) => state.nfts);

  const user = useSelector((state) => state.user);

  const contracts = useSelector((state) => state.contrato);

  const [dataContract, setDataContract] = useState({
    bol: true,
    contract_address: null,
    token_id: null,
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const misNfts = nfts.filter(
    x => x?.details !== undefined ? x.details.owner.username === user.username : null
    // (x) => x.details?.owner?.username === user.username
  );

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        const contratoNft = nftContract.address; // Aca almacenas el numero de contrato del NFT.
        const tokenNft = await provider.getBlockNumber(); /// Aca almacenas el numero de Token del NFT.

        // const obj1 = { contract_address: contratoNft, token_id: tokenNft };
        console.log("Initialize payment");

        let nftTxn = await nftContract.mint(
          "0x41f532bED9dF43eb4895c4ddc9A756ED568E761d",
          1,
          {
            value: ethers.utils.parseEther("0.01"),
          }
        );
        console.log(`token ${tokenNft}`);
        console.log(`contrato ${contratoNft}`);
        console.log("Mining... please wait");
        await nftTxn.wait();
        console.log(`Mined, transaction hash: ${nftTxn.hash}`);

        const obj1 = [contratoNft, tokenNft];

        Swal.fire({
          title: "Contract and Token created successfully",
          icon: "success",
          timer: 3200,
        });
        navigate("/home/createnft", { state: { obj1 } });
      } else {
        console.log("Ethereum object does not exit");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { uid } = user;

  return (
    <ContainerMisPublicaciones>
      <>
        <ContainerHeaderPublicaciones>
          <h2>My Posts</h2>
          <div style={{ display: "flex", gap: "2rem" }}>
            <Button
              title="BACK"
              onClick={() => navigate(`/myprofile/${uid}`)}
            />
            <Button title="CREATE NFT" onClick={() => mintNftHandler()} />
            <Button
              title="CREATE COLLECTION"
              onClick={() => navigate("/home/creationcollection")}
            />
          </div>
        </ContainerHeaderPublicaciones>
        <hr
          style={{
            borderColor: "var(--mainBackGroundButtonColor)",
            backgroundColor: "var(--mainBackGroundButtonColor)",
          }}
        />
      </>
      <ContainerPublicaciones>
        {misNfts?.length > 0 ? (
          misNfts.map((x, y) => (
            <CardsMisPublicaciones
              id={x._id}
              key={y}
              category={x.category.name}
              currencies={x.currencies.name}
              imgCurrencies={x.currencies.image}
              contract={x.details.contract_address}
              image={x.image}
              name={x.name}
              sales={x.sales_types.name}
              salesid={x.sales_types._id}
              file={x.files_types.name}
              price={x.price}
              description={x.description}
            />
          ))
        ) : (
          <h2 style={{ color: "var(--secondFontColor)", textAlign: "center" }}>
            You currently do not have nft on your property
          </h2>
        )}
      </ContainerPublicaciones>
    </ContainerMisPublicaciones>
  );
};
