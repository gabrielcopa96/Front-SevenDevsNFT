import React, { useEffect, useState } from "react";

import styles from "./admin.module.css";

import { Link } from "react-router-dom";

import imagenPerfil from "../../assets/azuki-nft.gif";
import logo from "../../assets/logo.png";

import { setModalOpening } from "../../redux/actions";

import { BsFillBarChartFill, BsGrid3X3, BsGrid } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export const MenuAdmin = () => {
  const isOpen = useSelector((state) => state.open);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [active, setActive] = useState({
    dashboard: true,
    tables: false,
  });

  useEffect(() => {
      dispatch(setModalOpening(true));
  }, [dispatch]);

  // console.log(isOpen);

  const handleOpen = () => {
    if (isOpen === true) {
      dispatch(setModalOpening(false));
      // setIsOpern(false)
    }
    if (isOpen === false) {
      dispatch(setModalOpening(true));
      // setIsOpern(true)
    }
  };

  const handleClickActive = (e) => {
    if (e.target.id === "dashboard") {
      setActive({ tables: false, dashboard: true });
    }
    if (e.target.id === "tables") {
      setActive({ tables: true, dashboard: false });
    }
  };

  return (
    <div>
      <div className={isOpen === true ? styles.sidebar : styles.sidebarClose}>
        <div className={styles.sidebarBrand}>
          <Link to={`/home`}>
            <img
              src={logo}
              width="200px"
              height="78px"
              className={isOpen === true ? styles.logo : styles.logoClose}
            />
          </Link>
        </div>

        <div
          className={
            isOpen === true ? styles.sidebarMenu : styles.sidebarMenuClose
          }
        >
          <ul>
            <li>
              <Link
                to={"/admin/menuadmin/dashboard"}
                className={active.dashboard === true ? styles.active : null}
                id="dashboard"
                style={{ display: "flex" }}
                onClick={(e) => handleClickActive(e)}
              >
                <span id="dashboard">
                  <BsFillBarChartFill id="dashboard" />
                </span>{" "}
                <p id="dashboard">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                to={"admin/menuadmin/tables"}
                style={{ display: "flex" }}
                className={active.tables === true ? styles.active : null}
                id="tables"
                onClick={(e) => handleClickActive(e)}
              >
                <span id="tables">
                  <BsGrid3X3 id="tables" />
                </span>
                <p id="tables">Tables</p>
              </Link>
            </li>
            {/* <li>
              <a href="#">
                {" "}
                <span>
                  <BsFillPersonFill />{" "}
                </span>
                Users
              </a>
            </li> */}
          </ul>
        </div>
      </div>
      <div
        className={
          isOpen === true ? styles.mainContent : styles.mainContentClose
        }
      >
        <header
          className={isOpen === true ? styles.header : styles.headerClose}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span onClick={() => handleOpen()}>
              <BsGrid
                style={{ width: "30px", height: "30px", marginTop: ".4rem" }}
              />
            </span>
            <h1>Menu Admin</h1>
          </div>

          <div className={styles.userWrapper}>
            <img src={user.image} alt="foto" widht="45px" height="45px" />
            <div>
              <h4>{user.username}</h4>
              <small>Admin</small>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
