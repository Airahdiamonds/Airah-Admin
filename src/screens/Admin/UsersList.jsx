import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/userProductsSlice'

const UsersList = () => {
	const dispatch = useDispatch()
	const { users } = useSelector((state) => state.userProducts)

	useEffect(() => {
		if (users.length === 0) {
			dispatch(fetchUsers())
		}
	}, [dispatch, users.length])

	return (
		<div className="max-w-6xl mx-auto p-6">
			<h2 className="text-3xl font-semibold text-gray-800 mb-6">Users List</h2>

			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white">
						<thead>
							<tr className="bg-blue-500 text-white text-left text-sm uppercase">
								<th className="px-6 py-3">ID</th>
								<th className="px-6 py-3">Name</th>
								<th className="px-6 py-3">Email</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr
									key={user?.user_id}
									className="border-b transition hover:bg-gray-100"
								>
									<td className="px-6 py-4">{user?.user_id}</td>
									<td className="px-6 py-4">{user?.name}</td>
									<td className="px-6 py-4">{user?.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default UsersList
