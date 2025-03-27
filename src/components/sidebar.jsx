"use client"

import * as React from "react"
import { Diamond, LayoutDashboard, Package, Plus, Settings, ShoppingBag, Users, ChevronLeft, ChevronRight, Sparkles, Search, Bell, User, BarChart3, DollarSign, Clock, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeItem, setActiveItem] = React.useState("/")
  const [expandedItems, setExpandedItems] = React.useState({
    "Analytics": false,
    "Products": false,
    "Diamonds": true,
    "Styles": false
  })

  // Group the navigation items
  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      children: [
        {
          title: "Sales Overview",
          path: "/analytics/sales",
          icon: <DollarSign className="h-4 w-4" />,
        },
        {
          title: "Recent Activity",
          path: "/analytics/activity",
          icon: <Clock className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Products",
      icon: <ShoppingBag className="h-5 w-5" />,
      children: [
        {
          title: "Add Product",
          path: "/addProducts",
          icon: <Plus className="h-4 w-4" />,
        },
        {
          title: "Products List",
          path: "/productsList",
          icon: <Package className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Diamonds",
      icon: <Diamond className="h-5 w-5" />,
      children: [
        {
          title: "Add Diamond",
          path: "/addDiamonds",
          icon: <Plus className="h-4 w-4" />,
        },
        {
          title: "Diamonds List",
          path: "/diamondsList",
          icon: <Package className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Styles",
      icon: <Sparkles className="h-5 w-5" />,
      children: [
        {
          title: "Add Style",
          path: "/addStyles",
          icon: <Plus className="h-4 w-4" />,
        },
        {
          title: "Styles List",
          path: "/stylesList",
          icon: <Package className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Users",
      icon: <Users className="h-5 w-5" />,
      path: "/userList",
    },
    {
      title: "Master Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/master",
    },
  ]

  // Toggle sidebar
  const toggleSidebar = () => {
    setOpen(!open)
  }

  // Toggle submenu
  const toggleSubmenu = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Handle navigation item click
  const handleNavClick = (path) => {
    setActiveItem(path)
  }

  // Diamond hover effect component
  const DiamondHover = ({ children }) => {
    return (
      <div className="group relative overflow-hidden">
        {children}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -inset-full top-0 left-1/2 w-1/4 h-1/4 bg-white rotate-45 transform -translate-x-1/2 -translate-y-1/2 group-hover:animate-diamond-sparkle"></div>
        </div>
      </div>
    )
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-black text-white transition-all duration-300 ease-in-out flex flex-col ${
        open ? "w-64" : "w-20"
      } shadow-xl`}
    >
      {/* Logo */}
      <div className={`flex items-center justify-center h-20 border-b border-gray-800 ${open ? "px-6" : "px-2"}`}>
        <div className="flex items-center gap-3">
          <DiamondHover>
            <Diamond className={`h-8 w-8 text-white filter drop-shadow-lg ${!open && "mx-auto"}`} />
          </DiamondHover>
          {open && (
            <div className="font-serif text-xl font-bold text-white">
              <span>Airah</span>
              <span className="text-gray-400">Diamonds</span>
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className={`flex items-center gap-3 p-4 border-b border-gray-800 ${!open && "justify-center"}`}>
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-black"></div>
        </div>
        {open && (
          <div className="flex flex-col">
            <span className="font-medium text-white">Admin User</span>
            <span className="text-xs text-gray-400">admin@airahdiamonds.com</span>
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
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.path ? (
                <DiamondHover>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 w-full ${
                      activeItem === item.path
                        ? "bg-gray-800 text-white font-medium"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } ${!open && "justify-center p-2"}`}
                    title={!open ? item.title : ""}
                  >
                    {item.icon}
                    {open && <span>{item.title}</span>}
                  </button>
                </DiamondHover>
              ) : (
                <div className="space-y-1">
                  <div
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex items-center gap-3 px-3 py-2 text-gray-300 font-medium cursor-pointer hover:bg-gray-800 hover:text-white rounded-lg ${
                      !open && "justify-center p-2"
                    }`}
                    title={!open ? item.title : ""}
                  >
                    {item.icon}
                    {open && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expandedItems[item.title] ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </div>

                  {open && item.children && expandedItems[item.title] && (
                    <ul className="pl-10 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <DiamondHover>
                            <button
                              onClick={() => handleNavClick(child.path)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 w-full ${
                                activeItem === child.path
                                  ? "bg-gray-700 text-white font-medium"
                                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                              }`}
                            >
                              {child.icon}
                              <span>{child.title}</span>
                            </button>
                          </DiamondHover>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!open && item.children && (
                    <ul className="space-y-1">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <DiamondHover>
                            <button
                              onClick={() => handleNavClick(child.path)}
                              className={`flex justify-center items-center p-2 rounded-md transition-colors duration-200 w-full ${
                                activeItem === child.path
                                  ? "bg-gray-700 text-white"
                                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                              }`}
                              title={child.title}
                            >
                              {child.icon}
                            </button>
                          </DiamondHover>
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
        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-900 p-3 rounded-lg shadow-sm flex items-center gap-3">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-300" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white"></div>
            </div>
            <div className="text-sm">
              <div className="font-medium text-white">New Notifications</div>
              <div className="text-xs text-gray-400">You have 5 unread messages</div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-800 flex justify-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200"
          title={open ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>
    </aside>
  )
}
