import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrg&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    padding: 30px;
    width: 37%;
    background-color: white;
    ${mobile({ width: "75%" })}
    border-radius: 10px;
`;

const Title = styled.h1`
    font-style: 20px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 12px 0;
    padding: 10px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 30%;
    padding: 12px 10px;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    font-style: 15px;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const Link = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`;

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form>
                    <Input
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleLogin} disabled={isFetching}>
                        LOG IN
                    </Button>
                    {error && <Error>Something went wrong</Error>}
                    <Link>Don't you remember your password?</Link>
                    <Link>Create a new acocunt</Link>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;
