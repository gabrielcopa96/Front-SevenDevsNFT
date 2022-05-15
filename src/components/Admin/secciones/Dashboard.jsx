import React, { useState } from "react";

import styles from "../admin.module.css";

import {
  BsFillPersonFill,
  BsKanbanFill,
  BsMinecart,
  BsGrid3X3GapFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const isOpen = useSelector((state) => state.open)

  const nfts = useSelector((state) => state.nfts)

  const users = useSelector((state) => state.users)



  return (
    <div className={isOpen === true ? styles.mainContent : styles.mainContentClose}>
      <main>
        <div className={styles.cards}>
          <div className={styles.cardSingle}>
            <div>
              <h1>{users.length}</h1>
              <span>Users</span>
            </div>
            <div>
              <span>
                <BsFillPersonFill />
              </span>
            </div>
          </div>
          <div className={styles.cardSingle}>
            <div>
              <h1>{nfts.length}</h1>
              <span>Publicaciones NFT</span>
            </div>
            <div>
              <span>
                <BsKanbanFill />
              </span>
            </div>
          </div>
          <div className={styles.cardSingle}>
            <div>
              <h1>124</h1>
              <span>Ofertados</span>
            </div>
            <div>
              <span>
                <BsMinecart />
              </span>
            </div>
          </div>
        </div>

        {/* <div className="recentFlex">
          <div className="projects">
            <div className="card">
              <div className="cardHeader"></div>

              <div className="cardBody"></div>
            </div>
          </div>

          <div className="customers"></div>
        </div> */} 
      </main>
    </div>
  );
};
