import styled from "styled-components";

const StyledInput = styled.input`
  background-color: var(--secondFontColor);
  border-radius: .3rem;
  width: ${(props) => props.width || "15%"};
  height: ${(props) => props.height || "38px"};
  // padding: .5rem 3rem;
  padding: ${(props) => props.padding || "0"};
  outline: none;
  border: none;
`;

export default function Input(props) {
  const { placeholder, value, type, name, label, onChange, onBlur, width, height, padding } = props;
  // const Format = () => (
  //   <StyledInput
  //     placeholder={placeholder}
  //     value={value}
  //     type={type}
  //     name={name}
  //     label={label}
  //     onChange={onChange}
  //     onBlur={onBlur}
  //     id={name}
  //   />
  // );
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      type={type}
      width={width}
      height={height}
      name={name}
      label={label}
      padding={padding}
      onChange={onChange}
      onBlur={onBlur}
      id={name}
    />
  )
  // return (
  //   <If
  //     condition={label}
  //     Then={
  //       <div>
  //         {label && (
  //           <label>
  //             {label}: 
  //             {<Format />}
  //           </label>
  //         )}
  //       </div>
  //     }
  //     Else={<Format />}
  //   />
  // );
}

// function If(props) {
//   const { condition, Then = null, Else = null, children = null } = props;
//   if (condition) {
//     if (children) return <>{children}</>;
//     else return <>{Then}</>;
//   } else {
//     if (Else) return <>{Else}</>;
//     return null;
//   }
// }
