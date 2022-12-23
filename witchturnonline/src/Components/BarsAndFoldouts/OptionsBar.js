import { useState } from "react";
import styled from "styled-components";

function OptionsBar(props){

    const [barOpen, setBarOpen] = useState(false);

    return <div>
        <MenuFoldButton onClick={() => {setBarOpen(!barOpen)}}></MenuFoldButton>
        {barOpen && <MenuDiv></MenuDiv>}
    </div>
}

export default OptionsBar;

const MenuFoldButton = styled.button`
    background-color: #f1f1f1;
    border: 1px solid black;
    width: 40px;
    height: 40px;
`;

const MenuDiv = styled.div`
    height: 100%;
    width: 60px;
    background-color: wheat;
`;

