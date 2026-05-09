import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />    
      <Route path ="/product/:id" element={<ProductDetails/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
