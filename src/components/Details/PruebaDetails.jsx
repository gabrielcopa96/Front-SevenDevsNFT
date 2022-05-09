// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import axios from "axios";
// import styled, { css, keyframes } from "styled-components";
// import { HiShare } from "react-icons/hi";
// import { FcLike } from "react-icons/fc";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// import { SiEthereum } from "react-icons/si";
// import { BsFillSuitHeartFill } from "react-icons/bs";
// import { getAllNft } from "../../redux/actions";
// import Timer from "./Timer";
// import imgAudio from "../../assets/nft-audio.jpg";
// import imgVideo from "../../assets/azuki-nft.gif";
// import Metamask from "./Metamask.jsx";

// const ContainerManDetails = styled.div`
//   width: 90%;
//   margin: 7.5rem auto 2rem auto;
//   display: grid;
//   grid-template-columns: 30% 70%;
// `;

// const ContainerDataIzquierda = styled.div`
//   width: 95%;
//   display: grid;
//   grid-template-rows: 1fr 1fr;
//   align-items: center;
// `;

// const ContainerImgDetails = styled.div`
//     width: 100%;
//     height: 380px;
//     background-image: url(${(props) => props.image});
//     border-radius: 0.5rem;
// `;

// const ImgDetails = (props) => {
//     const {imagen} = props
//     return (
//         <ContainerImgDetails imagen={imagen} />
//     )
// }

// export const PruebaDetails = () => {
//   const location = useLocation();
//   const idNft = location.pathname.split("/")[2];
//   const cards = useSelector((state) => state.nfts);
//   const dispatch = useDispatch();
//   const [like, setLike] = useState(false);
//   const [infoTimer, setInfoTimer] = useState({ startDate: "", finishDate: "" });
//   const [timerEnabled, setTimerEnabled] = useState(false);
//   const [timerItems, setTimerItems] = useState({ d: "", h: "", m: "", s: "" });
//   const [offers, setOffers] = useState([]);
//   const nft = cards.filter((item) => item._id === idNft);
//   const [cantLikes, setCantLikes] = useState(nft[0].likes);
//   const [errors, setErrors] = useState({ auction: "false" });
//   const [visibledisabled, setVisibleEnabled] = useState({
//     description: false,
//     details: false,
//   });

//   useEffect(() => {
//     if (nft[0].sales_types.name === "Live Auction") {
//       axios.defaults.headers.common["Authorization"] =
//         localStorage.getItem("token");
//       axios
//         .get(`http://localhost:4000/offer/${idNft}`)

//         .then((res) => {
//           if (res.data.getAuction.startDate && res.data.getAuction.finishDate) {
//             setInfoTimer({
//               startDate: res.data.getAuction.startDate,
//               finishDate: res.data.getAuction.finishDate,
//             });
//             setTimerEnabled(true);
//             setOffers(res.data.offers);
//           }
//         })
//         .catch((e) => {
//           setErrors({ ...errors, auctions: true });
//           setTimerEnabled(false);
//         });
//     }
//     console.log("Nft no esta en Subasta");
//     // dispatch(getAllNft())
//   }, []);

//   useEffect(() => {
//     dispatch(getAllNft);
//   }, [like, cantLikes]);

//   const handleClick = (e) => {
//     if (nft[0].hasOwnProperty("likes")) {
//       like ? setCantLikes(cantLikes - 1) : setCantLikes(cantLikes + 1);
//       console.log(cantLikes);
//       axios.defaults.headers.common["Authorization"] =
//         localStorage.getItem("token");
//       axios
//         .put(`http://localhost:4000/nft/${nft[0]._id}`, { likes: cantLikes })
//         .then((res) => console.log(res.data));
//       setLike(!like);
//     }
//   };

//   const handleVisibleDescripcionClick = () => {
//     setVisibleEnabled({
//       ...visibledisabled,
//       description: !visibledisabled.description,
//     });
//   };
//   const handleVisibleDetailsClick = () => {
//     setVisibleEnabled({
//       ...visibledisabled,
//       details: !visibledisabled.details,
//     });
//   };

//   const handlePayClick = () => {
//     console.log("Entrando a Click");
//     return <Metamask />;
//   };


// //   const handlePhotos = () => {
// //       if(nft.files_types.name === "Image"){
// //           return i
// //       }
// //   }

//   return (
//     <ContainerManDetails>
//       <ContainerDataIzquierda>
//         <ImgDetails 
//             imagen={

//             }
//         />
//       </ContainerDataIzquierda>
//     </ContainerManDetails>
//   );
// };
