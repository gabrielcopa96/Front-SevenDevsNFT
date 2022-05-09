import React, {useState} from 'react';


const Metamask =()=>{
    const [account, setAccount]= useState();
    const [data, setdata] = useState({
        address: "",
        Balance: null,
      });
      console.log('Llegando a Metamask')
    if(window.ethereum){
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
        alert(" metamask extension installed!!")
        
      }else{
        alert("install metamask extension!!")
      }

      
      /*const getbalance = (address) => {
  
        // Requesting balance method
        window.ethereum
          .request({ 
            method: "eth_getBalance", 
            params: [address, "latest"] 
          })
          .then((balance) => {
            // Setting balance
            setdata({
              Balance: ethers.utils.formatEther(balance),
            });
          });
      }; */
    
      const accountChangeHandler = (account) => {
        // Setting an address data
        setAccount(account);
        //getBalance(account);

        };
      
      
      return(
        <div>
            Wallett Metamask

        </div>

      );
    


};




  export default Metamask;