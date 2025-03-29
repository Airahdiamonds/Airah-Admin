import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState({});
  const dispatch = useDispatch();

  const toggleExpand = (title) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const navItems = [
    { title: "Dashboard", path: "/" },
    {
      title: "Analytics",
      children: [
        { title: "Sales Overview", path: "/analytics/sales" },
        { title: "Recent Activity", path: "/analytics/activity" },
      ],
    },
    {
      title: "Products",
      children: [
        { title: "Add Product", path: "/addProducts" },
        { title: "Products List", path: "/productsList" },
      ],
    },
    { title: "Users", path: "/userList" },
    { title: "Orders", path: "/orderList" },
  ];

  return (
    <div className="w-64 bg-white text-gray-800 h-screen shadow-md flex flex-col">
      {/* Company Logo */}
      <div className="flex items-center justify-center p-2 border-b border-gray-200">
        <img src="/logo.webp" alt="Company Logo" className="h-16 w-auto" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 ">
        <ul>
          {navItems.map((item) => (
            <li key={item.title} className="mb-2">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.title)}
                    className="flex items-center justify-between w-full px-4 py-2 rounded-md text-md font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                  >
                    <span>{item.title}</span>
                    {expanded[item.title] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expanded[item.title] && (
                    <ul className="ml-5 mt-2 border-l-2 border-gray-300 pl-3">
                      {item.children.map((child) => (
                        <li key={child.title} className="mt-2">
                          <Link
                            to={child.path}
                            className={`block px-4 py-2 rounded-md text-gray-700 font-medium border border-gray-200 hover:bg-gray-100 transition-all duration-300 ${
                              location.pathname === child.path ? "bg-gray-300 border-gray-400" : ""
                            }`}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded-md text-md font-semibold border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300 ${
                    location.pathname === item.path ? "bg-gray-300 border-gray-400" : ""
                  }`}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => dispatch(logout())}
        className="flex items-center justify-center w-[90%] mx-auto px-4 py-2 mb-4 rounded-md bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold text-md shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300"
      >
        <LogOut className="mr-2" /> Logout
      </button>
    </div>
  );
}
