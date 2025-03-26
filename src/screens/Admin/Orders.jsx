import { useEffect, useState } from 'react'

const OrderManagement = () => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = async () => {
		try {
			const response = await fetch('/api/orders')
			const data = await response.json()
			setOrders(data)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching orders:', error)
		}
	}

	const updateOrderStatus = async (orderId, status) => {
		try {
			await fetch(`/api/orders/${orderId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status }),
			})
			fetchOrders() // Refresh orders
		} catch (error) {
			console.error('Error updating order status:', error)
		}
	}

	const cancelOrder = async (orderId) => {
		try {
			await fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' })
			fetchOrders()
		} catch (error) {
			console.error('Error cancelling order:', error)
		}
	}

	if (loading)
		return <p className="text-center text-gray-600">Loading orders...</p>

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
							<td className="p-2 border">{order.id}</td>
							<td className="p-2 border">{order.userId}</td>
							<td className="p-2 border">${order.totalAmount}</td>
							<td className="p-2 border">{order.status}</td>
							<td className="p-2 border space-x-2">
								<select
									className="p-1 border rounded"
									value={order.status}
									onChange={(e) => updateOrderStatus(order.id, e.target.value)}
								>
									<option value="Pending">Pending</option>
									<option value="Shipped">Shipped</option>
									<option value="Delivered">Delivered</option>
									<option value="Cancelled">Cancelled</option>
								</select>
								<button
									className="bg-red-500 text-white px-2 py-1 rounded"
									onClick={() => cancelOrder(order.id)}
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

export default OrderManagement
