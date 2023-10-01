import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import DeleteIcon from '@mui/icons-material/Delete';
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { userUrl } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, emptyCart } from "../redux/cartRedux";
const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 13px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    ${mobile({ flexDirection: "column", position: "relative" })}
`;

const ProductDetail = styled.div`
    flex: 4;
    display: flex;
    ${mobile({ marginBottom: "10px" })}
`;

const Image = styled.img`
    width: 200px;
    ${mobile({ width: "100px" })}
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

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px", fontSize: "20px" })}
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    font-weight: ${(props) => props.type === "total" && 600};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

const DeleteCart = styled.div`
    display: flex;
    flex : 1;
    align-items: center;
    justify-content: center;
    ${mobile({ position: "absolute", right: "0px", top: "-20px" })}
`

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.currentUser?._id);
    const history = useNavigate();
    const dispatch = useDispatch();

    const saveOrder = async (paymentStatus) => {
        console.log("Saved ");
        const orderDetails = {
            userId: user,
            products: cart.products.map((product) => ({
                productId: product._id,
                title: product.title,
                img: product.img,
                quantity: product.quantity,
            })),
            amount: cart.total,
            status: paymentStatus
        };
        try {
            const res = await userUrl.post("/orders", orderDetails);
        }
        catch (err) {
            console.log(err);
        }
    }

    const initPayment = (payment) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: payment.amount,
            currency: payment.currency,
            name: "Book",
            description: "Test transaction",
            order_id: payment.id,
            handler: async (response) => {
                try {
                    const { data } = await userUrl.post(
                        "/checkout/verify",
                        response
                    );
                    saveOrder("Success");
                    dispatch(emptyCart());
                    history("/orders", { state: { payment, data } });
                } catch (err) {
                    console.log(err);
                    saveOrder("Failure");
                    history("/orders");
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const handleCheckout = async (req, res) => {
        try {
            const { data } = await userUrl.post("/checkout/payment", {
                amount: cart.total * 100,
            });
            initPayment(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = (product) => {
        dispatch(deleteProduct({ id: product._id, quantity: product.quantity, price: product.price }));
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag({cart.products.length})</TopText>
                        <TopText>Your Wishlist(0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECK OUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
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
                                        <ProductColor color={product.color} />
                                        <ProductSize>
                                            <b>Size: </b>
                                            {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    {/* <ProductAmountContainer>
                                        <RemoveIcon
                                            style={{ cursor: "pointer" }}
                                        />
                                        <ProductAmount>
                                            {product.quantity}
                                        </ProductAmount>
                                        <AddIcon
                                            style={{ cursor: "pointer" }}
                                        />
                                    </ProductAmountContainer> */}
                                    <ProductPrice>
                                        $ {product.price * product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                                <DeleteCart>
                                    <DeleteIcon onClick={() => handleDelete(product)} style={{ cursor: "pointer" }} />
                                </DeleteCart>
                            </Product>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>SubTotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Estimated Shipping{" "}
                            </SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <Button onClick={handleCheckout}>CHECK OUT NOW</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Cart;
