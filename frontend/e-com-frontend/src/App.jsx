import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import Products from "./pages/products/Products.jsx";
import Register from "./user/register/Register.jsx";
import Login from "./user/login/Login.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice.js";
import UserDashboard from "./user/userDashboard/UserDashboard.jsx";
import Profile from "./user/profile/Profile.jsx";

function App() {

  const {isAuthenticated, user} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />    
      <Route path ="/product/:id" element={<ProductDetails/>} />
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:keyword" element={<Products/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    {isAuthenticated && <UserDashboard user={user}/>}
    </BrowserRouter>
  );
}

export default App;
