import React from "react";
import { ethers } from "ethers";
import axios from 'axios';

 

 export const isMetamaskInstalled = async () => {
    const { ethereum } = window;
    console.log(ethereum);
    if (!ethereum) {
      alert("Please Install Metamask!!");

    } else {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Found an Account! Address: ", accounts[0]);
        return accounts[0];
      } catch (e) {
        console.log(e);
      }
    }
  };

  export const isMetamaskInstalledp = async () => {
    const { ethereum } = window;
    console.log(ethereum);
    if (!ethereum) {
      alert("Please Install Metamask!!");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const acco = (await provider.send("eth_requestAccounts", []))[0];
        console.log("Account: ", acco);
        return acco;
        
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  };

  export const saldoWallet = async () => {
    try{
    const {ethereum} = window
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    var balance = await provider.getBalance(accounts[0])
    var saldo = ethers.utils.formatEther(balance)
    console.log("Wallet Balance: ",saldo);  
    return Number(saldo);
    }
    catch(e){
      console.log(e);
    }
  };

  export const payPurchase = async (am, wallet) => {
    try{
    var amount = String(am);
    var addressToTransfer = wallet;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const transaction = await signer.sendTransaction({
        to: addressToTransfer,
        value: ethers.utils.parseEther(amount)
    });
    alert('Buy Finished!!');
    console.log("Transaction: ", transaction);
    return true;
  }
  catch(e){
    alert('Error!!');
    return false;
    
  }
  };
  
 
  export const searchWalletAddress = async (id) => {
    try{
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      const address = (await axios.get(`http://localhost:4000/users/${id}`)).data.wallet;
      console.log(address);
    return address;
  }
  catch(e){
    alert('Error!!');
    return false;
    
  }
  };
  