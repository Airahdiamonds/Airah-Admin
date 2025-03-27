// src/pages/Login.js
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/authSlice'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogin = (e) => {
		e.preventDefault()

		// Mock authentication (Replace this with API authentication logic)
		if (email === 'admin@example.com' && password === 'admin123') {
			dispatch(login({ name: 'Admin', email }))
			navigate('/')
		} else {
			setError('Invalid email or password')
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
					Admin Login
				</h2>
				{error && <p className="text-red-500 text-sm text-center">{error}</p>}

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
							placeholder="admin@example.com"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
					>
						Login
					</button>
				</form>

				<p className="text-sm text-gray-600 text-center mt-4">
					Forgot password?{' '}
					<a href="/" className="text-blue-500 hover:underline">
						Reset it here
					</a>
				</p>
			</div>
		</div>
	)
}

export default Login
