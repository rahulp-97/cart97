import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation
} from "../slices/ordersApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay, error: errorPay }] = usePayOrderMutation();
  const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  async function onApprove() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  }
  async function deliverOrderHandler() {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err){
      toast.error(err?.data?.message || err.message);
    }
  }
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <Fragment>
      <h3>Order: {orderId}</h3>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger"><strong>Order not delivered</strong></Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment method</h4>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success"><strong>Paid on {order.paidAt}</strong></Message>
              ) : (
                <Message variant="danger">Not paid yet.</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order items</h4>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link style={{textDecoration:'none', color:'black'}} to={`/product/${item.product}`}><strong>{item.name}</strong></Link>
                    </Col>
                    <Col md={4}>
                      ₹{item.price} x {item.qty} = ₹{item.price * item.qty}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax: </Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total: </Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay ? (
                    <Loader />
                  ) : (
                    <Button
                      onClick={onApprove}
                      variant="dark"
                      className="btn-block"
                    >
                      Click to pay
                    </Button>
                  )}
                </ListGroup.Item>
              )}

              {/* MARK AS DELIVERED PLACEHOLDER */}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" variant="dark" className="btn btn-block" onClick={deliverOrderHandler}>
                    Mark as delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
          <ListGroup>
            <ListGroupItem>
            {order.isPaid && <Message variant='success'><strong>Thanks for shopping,</strong> <Link to='/' style={{textDecoration:'none'}}>explore more</Link></Message>}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderScreen;
