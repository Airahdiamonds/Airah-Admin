import { Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import Sidebar from './components/sidebar'
import ProductsList from './screens/Admin/ProductsList'
import AddProduct from './screens/Admin/AddProduct'
import AdminDashboard from './screens/Admin/Dashboard'
import UsersList from './screens/Admin/UsersList'
import Master from './screens/Admin/Master'
import AddDiamond from './screens/Admin/AddDiamond'
import AddStyle from './screens/Admin/AddStyle'
import DiamondsList from './screens/Admin/DiamondsList'
import StylesList from './screens/Admin/StylesList'
import Orders from './screens/Admin/Orders'
import Login from './screens/Admin/Login'
import ProtectedRoute from './components/ProtectedRoute'
import AdminList from './screens/Admin/AdminList'
import AddCoupon from './screens/Admin/AddCoupon'

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/*"
						element={
							<ProtectedRoute>
								<div className="flex h-screen">
									{/* Sidebar: Fixed width and position */}
									<Sidebar className="w-64 h-screen fixed left-0 top-0 bg-gray-800" />

									{/* Main Content: Scrollable */}
									<main className="flex-1  overflow-y-auto h-screen ">
										<Routes>
											<Route path="/" element={<AdminDashboard />} />
											<Route path="/addProducts" element={<AddProduct />} />
											<Route path="/productsList" element={<ProductsList />} />
											<Route path="/userList" element={<UsersList />} />
											<Route path="/adminList" element={<AdminList />} />
											<Route path="/orderList" element={<Orders />} />
											<Route path="/master" element={<Master />} />
											<Route path="/addDiamonds" element={<AddDiamond />} />
											<Route path="/addStyles" element={<AddStyle />} />
											<Route path="/diamondsList" element={<DiamondsList />} />
											<Route path="/stylesList" element={<StylesList />} />
											<Route path="/coupons" element={<AddCoupon />} />
										</Routes>
									</main>
								</div>
							</ProtectedRoute>
						}
					/>
				</Routes>
			</PersistGate>
		</Provider>
	)
}

export default App
