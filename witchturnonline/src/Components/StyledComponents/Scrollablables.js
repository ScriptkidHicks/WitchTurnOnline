import styled from "styled-components";

const StyledTurnContainer = styled.div`
  max-width: 400px;
  max-height: 1000px;
  overflow: scroll;

  display: flex;
  flex-direction: column;

  min-height: 300px;
  min-width: 300px;
  background-color: white;

  scrollbar-width: none;
  :webkit-scrollbar {
    display: none;
  }
`;

export { StyledTurnContainer };
