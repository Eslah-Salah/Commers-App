import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user orders from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total Price: {order.totalOrderPrice} EGP</p>
            <p>Payment Method: {order.paymentMethodType}</p>
            <p>Shipping Address: {order.shippingAddress.city}, {order.shippingAddress.details}, {order.shippingAddress.phone}</p>
            <h4>Items:</h4>
            <ul>
              {order.cartItems.map((item) => (
                <li key={item.product._id}>
                  {item.product.title} - {item.count} x {item.price} EGP
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserOrders;
