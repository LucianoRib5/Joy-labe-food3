import styled from "styled-components";
import React from "react";
import { Card } from "@material-ui/core";

export const MainContainer = styled.div` 
width: 100vw;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`

export const ContainerCards = styled(Card)`
width: 90%;
margin: 10px;
`

export const ContainerContent = styled.div ` 
display: flex;
justify-content: space-between;
height: 40px;
padding: 15px;
`
export const Info = styled.p` 
color: gray;
padding: 5px
`
