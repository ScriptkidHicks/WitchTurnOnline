import styled from "styled-components";

const DefaultPageBody = styled.div`
display: flex;
flex-direction: column;
background-color: white;
justify-content: space-between;
align-items: center;
`;

/* Styled Generics */

const StyleableButton = styled.button`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#d1d1d1'};
    width: ${props => props.width? props.width : '40px'};
    height: ${props => props.height? props.height : '40px'};
    border: ${props => props.border? props.border : '2px solid black'};
    color: ${props => props.fontColor ? props.fontColor : 'black'};
    box-shadow: ${props => props.boxShadow? props.boxShadow : 'none'};
    transition: ${props => props.transition? props.transition : 'none'};

    :hover {
        box-shadow: ${props => props.hoverBoxShadow ? props.hoverBoxShadow : 'none'};
        background-color: ${props => props.hoverBackgroundColor ? props.hoverBackgroundColor : (props.backgroundColor ? props.backgroundColor : '#d1d1d1')};
    }
`;

export {DefaultPageBody, StyleableButton};