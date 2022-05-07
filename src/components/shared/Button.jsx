import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  /* border: 1px solid ${(props) => props.color || "#23136e"}; */
  border: none;
  /* border: 1px solid ${(props) => props.color || "var(--mainBackGroundButtonColor)"}; */
  border-radius: .3rem;
  margin: ${(props) => props.margin || ".5rem 0 .8rem 0"};
  cursor: pointer;
  color: var(--secondFontColor);
  padding: ${(props) => props.padding || ".2rem 1.8rem"};

  font-weight: 600;
  font-size: 1rem;
  outline: none;
  /* background: ${(props) => props.color || "#23136e"}; */
  background: ${(props) => props.color || "var(--mainBackGroundButtonColor)"};
  /* border: 1px solid ${(props) => props.color || "#23136e"}; */
  /* background: ${(props) => props.color || "#6d6a799f"}; */
  display: flex;
  img {
      height: 20px;
  }

  &:hover{
      background: white;
      transition: all .9s ease;
      color: ${(props) => props.color || "var(--mainFontColor)"};
  }
`;

const iconDictionary = {
    search: "https://cdn-icons-png.flaticon.com/512/64/64673.png",
}

export default function Button(props) {
  const { title, color, icon, onClick, padding, width, margin } = props;
  return <StyledButton color={color} onClick={onClick} width={width} padding={padding} margin={margin}>
      {icon && <img src={iconDictionary[icon] }/>}
      {title}
      </StyledButton>;
}
