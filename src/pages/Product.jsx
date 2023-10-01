import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from ".././components/Navbar";
import Announcement from ".././components/Announcement";
import Newsletter from ".././components/Newsletter";
import Footer from ".././components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicUrl } from "../requestMethods.js";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: contain;
    ${mobile({ height: "40vh", objectFit: "contain" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 400;
`;

const Description = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 400;
    font-size: 30px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-style: 20px;
    font-weight: 200;
    margin-right: 10px;
    font-size: 17px;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin-right: 10px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background: white;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    &:hover {
        background-color: #f8f4f4;
    }
`;

const Product = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    const handleQuantity = (str) => {
        if (str === "inc") {
            setQuantity(quantity + 1);
        } else {
            quantity > 1 && setQuantity(quantity - 1);
        }
    };

    const handleSize = (e) => {
        setSize(e.target.value);
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicUrl(`/products/find/${productId}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [productId]);

    const handleClick = () => {
        setColor(product.color[0]);
        setSize(product.size[0]);
        dispatch(addProduct({ ...product, quantity, size, color }));
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    <Image src={product?.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product?.title}</Title>
                    <Description>{product?.description}</Description>
                    <Price>$ {product?.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product?.color.map((color) => (
                                <FilterColor
                                    color={color}
                                    key={color}
                                    onClick={() => setColor(color)}
                                />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={handleSize}>
                                {product?.size.map((s) => (
                                    <FilterSizeOption key={s} value={s}>
                                        {s}
                                    </FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <RemoveIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => handleQuantity("dec")}
                            />
                            <Amount>{quantity}</Amount>
                            <AddIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => handleQuantity("inc")}
                            />
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
