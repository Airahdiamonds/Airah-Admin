import axios from 'axios'
import { useState } from 'react'

const ImageURLInput = ({ onUploadSuccess }) => {
	const [selectedFiles, setSelectedFiles] = useState([])
	const [uploading, setUploading] = useState(false)
	const [previewUrls, setPreviewUrls] = useState([])
	const [uploadedImages, setUploadedImages] = useState([])

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files)
		setSelectedFiles(files)
		const previews = files.map((file) => URL.createObjectURL(file))
		setPreviewUrls(previews)
	}

	const handleUpload = async () => {
		if (selectedFiles.length === 0) {
			alert('Please select images first!')
			return
		}
		console.log('Uploading files:', selectedFiles.length)
		const formData = new FormData()
		selectedFiles.forEach((file, index) => {
			formData.append(`image_${index}`, file) // Unique key per image
		})
		setUploading(true)
		try {
			const response = await axios.post(
				'http://localhost:4000/admin/upload',
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			)
			console.log('Uploaded response:', response.data.fileUrls)
			const newImageUrls = response.data.fileUrls
			onUploadSuccess(newImageUrls)
			setUploadedImages((prev) => [...prev, ...newImageUrls])
			setSelectedFiles([])
			previewUrls.forEach((url) => URL.revokeObjectURL(url)) // Free memory
			setPreviewUrls([])
			document.getElementById('fileInput').value = ''
		} catch (error) {
			console.error('Upload failed', error)
		}
		setUploading(false)
	}

	const removeImage = (index) => {
		const newFiles = selectedFiles.filter((_, i) => i !== index)
		const newPreviews = previewUrls.filter((_, i) => i !== index)

		// Revoke the removed file's Object URL to free memory
		URL.revokeObjectURL(previewUrls[index])

		setSelectedFiles(newFiles)
		setPreviewUrls(newPreviews)
	}

	const removeUploadedImage = (index) => {
		const newUploadedImages = uploadedImages.filter((_, i) => i !== index)
		setUploadedImages(newUploadedImages)
	}

	return (
		<div className="bg-gray-100 p-4 rounded-lg shadow-lg col-span-full">
			{/* Upload Input */}
			<div className="flex flex-col items-center justify-center w-full">
				<label className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 bg-white rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition duration-200">
					<input
						type="file"
						id="fileInput"
						multiple
						className="hidden"
						onChange={handleFileChange}
					/>
					<span className="text-gray-600 text-sm">
						Click or drag & drop images here
					</span>
				</label>
				<button
					type="button"
					onClick={handleUpload}
					disabled={uploading}
					className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
				>
					Upload Images
				</button>
			</div>

			{/* Selected Files Preview */}
			{previewUrls.length > 0 && (
				<div className="mt-4">
					<h3 className="text-lg font-semibold text-gray-700">
						Selected Images:
					</h3>
					<div className="grid grid-cols-3 gap-3 mt-2">
						{previewUrls.map((url, index) => (
							<div key={index} className="relative">
								<img
									src={url}
									alt="preview"
									className="w-full h-32 object-cover rounded-lg border"
								/>
								<button
									onClick={() => removeImage(index)}
									className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
								>
									✕
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{uploadedImages.length > 0 && (
				<div className="mt-6">
					<h3 className="text-lg font-semibold text-gray-700">
						Uploaded Images:
					</h3>
					<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
						{uploadedImages.map((url, index) => (
							<div key={index} className="relative group">
								<img
									src={url}
									alt={`Uploaded ${index}`}
									className="w-full h-32 object-cover rounded-lg border transition-transform transform group-hover:scale-105"
								/>

								<button
									type="button"
									onClick={() => removeUploadedImage(index)}
									className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-200"
								>
									X
								</button>

								<p className="text-xs text-gray-500 mt-1 truncate">{url}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default ImageURLInput
