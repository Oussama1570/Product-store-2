import React from "react";
import { useGetAllOrdersQuery, useUpdateOrderMutation } from "../../redux/features/orders/ordersApi"; // Import the mutation hook
import "./AdminOrdersList.css";

const AdminOrdersList = () => {
  const { data: orders, error, isLoading } = useGetAllOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation(); // Hook to update the order

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders: {error.message}</p>;

  // Function to handle status change
  const handleStatusChange = async (orderId, isPaid, isDelivered) => {
  try {
    console.log({ orderId, isPaid, isDelivered }); // Log the data being sent
    await updateOrder({ orderId, isPaid, isDelivered }).unwrap();
  } catch (err) {
    console.error("Error updating order:", err);
  }
};
  

  return (
    <div className="admin-orders-list">
      <h2>Orders List</h2>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product IDs</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zipcode</th>
              <th>Created At</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name || "N/A"}</td>
                <td>{order.email || "N/A"}</td>
                <td>{order.phone || "N/A"}</td>
                <td>{order.productIds.join(", ") || "N/A"}</td>
                <td>{order.address?.address || "N/A"}</td>
                <td>{order.address?.city || "N/A"}</td>
                <td>{order.address?.state || "N/A"}</td>
                <td>{order.address?.zipcode || "N/A"}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice}</td>

                {/* Paid dropdown selector */}
                <td>
                  <select
                    value={order.isPaid ? "Yes" : "No"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value === "Yes", order.isDelivered)
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>

                {/* Delivered dropdown selector */}
                <td>
                  <select
                    value={order.isDelivered ? "Yes" : "No"}
                    onChange={(e) =>
                      handleStatusChange(order._id, order.isPaid, e.target.value === "Yes")
                    }
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersList;
