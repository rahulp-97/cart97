const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/orderModel');

// create new order
// POST /api/orders
// access private
exports.addOrderItems = asyncHandler(async (req, res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    if(orderItems && orderItems.length===0){
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x)=> ({
                ...x, product: x._id, _id: undefined
            })),
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// get logged in user orders
// GET api/orders/myorders
// access private
exports.getMyOrders = asyncHandler(async (req, res)=> {
    const orders = await Order.find({user: req.user._id});
    res.json(orders);
});

//get orders by id
// GET api/orders/:id
// access private
exports.getOrdersById = asyncHandler(async (req, res)=> {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    // populate adds the field to the collections.
    // first input is for collection name and other inputs are fields you want to add.
    if(order){
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//update order to paid
// PUT api/orders/:id/pay
// access private
exports.updateOrderToPaid = asyncHandler(async (req, res)=> {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Odrers not found');
    }
});

//update order to delivered
// PUT api/orders/:id/deliver
// access private
exports.updateOrderToDelivered = asyncHandler(async (req, res)=> {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        
        res.status(200).json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
});

//get all orders
// GET api/orders
// access private/admin
exports.getOrders = asyncHandler(async (req, res)=> {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});