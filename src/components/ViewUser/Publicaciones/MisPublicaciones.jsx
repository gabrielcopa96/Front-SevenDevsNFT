import React from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import contract from "../../Contract/Contrato-NFT/contracts/contract.json";

import { contratcToken } from "../../../redux/actions";
import Button from "../../shared/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

  const contract = useSelector((state) => state.contract);

  const navigate = useNavigate();

  const misNfts = nfts.filter(
    (x) => x.details.owner.username === user.username
  );

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        const contratoNft = nftContract.address; //// Aca almacenas el numero de contrato del NFT.

        dispatch(contratcToken(contratoNft));

        const tokenNft = await provider.getBlockNumber(); /// Aca almacenas el numero de Token del NFT.
        dispatch(contratcToken(tokenNft));

        console.log("Initialize payment");
        let nftTxn = await nftContract.mint(
          "0x41f532bED9dF43eb4895c4ddc9A756ED568E761d",
          1,
          {
            value: ethers.utils.parseEther("0.01"),
          }
        );
        console.log("Mining... please wait");
        await nftTxn.wait();
        console.log(`Mined, transaction hash: ${nftTxn.hash}`);
        alert("Contract and Token successfully created");
      } else {
        console.log("Ethereum object does not exit");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { uid } = user;

  const handleClick = () => {
    mintNftHandler();
    navigate("/home/createnft", { state: { contract } });
  };

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
            <Button
              title="CREATE NFT"
              onClick={() => handleClick()}
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
        {
          misNfts?.length > 0
          ? misNfts.map((x, y) => (
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
            price={x.price}
            description={x.description}
          />
          ))
          : <h1 style={{color: 'var(--secondFontColor)'}}>Actualmente no cuentas con nft en tu propiedad</h1>
        }
      </ContainerPublicaciones>
    </ContainerMisPublicaciones>
  );
};
