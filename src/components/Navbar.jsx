import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from "../redux/apiCalls";
import { FaBox } from "react-icons/fa"


const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Language = styled.span`
    font-style: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;
const Input = styled.input`
    border: none;
    outline: none;
    ${mobile({ width: "50px" })}
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "flex-end", marginRight: "12px" })}
`;
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 12px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const WelcomeTag = styled.p`
    margin-right: 15px;
    ${mobile({ display: "none" })}
`
const RightIcon = styled.div`
    margin-left: 10px;
`

const Navbar = () => {
    const cartQuantity = useSelector((state) => state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        logOut(dispatch);
    }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <SearchIcon style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                        <Logo>ABHI.</Logo>
                    </Link>
                </Center>
                <Right>
                    {
                        !user ? (
                            <>
                                <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                                    <MenuItem>REGISTER</MenuItem>
                                </Link>
                                <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                    <MenuItem>SIGN IN</MenuItem>
                                </Link>
                            </>
                        ) :
                            (
                                <>
                                    <WelcomeTag>Hello, {user.username}</WelcomeTag>
                                    <LogoutIcon style={{ cursor: "pointer" }} onClick={handleLogOut} />
                                    <RightIcon>
                                        <Link to="/orders" style={{ cursor: "pointer", color: "black", display: "flex", fontSize: "18px" }}>
                                            <FaBox />
                                        </Link>
                                    </RightIcon>
                                </>
                            )
                    }
                    <Link to="/cart" style={{ color: "black" }}>
                        <MenuItem>
                            <Badge badgeContent={cartQuantity} color="primary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
