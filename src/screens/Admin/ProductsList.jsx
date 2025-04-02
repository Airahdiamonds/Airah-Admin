import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddProduct from './AddProduct'
import { fetchAdminProducts } from '../../redux/userProductsSlice'

const ProductsList = () => {
	const dispatch = useDispatch()
	const { products } = useSelector((state) => state.userProducts)
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [showForm, setShowForm] = useState(false)

	useEffect(() => {
		if (products?.length === 0) {
			dispatch(fetchAdminProducts())
		}
	}, [dispatch, products?.length])

	const handleEditClick = (product) => {
		setSelectedProduct(product)
		setShowForm(true)
	}

	const handleCloseForm = () => {
		setShowForm(false)
		setSelectedProduct(null)
	}

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h2 className="text-3xl font-semibold text-gray-800 mb-6">
				Product Management
			</h2>

			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white">
						<thead>
							<tr className="bg-blue-500 text-white text-sm uppercase text-left">
								<th className="px-6 py-3">Name</th>
								<th className="px-6 py-3">Category</th>
								<th className="px-6 py-3">Price</th>
								<th className="px-6 py-3 text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{products?.map((product) => (
								<tr
									key={product.product_id}
									className="border-b transition hover:bg-gray-100"
								>
									<td className="px-6 py-4">{product.name}</td>
									<td className="px-6 py-4">{product.category}</td>
									<td className="px-6 py-4 text-green-600 font-semibold">
										₹{product.total_cost}
									</td>
									<td className="px-6 py-4 flex justify-center space-x-4">
										<button
											onClick={() => handleEditClick(product)}
											className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
										>
											Update
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Show AddProduct component for updating */}
			{showForm && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-100 h-[40rem] overflow-y-auto">
						<AddProduct
							initialData={selectedProduct}
							onSuccess={handleCloseForm}
						/>
						<button
							onClick={handleCloseForm}
							className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProductsList
