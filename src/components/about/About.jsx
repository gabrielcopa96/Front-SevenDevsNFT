import React from 'react';
import styled from "styled-components"
import esteban from "../../assets/teamCards/esteban.png"
import gabriel from "../../assets/teamCards/gabriel.png"
import carolina from "../../assets/teamCards/carolina.png"
import andres from "../../assets/teamCards/andres.png"
import cesar from "../../assets/teamCards/cesar.png"
import alejandro from "../../assets/teamCards/alejandro.png"
import ignacio from "../../assets/teamCards/ignacio.png"
import TeamCards from './TeamCards';

const AboutUsComponent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px;
    color: var(--secondFontColor);
    .team-members{
        margin-left: 40px;
        margin-top: 40px;
    }
    .division{
        color: var(--secondFontColor);
        margin: 20px;
    }
`

const WhoWeAreContainer = styled.div`
    height: 500px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: var(--secondFontColor);
    margin-top: 150px;
    
    .img-container{
        margin-left: 20px;
        width: 50%;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-image: url("https://img.freepik.com/vector-gratis/fondo-concepto-token-no-fungible-nft-brillante_1017-36904.jpg?t=st=1652213617~exp=1652214217~hmac=b6cccc9a51b8d33a47c47c78595f77bf60660ca53532dd234b4d43125b5dc73d&w=1060");
        background-position-x: 50%;
        background-position-y: 40%;
        
    }
    .description-container{
        padding: 30px;
        width: 50%;
        justify-content: flex-end;
        align-items: center;
        gap: 20px;
    }

    @media (max-width: 800px){
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 800px;
        .img-container{
        padding: 20px;
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-position-x: 50%;
        background-position-y: 55%;
        
    }
    .description-container{
        padding: 20px;
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    }
`

const About = () => {


    const teamCards = [
        {
            name : "Esteban Puentes",
            img: esteban,
            linkedInProfile: "https://www.linkedin.com/in/raul-esteban-puentes-roldan-183600192/",
        },
        {
            name : "Gabriel Copa",
            img: gabriel,
            linkedInProfile: "https://www.linkedin.com/in/gabriel-copa-full-stack/",
        },
        {
            name : "Ignacio ",
            img: ignacio,
            linkedInProfile: "https://www.linkedin.com/in/jorge-ignacio-burgos/",
        },
        {
            name : "Cesar Galeano",
            img: cesar,
            linkedInProfile: "https://www.linkedin.com/in/cesargaleanotorres/",
        },
        {
            name : "Alejandro Cardenas",
            img: alejandro,
            linkedInProfile: "https://www.linkedin.com/in/alejandro-cardenas-7746b144/",
        },
        {
            name : "Carolina Leoni",
            img: carolina,
            linkedInProfile: "https://www.linkedin.com/in/carolina-maria-leoni-022438132/",
        },
        {
            name : "Andres Higuita",
            img: andres,
            linkedInProfile: "https://www.linkedin.com/in/edwinandreshiguita/",
        },

    ]


    return (
        <AboutUsComponent className='about-us-component'>

            <WhoWeAreContainer className='who-we-are-container'>
                <div className='img-container'>
                </div>
                <div className='description-container'>
                    <h1>Who we are</h1>
                    <p>7devNFT was born from an initiave of continuously looking to be the most reliable platform in the market by 
                        provinding the quickest and the most secure transactions, our mission is to take financially freedom to any person 
                        that has a computer at home by investing in NFT just with few clicks of a mouse and this is not the end we also strive
                         to give to our users liberty on creating personalized NFTs where you can choose the desing and publish your own NFT to be
                          sold not only with a fixed price but also to be auctioned</p>
                </div>
            </WhoWeAreContainer>
            <h1 className='team-members'>Team Members</h1>
            <hr className='division'/>
            <TeamCards teamCardsArray={teamCards}/>
            
        </AboutUsComponent>

    );
};

export default About;