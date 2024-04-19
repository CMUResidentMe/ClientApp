import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//CLIENT
import HomePage from "./pages/Home.js";
import ManagerHome from "./pages/ManagerHome.js";
import LoginPage from "./auth/LoginPage.js";
import RegisterPage from "./auth/RegisterPage.js";
import CommunityBoardPage from "./pages/CommunityBoard/CommunityBoardPage.js";
import MarketplacePage from "./pages/MarketPlace/MarketplacePage.js";
import WorkOrderPage from "./pages/WorkOrder/WorkOrderPage.jsx";
import BookingPage from "./pages/Booking/BookingPage.js";
import NotificationPage from "./pages/Notification/NotificationBar.jsx";
import BookingManager from "./pages/Booking/BookingManager.js";
import UserMPDashboard from "./pages/MarketPlace/UserMPDashboard.js";
import ItemRequests from "./pages/MarketPlace/ItemRequests.js";
import Detail from "./pages/MarketPlace/ItemDetail.js";
import AddListItem from "./pages/MarketPlace/NewItemForm.js";
import ListingCategory from "./pages/MarketPlace/ListingCategories.js";
import ListedProduct from "./pages/MarketPlace/ListedProduct.js";

//MANAGER

const AppRouter = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/manager-home" element={<ManagerHome />} />
        <Route path="/register" element={<RegisterPage privilege="resident"/>} />
        <Route path="/staff-register" element={<RegisterPage privilege="admin"/>} />
        <Route path="/community-board" element={<CommunityBoardPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/work-order" element={<WorkOrderPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-manager" element={<BookingManager />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/UserMPDashboard" element={<UserMPDashboard />} />
        <Route path="/itemRequests/:id" element={<ItemRequests />}/>
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/addListItem" element={<AddListItem />} />
        <Route path="/categories/:id" element={<ListingCategory />}/>
        <Route path="/listedproduct/:id" element={<ListedProduct />}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
