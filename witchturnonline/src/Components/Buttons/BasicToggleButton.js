import styled from "styled-components";

function BasicToggleButton(props){
    return <BasicToggle onClick={() => props.setVariable(!variable)}></BasicToggle>
}

export default BasicToggleButton;

const BasicToggle = styled.div``;