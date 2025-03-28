"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDiamonds,
  fetchProducts,
  fetchStyles,
  fetchUsers,
} from '../../redux/userProductsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, users, diamonds, styles } = useSelector(
    (state) => state.userProducts
  );
  
  const [activeTab, setActiveTab] = useState('overview');
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts(1));
    dispatch(fetchUsers());
    dispatch(fetchDiamonds());
    dispatch(fetchStyles());
    
    // Mock sales data
    const mockSalesData = [
      { month: 'Jan', sales: 65000 },
      { month: 'Feb', sales: 59000 },
      { month: 'Mar', sales: 80000 },
      { month: 'Apr', sales: 81000 },
      { month: 'May', sales: 56000 },
      { month: 'Jun', sales: 55000 },
      { month: 'Jul', sales: 40000 },
      { month: 'Aug', sales: 70000 },
      { month: 'Sep', sales: 90000 },
      { month: 'Oct', sales: 110000 },
      { month: 'Nov', sales: 120000 },
      { month: 'Dec', sales: 150000 },
    ];
    
    setSalesData(mockSalesData);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate total revenue
  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0);
  
  // Calculate average order value
  const averageOrderValue = totalRevenue / (products?.length || 1);
  
  // Mock data for diamond types
  const diamondTypes = [
    { type: 'Round', percentage: 45, color: '#4F46E5' },
    { type: 'Princess', percentage: 20, color: '#10B981' },
    { type: 'Cushion', percentage: 15, color: '#F59E0B' },
    { type: 'Oval', percentage: 10, color: '#EF4444' },
    { type: 'Other', percentage: 10, color: '#6B7280' },
  ];
  
  // Mock recent transactions
  const recentTransactions = [
    { id: 'TX-9583', customer: 'Emma Johnson', product: '2ct Round Diamond Ring', amount: 12500, date: '2023-11-28', status: 'completed' },
    { id: 'TX-9582', customer: 'Michael Chen', product: '1.5ct Princess Diamond Earrings', amount: 8750, date: '2023-11-27', status: 'completed' },
    { id: 'TX-9581', customer: 'Sophia Williams', product: '3ct Diamond Tennis Bracelet', amount: 15200, date: '2023-11-26', status: 'processing' },
    { id: 'TX-9580', customer: 'James Smith', product: '1ct Diamond Pendant', amount: 5300, date: '2023-11-25', status: 'completed' },
    { id: 'TX-9579', customer: 'Olivia Brown', product: '2.5ct Cushion Diamond Ring', amount: 18900, date: '2023-11-24', status: 'completed' },
  ];

  // Render bar chart for sales data
  const renderSalesChart = () => {
    const maxSales = Math.max(...salesData.map(item => item.sales));
    
    return (
      <div className="mt-4 h-64">
        <div className="flex items-end h-52 space-x-2">
          {salesData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-all duration-300"
                style={{ 
                  height: `${(item.sales / maxSales) * 100}%`,
                  minHeight: '4px'
                }}
              >
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white text-xs rounded p-1 absolute -mt-8 ml-2">
                  ${(item.sales / 1000).toFixed(1)}k
                </div>
              </div>
              <div className="text-xs mt-2 text-gray-600">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render pie chart for diamond types
  const renderDiamondTypesChart = () => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative w-48 h-48 mx-auto mt-4">
        <div className="w-full h-full rounded-full overflow-hidden">
          {diamondTypes.map((item, index) => {
            const startPercentage = cumulativePercentage;
            cumulativePercentage += item.percentage;
            
            return (
              <div 
                key={index}
                className="absolute w-full h-full"
                style={{
                  background: `conic-gradient(transparent ${startPercentage}%, ${item.color} ${startPercentage}%, ${item.color} ${cumulativePercentage}%, transparent ${cumulativePercentage}%)`
                }}
              />
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white w-32 h-32 rounded-full"></div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2">
          {diamondTypes.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs">{item.type} {item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white shadow-lg rounded-lg p-6 h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 h-96"></div>
            <div className="bg-white shadow-lg rounded-lg p-6 h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Airah Diamonds Dashboard</h1>
            <p className="text-blue-100">Welcome back, Admin</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Report
            </button>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b px-6">
        <div className="flex space-x-8">
          {['overview', 'inventory', 'customers', 'orders', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">${(totalRevenue/1000).toFixed(1)}k</p>
                <p className="text-xs text-green-500 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7h-2z" clipRule="evenodd" />
                  </svg>
                  +12.5% from last month
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Products</p>
                <p className="text-2xl font-bold text-gray-800">{products?.length || 0}</p>
                <p className="text-xs text-purple-500 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  {products?.length > 0 ? `${Math.floor(products.length * 0.15)} new` : '0 new'}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Customers</p>
                <p className="text-2xl font-bold text-gray-800">{users?.length || 0}</p>
                <p className="text-xs text-green-500 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7h-2z" clipRule="evenodd" />
                  </svg>
                  +8.2% from last month
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-800">${averageOrderValue.toFixed(2)}</p>
                <p className="text-xs text-amber-500 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  +5.3% from last month
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Monthly Sales</h2>
              <div className="flex space-x-2">
                <button className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">This Year</button>
                <button className="text-xs text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-full">Last Year</button>
              </div>
            </div>
            {renderSalesChart()}
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <div>
                <p>Total Sales</p>
                <p className="text-lg font-semibold text-gray-800">${(totalRevenue/1000).toFixed(1)}k</p>
              </div>
              <div>
                <p>Highest Month</p>
                <p className="text-lg font-semibold text-gray-800">December</p>
              </div>
              <div>
                <p>Growth</p>
                <p className="text-lg font-semibold text-green-600">+24.5%</p>
              </div>
            </div>
          </div>

          {/* Diamond Types */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Diamond Types</h2>
              <button className="text-sm text-blue-600 hover:underline">View Details</button>
            </div>
            {renderDiamondTypesChart()}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Most Popular</p>
                <p className="text-lg font-semibold text-gray-800">Round Cut</p>
                <p className="text-xs text-blue-600">45% of total sales</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Highest Value</p>
                <p className="text-lg font-semibold text-gray-800">Cushion Cut</p>
                <p className="text-xs text-green-600">$4,250 avg. price</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-1 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Inventory Summary</h2>
              <button className="text-sm text-blue-600 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Diamonds</p>
                    <p className="text-sm text-gray-500">{diamonds?.length || 0} items</p>
                  </div>
                </div>
                <span className="text-blue-600 font-semibold">${(diamonds?.length || 0) * 2500}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-10 bg-purple-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Rings</p>
                    <p className="text-sm text-gray-500">{Math.floor((products?.length || 0) * 0.4)} items</p>
                  </div>
                </div>
                <span className="text-purple-600 font-semibold">${Math.floor((products?.length || 0) * 0.4) * 1800}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Necklaces</p>
                    <p className="text-sm text-gray-500">{Math.floor((products?.length || 0) * 0.3)} items</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">${Math.floor((products?.length || 0) * 0.3) * 1500}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-10 bg-amber-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Earrings</p>
                    <p className="text-sm text-gray-500">{Math.floor((products?.length || 0) * 0.2)} items</p>
                  </div>
                </div>
                <span className="text-amber-600 font-semibold">${Math.floor((products?.length || 0) * 0.2) * 1200}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-10 bg-red-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Bracelets</p>
                    <p className="text-sm text-gray-500">{Math.floor((products?.length || 0) * 0.1)} items</p>
                  </div>
                </div>
                <span className="text-red-600 font-semibold">${Math.floor((products?.length || 0) * 0.1) * 2000}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
              Manage Inventory
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-2 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              <button className="text-sm text-blue-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3">Transaction</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.customer}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.product}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${transaction.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                View All Transactions
              </button>
              <div className="text-sm text-gray-500">
                Showing 5 of 248 transactions
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 flex items-center justify-center text-xl">💍</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">2ct Round Diamond Ring</p>
                    <p className="font-semibold text-blue-600">$12,500</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 flex items-center justify-center text-xl">💎</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">1.5ct Princess Cut Diamond</p>
                    <p className="font-semibold text-blue-600">$8,750</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 flex items-center justify-center text-xl">📿</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">Diamond Tennis Bracelet</p>
                    <p className="font-semibold text-blue-600">$15,200</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Demographics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Age 25-34</p>
                  <p className="text-sm font-medium">42%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Age 35-44</p>
                  <p className="text-sm font-medium">28%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Age 45-54</p>
                  <p className="text-sm font-medium">18%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Age 55+</p>
                  <p className="text-sm font-medium">12%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Female</p>
                  <p className="text-lg font-semibold text-purple-600">68%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Male</p>
                  <p className="text-lg font-semibold text-blue-600">32%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <p>Online Store</p>
                </div>
                <p className="font-medium">65%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Retail Stores</p>
                </div>
                <p className="font-medium">25%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <p>Phone Orders</p>
                </div>
                <p className="font-medium">7%</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  </div>
                  <p>Referrals</p>
                </div>
                <p className="font-medium">3%</p>
              </div>
            </div>
            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Channel Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
