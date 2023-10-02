import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicUrl } from "../requestMethods";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrg&dpr=2&h=650&w=940")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    padding: 30px;
    width: 47%;
    background-color: white;
    ${mobile({ width: "75%" })}
    border-radius: 10px;
`;

const Title = styled.h1`
    font-style: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
    font-size: 15px;
`;

const Agreement = styled.span`
    font-style: 12px;
    margin: 20px 0;
`;

const Button = styled.button`
    width: 40%;
    padding: 15px 20px;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Error = styled.span`
    margin-top: 5px;
    color: red;
`;

const Register = () => {
    const history = useNavigate();
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password === confirmPass) {
            setError(false);
            try {
                const res = await publicUrl.post("/auth/register", { username, email, password });
                setError2(false);
                console.log(res.data);
                history("/login");
            }
            catch (err) {
                setError2(true);
                console.log(err);
            }
        }
        else {
            setError(true);
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="First Name" type="text" />
                    <Input placeholder="Last Name" type="text" />
                    <Input placeholder="Username" type="text" onChange={(e) => setUserName(e.target.value)} />
                    <Input placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Input placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPass(e.target.value)} />
                    <Agreement>
                        By creating an account, I consent to the processing of
                        my personal data in accordance with the{" "}
                        <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={handleRegister}>CREATE</Button>
                </Form>
                {error && <Error>Passwords donot match</Error>}
                {error2 && <Error>Something went wrong</Error>}
            </Wrapper>
        </Container>
    );
};

export default Register;
