import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import styled, { css } from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { userUrl } from "../requestMethods";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Content = styled.div`
    margin-top: 20px;
    padding: 30px;
    ${mobile({ padding: "10px" })}
`

const Order = styled.div`
    margin: 10px;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`
const TopLeft = styled.div`
`
const TopRight = styled.div`
`
const Bottom = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`
const BottomLeft = styled.div`
    flex: 4;
`
const BottomRight = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 4;
    display: flex;
`;

const Image = styled.img`
    width: 100px;
`;

const Details = styled.div`
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${mobile({ padding: "0 15px" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const OrderAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    flex-direction: column;
    ${mobile({ flexDirection: "row" })}
`;

const OrderAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const PaymentStatus = styled.div`
    font-size: 18px;
    margin: 5px;
    padding: 5px 7px;
    border: none;
    border-radius: 10px;
    ${mobile({ margin: "5px 15px" })}
    ${(props) => props.status === "Success" && css`
        background-color: #e5faf2;
        color: #3bb077;
    `}
    ${(props) => props.status === "Failure" && css`
        background-color: #fff0f1;
        color: #d95087;
    `}
    ${(props) => props.status === "Pending" && css`
        background-color: #ebf1fe;
        color: #2a7ade;
    `}
`;
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin-bottom: 30px;
`;
const Message = styled.h4`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Division = styled.div``

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const user = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userUrl.get(`/orders/find/${user._id}`);
                setOrders(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getOrders();
    }, [user._id]);

    return (
        <>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Orders</Title>
                <Content>
                    {orders.length ? (
                        orders.map((order) => (
                            <Division key={order._id}>
                                <Order>
                                    <Top>
                                        <TopRight>
                                            <b>Order id: </b>
                                            {order._id}
                                        </TopRight>
                                        <TopLeft>
                                            {new Date(order.createdAt).toLocaleDateString('en-us', { year: 'numeric', month: "short", day: 'numeric' })}
                                        </TopLeft>
                                    </Top>
                                    <Bottom>
                                        <BottomLeft>
                                            {order.products.map((product) => (
                                                <Product key={product._id}>
                                                    <ProductDetail>
                                                        <Image src={product.img} />
                                                        <Details>
                                                            <ProductName>
                                                                <b>Product: </b>
                                                                {product.title}
                                                            </ProductName>
                                                            <ProductId>
                                                                <b>Product ID: </b>
                                                                {product._id}
                                                            </ProductId>
                                                            <ProductSize>
                                                                <b>Quantity: </b>
                                                                {product.quantity}
                                                            </ProductSize>
                                                        </Details>
                                                    </ProductDetail>
                                                </Product>
                                            ))}
                                        </BottomLeft>
                                        <BottomRight>
                                            <PriceDetail>
                                                <OrderAmountContainer>
                                                    <OrderAmount>
                                                        $ {order.amount}
                                                    </OrderAmount>
                                                    <PaymentStatus status={order.status}>
                                                        {order.status}
                                                    </PaymentStatus>
                                                </OrderAmountContainer>
                                            </PriceDetail>
                                        </BottomRight>
                                    </Bottom>
                                </Order>
                                <Hr />
                            </Division>
                        ))
                    ) : (
                        <Message>
                            No orders found
                        </Message>
                    )}
                </Content>
            </Wrapper >
            <Newsletter />
            <Footer />
        </>
    )
}

export default Orders;