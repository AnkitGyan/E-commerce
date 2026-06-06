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
import UpdateProfile from "./user/updateProfile.jsx/UpdateProfile.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import UpdatePassword from "./user/updatePassword/UpdatePassword.jsx";
import ForgotPassword from "./user/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./user/resetPassword/ResetPassword.jsx";
import Cart from "./cart/cartItems/Cart.jsx";
import Shipping from "./cart/shipping/Shipping.jsx";
import OrderConfirm from "./cart/orderConfirm/OrderConfirm.jsx";
import Payment from "./cart/payment/Payment.jsx";
import PaymentSuccess from "./cart/payment/PaymentSuccess.jsx";
import MyOrders from "./orders/MyOrders.jsx";
import OrderDetails from "./orders/OrderDetails.jsx";
import Dashboard from "./admin/dashboard/Dashboard.jsx";

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
      <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile/>}/>}/>
      <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}/>
      <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword/>}/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/reset/:token" element={<ResetPassword/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/shipping" element={<ProtectedRoute element={<Shipping/>}/>}/>
      <Route path="/order/confirm" element={<ProtectedRoute element={<OrderConfirm/>}/>}/>
      <Route path="/process/payment" element={<ProtectedRoute element={<Payment/>}/>}/>
      <Route path="/paymentSuccess" element={<ProtectedRoute element={<PaymentSuccess/>}/>}/>
      <Route path="/orders/user" element={<ProtectedRoute element={<MyOrders/>}/>}/>
      <Route path="/order/:orderId" element={<ProtectedRoute element={<OrderDetails/>}/>}/>
       {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard/>}/>}/>
    </Routes>
    {isAuthenticated && <UserDashboard user={user}/>}
    </BrowserRouter>
  );
}

export default App;
