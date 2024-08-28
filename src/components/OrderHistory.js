import { createOrder, fetchUserOrders } from '@/features/orderSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleCreateOrder = (orderData) => {
    dispatch(createOrder(orderData));
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order #{order._id}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
            {/* Здесь можно добавить больше информации о заказе */}
          </li>
        ))}
      </ul>
      <button onClick={() => handleCreateOrder({ /* данные для нового заказа */ })}>
        Create Order
      </button>
    </div>
  );
}
