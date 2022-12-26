import styled from "styled-components";

function BasicToggleButton(props){
    return (
    <BasicToggle 
        onClick={() => {
            console.log(props.fontColor);
            props.setVariable(!props.variable)}}
        backgroundColor={props.backgroundColor}
        width={props.width}
        height={props.height}
        border={props.border}
        >
            {props.text}
    </BasicToggle>);
}

export default BasicToggleButton;

const BasicToggle = styled.div`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#d1d1d1'};
    width: ${props => props.width? props.width : '40px'};
    height: ${props => props.height? props.height : '40px'};
    border: ${props => props.border? props.border : '2px solid black'};
    color: ${props => props.fontColor ? props.fontColor : 'black'};
`;