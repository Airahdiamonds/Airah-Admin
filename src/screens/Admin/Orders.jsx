import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, updateStatus } from '../../redux/ordersSlice'

const Orders = () => {
	// const [orders, setOrders] = useState([])
	// const [loading, setLoading] = useState(true)
	const dispatch = useDispatch()
	const { orders, status, error } = useSelector((state) => state.orders)

	useEffect(() => {
		dispatch(fetchOrders())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const updateOrderStatus = async (orderId, status) => {
		dispatch(updateStatus({ orderId, status }))
		dispatch(fetchOrders())
	}

	const cancelOrder = async (orderId) => {
		try {
			await fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' })
			fetchOrders()
		} catch (error) {
			console.error('Error cancelling order:', error)
		}
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-4">Order Management</h2>
			<table className="w-full border-collapse border border-gray-200">
				<thead>
					<tr className="bg-gray-100">
						<th className="p-2 border">Order ID</th>
						<th className="p-2 border">User</th>
						<th className="p-2 border">Total</th>
						<th className="p-2 border">Status</th>
						<th className="p-2 border">Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id} className="border">
							<td className="p-2 border">{order.order_id}</td>
							<td className="p-2 border">{order.user_id}</td>
							<td className="p-2 border">${order.total_amount}</td>
							<td className="p-2 border">{order.status}</td>
							<td className="p-2 border space-x-2">
								<select
									className="p-1 border rounded"
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
								<button
									className="bg-red-500 text-white px-2 py-1 rounded"
									onClick={() => cancelOrder(order.order_id)}
								>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Orders
