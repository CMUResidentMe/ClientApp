import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//CLIENT
import HomePage from "./pages/Home.js";
import ManagerHome from "./pages/ManagerHome.js";
import LoginPage from "./auth/LoginPage.js";
import RegisterPage from "./auth/RegisterPage.js";
import CommunityBoardPage from "./pages/CommunityBoard/CommunityBoardPage.js";
import MarketplacePage from "./pages/MarketPlace/MarketplacePage.js";
import BookingPage from "./pages/Booking/BookingPage.js";
import CancelbookPage from "./pages/Booking/CancelbookPage.js";
import NotificationPage from "./pages/Notification/NotificationTable.jsx";
import ResidentWKPage from "./pages/WorkOrder/ResidentWKPage.jsx";
import StaffWKPage from "./pages/WorkOrder/StaffWKPage.jsx";

//MANAGER
import BookingManager from "./pages/Booking/BookingManager.js";

const AppRouter = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/manager-home" element={<ManagerHome />} />
        <Route
          path="/register"
          element={<RegisterPage privilege="resident" />}
        />
        <Route
          path="/staff-register"
          element={<RegisterPage privilege="admin" />}
        />
        <Route path="/community-board" element={<CommunityBoardPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/work-order" element={<ResidentWKPage />} />
        <Route path="/staff-work-order" element={<StaffWKPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-manager" element={<BookingManager />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/cancel-booking" element={<CancelbookPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
