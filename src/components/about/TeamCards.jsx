import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  height: 500px;
  color: var(--secondFontColor);

  a {
    text-decoration: none;
    color: var(--secondFontColor);
  }

  .team-card-container {
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
  }

  @media (max-width: 800px) {
    height: 700px;
  }
  @media (max-width: 520px) {
    height: 1300px;
  }
`;

const TeamCards = (props) => {
  const { teamCardsArray } = props;

  console.log(teamCardsArray);

  return (
    <CardContainer>
      {teamCardsArray?.map((teamMember) => (
        <div className="team-card-container">
          <img src={teamMember.img} alt="Team member" />
          <a href={teamMember.linkedInProfile}>
            <p>{teamMember.name}</p>
          </a>
        </div>
      ))}
    </CardContainer>
  );
};

export default TeamCards;
