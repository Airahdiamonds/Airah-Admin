import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  Clock,
  ShoppingBag,
  Plus,
  Package,
  Diamond,
  Sparkles,
  Users,
  Settings,
  BookCheck,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (title) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const navItems = [
    { title: "Dashboard", icon: <LayoutDashboard />, path: "/" },
    {
      title: "Analytics",
      icon: <BarChart3 />,
      children: [
        {
          title: "Sales Overview",
          path: "/analytics/sales",
          icon: <DollarSign />,
        },
        {
          title: "Recent Activity",
          path: "/analytics/activity",
          icon: <Clock />,
        },
      ],
    },
    {
      title: "Products",
      icon: <ShoppingBag />,
      children: [
        { title: "Add Product", path: "/addProducts", icon: <Plus /> },
        { title: "Products List", path: "/productsList", icon: <Package /> },
      ],
    },
    {
      title: "Diamonds",
      icon: <Diamond />,
      children: [
        { title: "Add Diamond", path: "/addDiamonds", icon: <Plus /> },
        { title: "Diamonds List", path: "/diamondsList", icon: <Package /> },
      ],
    },
    {
      title: "Styles",
      icon: <Sparkles />,
      children: [
        { title: "Add Style", path: "/addStyles", icon: <Plus /> },
        { title: "Styles List", path: "/stylesList", icon: <Package /> },
      ],
    },
    { title: "Users", icon: <Users />, path: "/userList" },
    { title: "Master Settings", icon: <Settings />, path: "/master" },
    { title: "Orders", icon: <BookCheck />, path: "/orderList" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <ul>
        {navItems.map((item) => (
          <li key={item.title} className="mb-2">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.title)}
                  className="flex items-center w-full p-2 hover:bg-gray-700 rounded"
                >
                  {item.icon} <span className="ml-3">{item.title}</span>
                </button>
                {expanded[item.title] && (
                  <ul className="ml-5 mt-2">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <Link
                          to={child.path}
                          className={`flex items-center p-2 rounded ${
                            location.pathname === child.path
                              ? "bg-gray-700"
                              : "hover:bg-gray-700"
                          }`}
                        >
                          {child.icon}{" "}
                          <span className="ml-2">{child.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded ${
                  location.pathname === item.path
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon} <span className="ml-3">{item.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
