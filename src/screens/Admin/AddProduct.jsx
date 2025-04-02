import { useState, useEffect } from 'react'
import { addProduct, updateProduct } from '../../utils/api'
import { convertFormData, productJson } from '../../utils/helpers'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/userProductsSlice'
import ImageURLInput from '../../components/ImageURLInput'

const AddProduct = ({ initialData = null, onSuccess }) => {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState(productJson)

	// Pre-fill the form if initialData is provided
	useEffect(() => {
		if (initialData) {
			setFormData(initialData)
		}
	}, [initialData])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const cleanedData = convertFormData(formData)

		try {
			if (initialData) {
				// Update existing product
				await updateProduct(initialData.product_id, cleanedData)
				alert('Product updated successfully!')
			} else {
				// Add new product
				await addProduct(cleanedData)
				alert('Product added successfully!')
				dispatch(fetchProducts(1))
			}
			setFormData(productJson)
			onSuccess?.() // Call callback function to refresh list
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<div className="mx-auto p-6">
			<h2 className="text-3xl font-semibold text-gray-800 mb-6">
				{initialData ? 'Update Product' : 'Add Product'}
			</h2>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-4 gap-4 px-4 py-2 rounded-md"
			>
				<div className="col-span-2">
					<label className="block font-medium">Product Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">SKU</label>
					<input
						type="text"
						name="SKU"
						value={formData.SKU}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Segment</label>
					<input
						type="text"
						name="segment"
						value={formData.segment}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Category</label>
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					>
						<option value="ring">Ring</option>
						<option value="necklace">Necklace</option>
						<option value="pendant">Pendant</option>
						<option value="bracelet">Bracelet</option>
					</select>
				</div>
				<div className="col-span-3">
					<label className="block font-medium">Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Sub-Category</label>
					<select
						name="subCategory"
						value={formData.subCategory}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					>
						<option value="Stackable Rings">Stackable Rings</option>
						<option value="Birthstone Rings">Birthstone Rings</option>
						<option value="Eternity Rings">Eternity Rings</option>
						<option value="Fashion Rings">Fashion Rings</option>
						<option value="Stud Earrings">Stud Earrings</option>
						<option value="Hoop Earrings">Hoop Earrings</option>
						<option value="Drop Earrings">Drop Earrings</option>
						<option value="Chandelier Earrings">Chandelier Earrings</option>
						<option value="Bangle Bracelets">Bangle Bracelets</option>
						<option value="Tennis Bracelets">Tennis Bracelets</option>
						<option value="Cuff Bracelets">Cuff Bracelets</option>
						<option value="Charm Bracelets">Charm Bracelets</option>
						<option value="Pendant Necklaces">Pendant Necklaces</option>
						<option value="Choker Necklaces">Choker Necklaces</option>
						<option value="Lariat Necklaces">Lariat Necklaces</option>
						<option value="Statement Necklaces">Statement Necklaces</option>
					</select>
				</div>
				<ImageURLInput
					imageURLs={formData.image_URL}
					setImageURLs={(newImageURLs) =>
						setFormData({ ...formData, image_URL: newImageURLs })
					}
				/>
				<div>
					<label className="block font-medium">Gold Quantity</label>
					<input
						type="number"
						name="gold_quantity"
						value={formData.gold_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Gold Price</label>
					<input
						type="number"
						name="gold_price"
						value={formData.gold_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Gold Total</label>
					<input
						type="number"
						name="gold_total"
						value={formData.gold_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Round Quantity</label>
					<input
						type="number"
						name="round_quantity"
						value={formData.round_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Round Price</label>
					<input
						type="number"
						name="round_price"
						value={formData.round_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Round Total</label>
					<input
						type="number"
						name="round_total"
						value={formData.round_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Oval Quantity</label>
					<input
						type="number"
						name="oval_quantity"
						value={formData.oval_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Oval Price</label>
					<input
						type="number"
						name="oval_price"
						value={formData.oval_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Oval Total</label>
					<input
						type="number"
						name="oval_total"
						value={formData.oval_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Marquise Quantity</label>
					<input
						type="number"
						name="marquise_quantity"
						value={formData.marquise_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Marquise Price</label>
					<input
						type="number"
						name="marquise_price"
						value={formData.marquise_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Marquise Total</label>
					<input
						type="number"
						name="marquise_total"
						value={formData.marquise_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Emerald Quantity</label>
					<input
						type="number"
						name="emerald_quantity"
						value={formData.emerald_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Emerald Price</label>
					<input
						type="number"
						name="emerald_price"
						value={formData.emerald_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Emerald Total</label>
					<input
						type="number"
						name="emerald_total"
						value={formData.emerald_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Princess Quantity</label>
					<input
						type="number"
						name="princess_quantity"
						value={formData.princess_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Princess Price</label>
					<input
						type="number"
						name="princess_price"
						value={formData.princess_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Princess Total</label>
					<input
						type="number"
						name="princess_total"
						value={formData.princess_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Pear Quantity</label>
					<input
						type="number"
						name="pear_quantity"
						value={formData.pear_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Pear Price</label>
					<input
						type="number"
						name="pear_price"
						value={formData.pear_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Pear Total</label>
					<input
						type="number"
						name="pear_total"
						value={formData.pear_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Heart Quantity</label>
					<input
						type="number"
						name="heart_quantity"
						value={formData.heart_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Heart Price</label>
					<input
						type="number"
						name="heart_price"
						value={formData.heart_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Heart Total</label>
					<input
						type="number"
						name="heart_total"
						value={formData.heart_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Other Diamond Quantity</label>
					<input
						type="number"
						name="other_diamond_quantity"
						value={formData.other_diamond_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Other Diamond Price</label>
					<input
						type="number"
						name="other_diamond_price"
						value={formData.other_diamond_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Other Diamond Total</label>
					<input
						type="number"
						name="other_diamond_total"
						value={formData.other_diamond_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Gemstone Quantity</label>
					<input
						type="number"
						name="gemstone_quantity"
						value={formData.gemstone_quantity}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Gemstone Price</label>
					<input
						type="number"
						name="gemstone_price"
						value={formData.gemstone_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Gemstone Total</label>
					<input
						type="number"
						name="gemstone_total"
						value={formData.gemstone_total}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Miscellaneous Cost</label>
					<input
						type="number"
						name="misc_cost"
						value={formData.misc_cost}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Labour Cost</label>
					<input
						type="number"
						name="labour_cost"
						value={formData.labour_cost}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Other Cost</label>
					<input
						type="number"
						name="other_cost"
						value={formData.other_cost}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Total Cost</label>
					<input
						type="number"
						name="total_cost"
						value={formData.total_cost}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div className="col-span-4 flex justify-center">
					<button
						type="submit"
						className="bg-gray-700 text-white p-2 rounded-md w-1/4"
					>
						{initialData ? 'Update Product' : 'Add Product'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddProduct
