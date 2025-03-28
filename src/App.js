import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Sidebar from "./components/sidebar";
import ProductsList from "./screens/Admin/ProductsList";
import AddProduct from "./screens/Admin/AddProduct";
import AdminDashboard from "./screens/Admin/Dashboard";
import UsersList from "./screens/Admin/UsersList";
import Master from "./screens/Admin/Master";
import AddDiamond from "./screens/Admin/AddDiamond";
import AddStyle from "./screens/Admin/AddStyle";
import DiamondsList from "./screens/Admin/DiamondsList";
import StylesList from "./screens/Admin/StylesList";
import Orders from "./screens/Admin/Orders";
import Login from "./screens/Admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";

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
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 ">
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/addProducts" element={<AddProduct />} />
                      <Route path="/productsList" element={<ProductsList />} />
                      <Route path="/userList" element={<UsersList />} />
                      <Route path="/orderList" element={<Orders />} />
                      <Route path="/master" element={<Master />} />
                      <Route path="/addDiamonds" element={<AddDiamond />} />
                      <Route path="/addStyles" element={<AddStyle />} />
                      <Route path="/diamondsList" element={<DiamondsList />} />
                      <Route path="/stylesList" element={<StylesList />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
