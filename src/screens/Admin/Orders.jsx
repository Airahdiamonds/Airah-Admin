import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateStatus } from "../../redux/ordersSlice";
import { FiTrash2 } from "react-icons/fi";

const Orders = () => {
	const dispatch = useDispatch();
	const { orders } = useSelector((state) => state.orders);

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	const updateOrderStatus = async (orderId, status) => {
		await dispatch(updateStatus({ orderId, status }));
		dispatch(fetchOrders());
	};

	const cancelOrder = async (orderId) => {
		try {
			await fetch(`/api/orders/${orderId}/cancel`, { method: "POST" });
			dispatch(fetchOrders());
		} catch (error) {
			console.error("Error cancelling order:", error);
		}
	};

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Management</h2>

			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white">
						<thead>
							<tr className="bg-blue-500 text-white text-sm uppercase text-left">
								<th className="px-6 py-3">Order ID</th>
								<th className="px-6 py-3">User</th>
								<th className="px-6 py-3">Total</th>
								<th className="px-6 py-3">Status</th>
								<th className="px-6 py-3 text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order.id} className="border-b transition hover:bg-gray-100">
									<td className="px-6 py-4">{order.order_id}</td>
									<td className="px-6 py-4">{order.user_id}</td>
									<td className="px-6 py-4 text-green-600 font-semibold">
										${order.total_amount}
									</td>
									<td className="px-6 py-4">
										<select
											className="p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
											value={order.status}
											onChange={(e) =>
												updateOrderStatus(order.order_id, e.target.value)
											}
										>
											<option value="pending">Pending</option>
											<option value="shipped">Shipped</option>
											<option value="delivered">Delivered</option>
											<option value="cancelled">Cancelled</option>
										</select>
									</td>
									<td className="px-6 py-4 flex justify-center space-x-4">
										<button
											className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition flex items-center"
											onClick={() => cancelOrder(order.order_id)}
										>
											<FiTrash2 className="mr-1" />
											Cancel
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Orders;
