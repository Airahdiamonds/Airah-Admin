import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
	Diamond,
	LayoutDashboard,
	Package,
	BookCheck,
	Plus,
	Settings,
	ShoppingBag,
	Users,
	ChevronLeft,
	ChevronRight,
	Sparkles,
	Search,
	Bell,
	User,
	BarChart3,
	DollarSign,
	Clock,
} from 'lucide-react'

const Sidebar = () => {
	const location = useLocation()
	const [open, setOpen] = React.useState(true)
	const [searchQuery, setSearchQuery] = React.useState('')

	// Group the navigation items
	const navItems = [
		{
			title: 'Dashboard',
			icon: <LayoutDashboard className="h-5 w-5" />,
			path: '/',
		},
		{
			title: 'Analytics',
			icon: <BarChart3 className="h-5 w-5" />,
			children: [
				{
					title: 'Sales Overview',
					path: '/analytics/sales',
					icon: <DollarSign className="h-4 w-4" />,
				},
				{
					title: 'Recent Activity',
					path: '/analytics/activity',
					icon: <Clock className="h-4 w-4" />,
				},
			],
		},
		{
			title: 'Products',
			icon: <ShoppingBag className="h-5 w-5" />,
			children: [
				{
					title: 'Add Product',
					path: '/addProducts',
					icon: <Plus className="h-4 w-4" />,
				},
				{
					title: 'Products List',
					path: '/productsList',
					icon: <Package className="h-4 w-4" />,
				},
			],
		},
		{
			title: 'Diamonds',
			icon: <Diamond className="h-5 w-5" />,
			children: [
				{
					title: 'Add Diamond',
					path: '/addDiamonds',
					icon: <Plus className="h-4 w-4" />,
				},
				{
					title: 'Diamonds List',
					path: '/diamondsList',
					icon: <Package className="h-4 w-4" />,
				},
			],
		},
		{
			title: 'Styles',
			icon: <Sparkles className="h-5 w-5" />,
			children: [
				{
					title: 'Add Style',
					path: '/addStyles',
					icon: <Plus className="h-4 w-4" />,
				},
				{
					title: 'Styles List',
					path: '/stylesList',
					icon: <Package className="h-4 w-4" />,
				},
			],
		},
		{
			title: 'Users',
			icon: <Users className="h-5 w-5" />,
			path: '/userList',
		},
		{
			title: 'Master Settings',
			icon: <Settings className="h-5 w-5" />,
			path: '/master',
		},
		{
			title: 'Orders',
			icon: <BookCheck className="h-5 w-5" />,
			path: '/orderList',
		},
	]

	// Toggle sidebar
	const toggleSidebar = () => {
		setOpen(!open)
	}

	return (
		<div className="relative">
			{/* Sidebar */}
			<aside
				className={
					'fixed inset-y-0 left-0 z-40 ' +
					'bg-gradient-to-b from-white to-gray-100 ' +
					'border-r border-gray-200 ' +
					'transition-all duration-300 ease-in-out ' +
					'flex flex-col ' +
					`${open ? 'w-64' : 'w-20'} ` +
					'shadow-xl'
				}
			>
				{/* Logo */}
				<div
					className={
						'flex items-center justify-center h-20 ' +
						'border-b border-gray-200 ' +
						'bg-gradient-to-r from-white to-gray-100 ' +
						`${open ? 'px-6' : 'px-2'}`
					}
				>
					<div className="flex items-center gap-3">
						<Diamond
							className={`h-8 w-8 text-yellow-300 filter drop-shadow-lg ${
								!open && 'mx-auto'
							}`}
						/>
						{open && (
							<div className="font-serif text-xl font-bold text-gray-800">
								<span>Brilliant</span>
								<span className="text-yellow-300">Gems</span>
							</div>
						)}
					</div>
				</div>

				{/* User Profile */}
				<div
					className={
						'flex items-center gap-3 p-4 ' +
						'border-b border-gray-200 ' +
						`${!open && 'justify-center'}`
					}
				>
					<div className="relative">
						<div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center">
							<User className="h-6 w-6 text-white" />
						</div>
						<div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
					</div>
					{open && (
						<div className="flex flex-col">
							<span className="font-medium text-gray-800">Admin User</span>
							<span className="text-xs text-gray-600">
								admin@brilliantgems.com
							</span>
						</div>
					)}
				</div>

				{/* Search Bar */}
				{open && (
					<div className="px-4 py-3">
						<div className="relative">
							<input
								type="text"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-9 pr-4 py-2 rounded-lg text-sm bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
							/>
							<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
						</div>
					</div>
				)}

				{/* Quick Stats */}
				{open && (
					<div className="grid grid-cols-2 gap-2 p-4 border-b border-gray-200">
						<div className="bg-white p-3 rounded-lg shadow-sm">
							<div className="text-xs text-gray-500">Sales Today</div>
							<div className="text-lg font-bold text-purple-600">$12,845</div>
						</div>
						<div className="bg-white p-3 rounded-lg shadow-sm">
							<div className="text-xs text-gray-500">New Orders</div>
							<div className="text-lg font-bold text-blue-600">24</div>
						</div>
					</div>
				)}

				{/* Navigation */}
				<nav className="flex-1 overflow-y-auto py-4">
					<ul className="space-y-1 px-2">
						{navItems.map((item, index) => (
							<li key={index}>
								{item.path ? (
									<Link
										to={item.path}
										className={
											'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ' +
											`${
												location.pathname === item.path
													? 'bg-gradient-to-r from-purple-300 to-blue-300 text-white font-medium'
													: 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
											} ${!open && 'justify-center p-2'}`
										}
										title={!open ? item.title : ''}
									>
										{item.icon}
										{open && <span>{item.title}</span>}
									</Link>
								) : (
									<div className="space-y-1">
										<div
											className={
												'flex items-center gap-3 px-3 py-2 text-gray-900 font-medium ' +
												`${!open && 'justify-center p-2'}`
											}
											title={!open ? item.title : ''}
										>
											{item.icon}
											{open && <span>{item.title}</span>}
										</div>

										{open && item.children && (
											<ul className="pl-10 space-y-1">
												{item.children.map((child, childIndex) => (
													<li key={childIndex}>
														<Link
															to={child.path}
															className={
																'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ' +
																`${
																	location.pathname === child.path
																		? 'bg-gradient-to-r from-purple-300 to-blue-300 text-white font-medium'
																		: 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
																}`
															}
														>
															{child.icon}
															<span>{child.title}</span>
														</Link>
													</li>
												))}
											</ul>
										)}

										{!open && item.children && (
											<ul className="space-y-1">
												{item.children.map((child, childIndex) => (
													<li key={childIndex}>
														<Link
															to={child.path}
															className={
																'flex justify-center items-center p-2 rounded-md transition-colors duration-200 ' +
																`${
																	location.pathname === child.path
																		? 'bg-gradient-to-r from-purple-300 to-blue-300 text-white'
																		: 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
																}`
															}
															title={child.title}
														>
															{child.icon}
														</Link>
													</li>
												))}
											</ul>
										)}
									</div>
								)}
							</li>
						))}
					</ul>
				</nav>

				{/* Notifications */}
				{open && (
					<div className="p-4 border-t border-gray-200">
						<div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
							<div className="relative">
								<Bell className="h-5 w-5 text-purple-500" />
								<div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
							</div>
							<div className="text-sm">
								<div className="font-medium text-gray-900">
									New Notifications
								</div>
								<div className="text-xs text-gray-600">
									You have 5 unread messages
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Collapse Button */}
				<div className="p-4 border-t border-gray-200 flex justify-center">
					<button
						onClick={toggleSidebar}
						className="p-2 rounded-full bg-gradient-to-r from-purple-300 to-blue-300 text-white hover:shadow-lg transition-all duration-200"
						title={open ? 'Collapse Sidebar' : 'Expand Sidebar'}
					>
						{open ? (
							<ChevronLeft className="h-5 w-5" />
						) : (
							<ChevronRight className="h-5 w-5" />
						)}
					</button>
				</div>
			</aside>
		</div>
	)
}

export default Sidebar
