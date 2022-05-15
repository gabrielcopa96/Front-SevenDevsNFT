import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../services/authService";
import { getTokenUser, removeUser } from "../../redux/actions/index";
import Button from "../shared/Button";
import { IoIosLogOut } from "react-icons/io";
import { FaUserCircle, FaInfoCircle, FaBuffer } from "react-icons/fa";
import Logo from "../../assets/logo.png";

import Swal from "sweetalert2";

import 'sweetalert2/dist/sweetalert2.css'

import styles from './Header.module.css';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  align-items: center;
  background-color: #46198f47;
  justify-content: space-between;
  height: 85px;
  max-width: 100vw;
  width: 100%;
  padding: 10px 25px;
  margin-bottom: 1.5rem;
  color: var(--secondFontColor);
  font-size: 18px;
  flex-wrap: wrap;
  a {
    color: white;
    text-decoration: none;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: 3.8rem;
  img {
    height: 70px;
    width: auto;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 4.5rem;
  list-style: none;
  a {
    &:hover {
      text-decoration-line: underline;
      text-decoration-thickness: 3px;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin: 0 auto;
  }
`;

const ContainerItemsMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100px;
  margin-right: 35px;
  height: 45px;
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);

  const jwt = localStorage.getItem("token");

  const [isActive, setActive] = useState(false);

  const instanCallback = useCallback(dispatch, [dispatch]);

  useEffect(() => {
    if (jwt) {
      instanCallback(getTokenUser(jwt));
    }
  }, [jwt, instanCallback]);

  const handleClick = () => {
    isActive ? setActive(false) : setActive(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    authService.logut();
    dispatch(removeUser());
  };

  function handleLogoClick(e) {
    navigate("/home");
  }

  return (
    <StyledNav>
      <LogoContainer onClick={(e) => handleLogoClick(e)}>
        <img src={Logo} alt="not found" />
      </LogoContainer>
      {(jwt && userData?.user_type?.name === "admin") ? (
         <>
         <div className={`${styles.navigation} ${isActive ? `${styles.active}` : ""}`}>
           <div className={styles.userBox}>
             <div className={styles.imageBox}>
               <img src={userData.image} alt="foto-1" />
             </div>
             <p className={styles.username}>{userData.username}</p>
           </div>
           <div className={styles.menuToggle} onClick={(e) => handleClick(e)}>
             <ul className={styles.menu}>
               <li>
                 <ContainerItemsMenu>
                   <FaUserCircle style={{ width: "22px", height: "42px" }} />
                   <Link to={`/admin/menuadmin`}>Admin</Link>
                 </ContainerItemsMenu>
               </li>
               <li>
                 <ContainerItemsMenu>
                   <FaInfoCircle style={{ width: "22px", height: "42px" }} />
                   <Link to={"/about"}>About</Link>
                 </ContainerItemsMenu>
               </li>
               <li>
                 <ContainerItemsMenu>
                 <FaBuffer style={{ width: "22px", height: "42px" }} />
                   <Link to={"/home/collections/"} style={{marginLeft: "1rem"}}>Collections</Link>
                 </ContainerItemsMenu>
               </li>
               <li>
                 <ContainerItemsMenu>
                   <IoIosLogOut style={{ width: "22px", height: "42px" }} />
                   <Link to="/home" onClick={handleLogout}>
                     Logout
                   </Link>
                 </ContainerItemsMenu>
               </li>
             </ul>
           </div>
         </div>
       </>
      ) 
      : jwt 
      ? (
        <>
          <div className={`${styles.navigation} ${isActive ? `${styles.active}` : ""}`}>
            <div className={styles.userBox}>
              <div className={styles.imageBox}>
                <img src={userData.image} alt="foto-1" />
              </div>
              <p className={styles.username}>{userData.username}</p>
            </div>
            <div className={styles.menuToggle} onClick={(e) => handleClick(e)}>
              <ul className={styles.menu}>
                <li>
                  <ContainerItemsMenu>
                    <FaUserCircle style={{ width: "22px", height: "42px" }} />
                    <Link to={`/myprofile/${userData.uid}`}>Profile</Link>
                  </ContainerItemsMenu>
                </li>
                <li>
                  <ContainerItemsMenu>
                    <FaInfoCircle style={{ width: "22px", height: "42px" }} />
                    <Link to={"/about"}>About</Link>
                  </ContainerItemsMenu>
                </li>
                <li>
                  <ContainerItemsMenu>
                  <FaBuffer style={{ width: "22px", height: "42px" }} />
                    <Link to={"/home/collections/"} style={{marginLeft: "1rem"}}>Collections</Link>
                  </ContainerItemsMenu>
                </li>
                <li>
                  <ContainerItemsMenu>
                    <IoIosLogOut style={{ width: "22px", height: "42px" }} />
                    <Link to="/home" onClick={handleLogout}>
                      Logout
                    </Link>
                  </ContainerItemsMenu>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <ButtonsContainer>
            <Link to={"/home"}>Home</Link>
            <Link
              to={"/about"}
            >
              About
            </Link>
            <Link
              to={"/home/collections/"}
            >
              Collections
            </Link>
            <Button title={"LOGIN"} onClick={() => navigate("/home/login")} />
            <Button
              title={"REGISTER"}
              onClick={() => navigate("/home/register")}
            />
          </ButtonsContainer>
        </>
      )}
    </StyledNav>
  );
}

export default Header;
