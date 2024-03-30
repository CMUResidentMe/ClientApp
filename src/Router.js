import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//CLIENT
import HomePage from "./pages/Home";
import ManagerHome from "./pages/ManagerHome";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import CommunityBoardPage from "./pages/CommunityBoard/CommunityBoardPage";
import MarketplacePage from "./pages/MarketPlace/MarketplacePage";
import WorkOrderPage from "./pages/WorkOrder/WorkOrderPage";
import BookingPage from "./pages/Booking/BookingPage";
import NotificationPage from "./pages/Notification/NotificationPage";
import BookingManager from "./pages/Booking/BookingManager";
//MANAGER

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/manager-home" element={<ManagerHome />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/community-board" element={<CommunityBoardPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/work-order" element={<WorkOrderPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-manager" element={<BookingManager />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
