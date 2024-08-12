import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import ProductList from "./Components/ProductList";
import Product from "./Components/Product";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Register from "./Components/Register";
import OrderDetails from "./Components/OrderDetails";
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<ProtectedRoute component={Product}/> } />
          <Route path="/cart" element={<ProtectedRoute component={Cart}/> } />
          <Route path="/order/:id" element={<ProtectedRoute component={OrderDetails}/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
