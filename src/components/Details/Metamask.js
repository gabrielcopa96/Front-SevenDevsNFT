import React from "react";
import { ethers } from "ethers";
import axios from 'axios';
import Swal from 'sweetalert2'


 

   export const isMetamaskInstalledp = async () => {
    const { ethereum } = window;
    console.log(ethereum);
    if (!ethereum) {
      Swal.fire('Please Install Metamask!!!')
      //alert("Please Install Metamask!!");
    } else {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        //console.log("Provider: ", provider);
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "The User don't have an associated Wallet!!!!",
        
      })
      //alert("The User don't have an associated Wallet");
    }
  };

  export const payPurchase = async (wallet, transact) => {
    try{
    //var amount = "1.0";
    var amount = String(transact.amount);
    //var addressToTransfer = "0xa36c9F2B01077454Fc977a7393Da157538148c7F";
    var addressToTransfer = wallet;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const transaction = await signer.sendTransaction({
        to: addressToTransfer,
        value: ethers.utils.parseEther(amount)
    });
    Swal.fire('Buy Finished!!!')
    //alert('Buy Finished!!');
    console.log("Transaction: ", transaction);
    const register = saveTransaction(transact);

    

    return true;
  }
  catch(e){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "The Nft Owner don't have an associated Wallet!!!!",
      
    })
    //alert("The Nft Owner don't have an associated Wallet !!");
    return false;
    
  }
  };
  
 
  export const searchWalletAddress = async (id) => {
    try{
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      const address = (await axios.get(`https://sevendevs-backend.herokuapp.com/users/${id}`)).data.user.wallet;
      console.log(address);
    return address;
  }
  catch(e){
    alert('El usuario no tiene Wallet asociada');
    return false;
    
  }
  };


  
  export const saveTransaction = async (transaction) => {
    try{
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      const res = (await axios.post('https://sevendevs-backend.herokuapp.com/trans/',transaction)).data;
      console.log(res);
    return res;
  }
  catch(e){
    alert('Error al guardar transaccion!!');
    return false;
    
  }
  };

  export const putNft = async (idNft, details) => {
    try{
      console.log(idNft);
      console.log(details);
      console.log(localStorage.getItem('token'));
      axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('token'));
      //const token = localStorage.getItem('token');
      //console.log(token);
      const res= await axios.put(`https://sevendevs-backend.herokuapp.com/nft/${idNft}`,details);
      console.log(res.data);
      /* await axios.put(`https://sevendevs-backend.herokuapp.com/nft/${idNft}`,details, {
      headers: {
        Authorization: JSON.parse(token)
    }
})*/

      //console.log(res);
    //return res;
  }
  catch(e){
    alert('Sale Types Update Error!!');
    return false;
    
  }
  };
