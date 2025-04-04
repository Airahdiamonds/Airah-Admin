import { useEffect, useState } from 'react'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'
import {
	getAllAdmin,
	createAdmin,
	updateAdmin,
	deleteAdmin,
} from '../../utils/api'

const AdminList = () => {
	const [users, setUsers] = useState([])
	const [form, setForm] = useState({ name: '', email: '', password: '' })
	const [editingId, setEditingId] = useState(null)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		loadAdmins()
	}, [])

	const loadAdmins = async () => {
		const res = await getAllAdmin()
		setUsers(res.data)
	}

	const openModal = (admin = null) => {
		if (admin) {
			setForm({ name: admin.name, email: admin.email, password: '' })
			setEditingId(admin.user_id)
		} else {
			setForm({ name: '', email: '', password: '' })
			setEditingId(null)
		}
		setShowModal(true)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (editingId) {
			await updateAdmin(editingId, form)
		} else {
			await createAdmin(form)
		}
		setShowModal(false)
		await loadAdmins()
	}

	const handleDelete = async (id) => {
		// if (confirm('Are you sure you want to delete this admin?')) {
		await deleteAdmin(id)
		await loadAdmins()
		// }
	}

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-between items-center">
				Admin List
				<button
					onClick={() => openModal()}
					className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
				>
					<FiPlus />
					<span className="text-lg">Add Admin</span>
				</button>
			</h2>

			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white">
						<thead>
							<tr className="bg-blue-500 text-white text-left text-sm uppercase">
								<th className="px-6 py-3">Name</th>
								<th className="px-6 py-3">Email</th>
								<th className="px-6 py-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr
									key={user?.user_id}
									className="border-b transition hover:bg-gray-100"
								>
									<td className="px-6 py-4">{user?.name}</td>
									<td className="px-6 py-4">{user?.email}</td>
									<td className="px-6 py-4 flex justify-center space-x-4">
										<button
											onClick={() => openModal(user)}
											className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
										>
											<FiEdit />
										</button>
										<button
											onClick={() => handleDelete(user.user_id)}
											className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
										>
											<FiTrash2 />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
						<h3 className="text-xl font-bold mb-4">
							{editingId ? 'Edit Admin' : 'Add Admin'}
						</h3>
						<form onSubmit={handleSubmit} className="space-y-4">
							<input
								type="text"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								placeholder="Name"
								className="w-full border p-2 rounded"
								required
							/>
							<input
								type="email"
								value={form.email}
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								placeholder="Email"
								className="w-full border p-2 rounded"
								required
							/>
							<input
								type="password"
								value={form.password}
								onChange={(e) => setForm({ ...form, password: e.target.value })}
								placeholder="Password"
								className="w-full border p-2 rounded"
								required
							/>
							<div className="flex justify-end space-x-2">
								<button
									type="button"
									onClick={() => setShowModal(false)}
									className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
								>
									{editingId ? 'Update' : 'Create'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default AdminList
