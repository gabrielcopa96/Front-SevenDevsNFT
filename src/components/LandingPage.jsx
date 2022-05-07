import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import fondo1 from '../assets/img-landing/landing-op1.jpg';
import logo from '../assets/logo.png';

function LandingPage() {
    
    return (
        <>  
            <BackImage >
            <LogoImage src={logo} />
            <Title>
            <h1>The Best Site for Buy and Sell NFT Collections</h1>
            <h4>The day is today, Make your Buy and Sell transactions of your NFT's in the next best NFT platform. What are you waiting for? Let's Go...</h4>
            </Title>
            <Link to={'/home'}><ButtonL>GO</ButtonL></Link>
                
            </BackImage>
        </>
            
            
        
    );
}

const BackImage = styled.div`
width:100%;
height:100%;
background-position:top;
background-size: cover ;
background-repeat:no-repeat;
background-image: url(${fondo1}); 
position: absolute ;
top: 0%;
left:0%;
`
const LogoImage = styled.img`
height: 40%;
position: absolute;
top:10%;
left:5%;

@media (max-width: 768px) {
    height: 20%;
    
    
  }

`;

const Title = styled.div`
width: 30%;
text-align: justify;
color: white;
position: absolute;
top: 40%;
left: 10%;
 

@media (max-width: 768px) {
    font-size: 10px;
    position: absolute;
    top: 25%;
    left: 7%;
    
  }

`;

const ButtonL = styled.button`
  background-color: transparent;
  border: solid 1px white;
  border-radius: 20px;
  cursor: pointer;
  color: var(--secondFontColor);
  padding: ".2rem 1.8rem";
  font-weight: 600;
  font-size: 2rem;
  outline: none;
  position: absolute;
top:70%;
left:10%;
width: 20%;
height: 40px;
line-height:40px;
 
&:hover{
    background-color: white;
    color: #a945c7;
    box-shadow: 0 0 10px #a945c7, 0 0 10px #a945c7, 0 0 60px #a945c7;
}

@media (max-width: 768px) {
    font-size: 15px;
    position: absolute;
    top: 50%;
    left: 7%;
}
  
`;

export default LandingPage;