import {useEffect} from 'react';
import {Link, redirect, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Row, Col, ListGroup, Image, Card, Toast} from 'react-bootstrap';
import {useCreateOrderMutation} from '../slices/ordersApiSlice';
import {clearCartItems} from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  useEffect(()=> {
    if(!cart.shippingAddress.address){
      navigate('/shipping');
    } else if(!cart.paymentMethod){
      navigate('/payment');
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch(error) {
      toast.error(error);
    }
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush' >
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is emty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty*item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>              
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                    <Col>Items:</Col>
                    <Col>₹{cart.itemsPrice}</Col>
              </Row>              
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                    <Col>Shipping:</Col>
                    <Col>₹{cart.shippingPrice}</Col>
              </Row>              
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                    <Col>Tax Price:</Col>
                    <Col>₹{cart.taxPrice}</Col>
              </Row>              
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                    <Col>Total:</Col>
                    <Col>₹{cart.totalPrice}</Col>
              </Row>              
            </ListGroup.Item>
            <ListGroup.Item>
            {error?.data?.message && <Message variant='danger'>{error?.data?.message}</Message>}              
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
              type='button'
              className='btn-block'
              variant='dark'
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              >Place Order
              </Button>
              {isLoading && <Loader />}
            </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen;