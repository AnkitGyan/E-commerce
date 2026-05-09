import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import Products from "./pages/products/Products.jsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />    
      <Route path ="/product/:id" element={<ProductDetails/>} />
      <Route path="/products" element={<Products/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
