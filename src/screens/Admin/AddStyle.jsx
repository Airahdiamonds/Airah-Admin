import { useState, useEffect } from 'react'
import { addStyle, updateStyle } from '../../utils/api'
import { convertFormData, stylesJson } from '../../utils/helpers'
import { useDispatch } from 'react-redux'
import { fetchStyles } from '../../redux/userProductsSlice'
import ImageURLInput from '../../components/ImageURLInput'

const AddStyle = ({ initialData = null, onSuccess }) => {
	const dispatch = useDispatch()
	const [formData, setFormData] = useState(stylesJson)
	const [uploadedImages, setUploadedImages] = useState([])

	// Pre-fill the form if initialData is provided
	useEffect(() => {
		if (initialData) {
			setFormData(initialData)
			setUploadedImages(initialData.image_URL || [])
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
				await updateStyle(initialData.ring_style_id, cleanedData)
				dispatch(fetchStyles(1))
				alert('Style updated successfully!')
			} else {
				// Add new product
				await addStyle(cleanedData)
				alert('Style added successfully!')
				dispatch(fetchStyles(1))
			}
			setFormData(stylesJson)
			setUploadedImages([])
			onSuccess?.() // Call callback function to refresh list
		} catch (error) {
			console.error('Error:', error)
		}
	}

	const handleUploadSuccess = (uploadedUrls) => {
		setFormData((prev) => ({
			...prev,
			image_URL: [...prev.image_URL, ...uploadedUrls],
		}))
	}

	return (
		<div className="mx-auto p-6">
			<h2 className="text-3xl font-semibold text-gray-800 mb-6">
				{initialData ? 'Update Style' : 'Add Style'}
			</h2>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-4 gap-4 px-4 py-2 rounded-md"
			>
				<div className="col-span-2">
					<label className="block font-medium">Style Name</label>
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

				<div className="col-span-2">
					<label className="block font-medium">Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Head Style</label>
					<select
						name="head_style"
						value={formData.head_style}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					>
						<option value="Four Prong">Four Prong</option>
						<option value="Six Prong">Six Prong</option>
						<option value="Classic Basket">Classic Basket</option>
						<option value="Pave Basket">Pave Basket</option>
						<option value="Surprise Diamond">Surprise Diamond</option>
						<option value="Surprise Sapphire">Surprise Sapphire</option>
						<option value="Lotus Basket">Lotus Basket</option>
						<option value="Tulip Basket">Tulip Basket</option>
						<option value="Scalloped Six Prong">Scalloped Six Prong</option>
						<option value="Vintage Basket">Vintage Basket</option>
						<option value="Pave Halo">Pave Halo</option>
						<option value="Sapphire Halo">Sapphire Halo</option>
						<option value="French Pave Halo">French Pave Halo</option>
						<option value="Falling Edge Halo">Falling Edge Halo</option>
					</select>
				</div>
				<div>
					<label className="block font-medium">Head Style Price</label>
					<input
						type="number"
						name="head_style_price"
						value={formData.head_style_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Head Metal</label>
					<select
						name="head_metal"
						value={formData.head_metal}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					>
						<option value="14K White Gold">14K White Gold</option>
						<option value="14K Yellow Gold">14K Yellow Gold</option>
						<option value="14K Rose Gold">14K Rose Gold</option>
						<option value="18K White Gold">18K White Gold</option>
						<option value="18K Yellow Gold">18K Yellow Gold</option>
						<option value="18K Rose Gold">18K Rose Gold</option>
						<option value="Platinum">Platinum</option>
					</select>
				</div>
				<div>
					<label className="block font-medium">Head Metal Price</label>
					<input
						type="number"
						name="head_metal_price"
						value={formData.head_metal_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Shank Style</label>
					<select
						name="shank_style"
						value={formData.shank_style}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					>
						<option value="Solitaire">Solitaire</option>
						<option value="French Pave">French Pave</option>
						<option value="U Shaped Pave">U Shaped Pave</option>
						<option value="Knife Edge Pave">Knife Edge Pave</option>
						<option value="Knife Edge Solitaire">Knife Edge Solitaire</option>
						<option value="Marquise Diamond">Marquise Diamond</option>
						<option value="Marquise Saphire">Marquise Saphire</option>
						<option value="Cathedral Pave">Cathedral Pave</option>
						<option value="Rope Solitaire">Rope Solitaire</option>
						<option value="Rope Pave">Rope Pave</option>
						<option value="Sleek Accent">Sleek Accent</option>
						<option value="Channel Set">Channel Set</option>
					</select>
				</div>
				<div>
					<label className="block font-medium">Shank Style Price</label>
					<input
						type="number"
						name="shank_style_price"
						value={formData.shank_style_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<div>
					<label className="block font-medium">Shank Metal</label>
					<select
						name="shank_metal"
						value={formData.shank_metal}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					>
						<option value="14K White Gold">14K White Gold</option>
						<option value="14K Yellow Gold">14K Yellow Gold</option>
						<option value="14K Rose Gold">14K Rose Gold</option>
						<option value="18K White Gold">18K White Gold</option>
						<option value="18K Yellow Gold">18K Yellow Gold</option>
						<option value="18K Rose Gold">18K Rose Gold</option>
						<option value="Platinum">Platinum</option>
					</select>
				</div>
				<div>
					<label className="block font-medium">Shank Metal Price</label>
					<input
						type="number"
						name="shank_metal_price"
						value={formData.shank_metal_price}
						onChange={handleChange}
						className="border p-2 rounded w-full"
					/>
				</div>
				<ImageURLInput
					onUploadSuccess={handleUploadSuccess}
					uploadedImages={uploadedImages}
					setUploadedImages={setUploadedImages}
				/>
				<div className="col-span-4 flex justify-center">
					<button
						type="submit"
						className="bg-gray-700 text-white p-2 rounded-md w-1/4"
					>
						{initialData ? 'Update Style' : 'Add Style'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddStyle
