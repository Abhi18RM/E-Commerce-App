import React from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { mobile } from "../responsive";

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`;
const Description = styled.p`
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 300;
    ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: "80%" })}
`;
const Input = styled.input`
    border: none;
    outline: none;
    flex: 8;
    padding-left: 20px;
    font-size: 15px;
`;
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>
                Get timely updates about your favorite products.
            </Description>
            <InputContainer>
                <Input placeholder="Email" />
                <Button>
                    <SendIcon />
                </Button>
            </InputContainer>
        </Container>
    );
};

export default Newsletter;
