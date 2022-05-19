import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Timer = ({ startDate, finishDate, setTimerItems }) => {
  const dateTarget = new Date(finishDate);
  const now = new Date();

  const ms1s = 1000;
  const ms1m = ms1s * 60;
  const ms1h = ms1m * 60;
  const ms1d = ms1h * 24;

  console.log(startDate);
  console.log(dateTarget);
  console.log(now);

  const duration = dateTarget - now;
  const days = Math.floor(duration / ms1d);
  const hours = Math.floor((duration % ms1d) / ms1h);
  const min = Math.floor((duration % ms1h) / ms1m);
  const sec = Math.floor((duration % ms1m) / ms1s);
  if (days >= 0 && hours >= 0 && min >= 0 && sec >= 0) {
    console.log(days);
    console.log(hours);
    console.log(min);
    console.log(sec);

    setTimeout(() => {
      setTimerItems({ days, hours, min, sec });
    }, 1000);
  } else {
    return <p>Oferta Finalizada</p>;
  }

  return (
    <TimeContainer>
      <TimeItem>
        <h2>{days}</h2>
        <p>Days</p>
      </TimeItem>
      <TimeItem>
        <h2>{hours}</h2>
        <p>Hours</p>
      </TimeItem>
      <TimeItem>
        <h2>{min}</h2>
        <p>Min</p>
      </TimeItem>
      <TimeItem>
        <h2>{sec}</h2>
        <p>Sec</p>
      </TimeItem>
    </TimeContainer>
  );
};

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 20px;
`;

const TimeItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 50px;
  height: 60px;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: solid 1px white;
`;

export default Timer;
