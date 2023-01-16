import styled from "styled-components";
import { DarkColorStyles } from "./ColorStyles";

const CenterAlignedFlexPage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0;
  overflow: scroll;

  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : DarkColorStyles.DeepBackgroundPurple};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export { CenterAlignedFlexPage };
