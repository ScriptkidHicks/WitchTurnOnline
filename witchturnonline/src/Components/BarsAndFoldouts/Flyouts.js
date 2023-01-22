import styled from "styled-components";
import { DarkColorStyles } from "../StyledComponents/ColorStyles";

const StyledCopyFlyout = styled.div`
  background-color: ${DarkColorStyles.GreyPurpleForeground};
  padding: 10px;
  border: 3px solid ${DarkColorStyles.LightPurpleForeground};

  border-radius: ${(props) =>
    props.left ? "10px 0px 0px 10px" : "0px 10px 10px 0px"};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  position: absolute;
  right: ${(props) => (props.open ? "-4px" : "-200px")};
  top: 150px;
  transition: ease all 0.4s;
`;

export { StyledCopyFlyout };
