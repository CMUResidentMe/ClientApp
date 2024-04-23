import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//CLIENT
import HomePage from "./pages/Home.jsx";
import ManagerHome from "./pages/ManagerHome.js";
import LoginPage from "./auth/LoginPage.js";
import RegisterPage from "./auth/RegisterPage.js";
import CommunicationBoardPage from "./pages/CommunicationBoard/CommunicationBoardPage.jsx";
// import WorkOrderPage from "./pages/WorkOrder/WorkOrderPage.jsx";
import BookingPage from "./pages/Booking/BookingPage.js";
import CancelbookPage from "./pages/Booking/CancelbookPage.js";
import NotificationPage from "./pages/Notification/NotificationTable.jsx";
import BookingManager from "./pages/Booking/BookingManager.jsx";
import ResidentWKPage from "./pages/WorkOrder/ResidentWKPage.jsx";
import StaffWKPage from "./pages/WorkOrder/StaffWKPage.jsx";
import MarketPlaceLayout from "./pages/MarketPlace/subpages/MarketPlaceLayout.jsx";
import MarketPlaceHomePage from "./pages/MarketPlace/subpages/MarketPlaceHomePage.jsx";
import MarketPlacePublishPage from "./pages/MarketPlace/subpages/MarketPlacePublishPage.jsx";
import MarketPlaceUpdatePage from "./pages/MarketPlace/subpages/MarketPlaceUpdatePage.jsx";
import MarketPlaceProductDetail from "./pages/MarketPlace/subpages/MarketPlaceProductDetail.jsx";
import MarketPlaceMyProducts from "./pages/MarketPlace/subpages/MarketPlaceMyProducts.jsx";
import MarketPlaceMyOrders from "./pages/MarketPlace/subpages/MarketPlaceMyOrders.jsx";
import MarketPlaceIndexPage from "./pages/MarketPlace/subpages/MarketPlaceIndexPage.jsx";
import MarketPlaceSoldProducts from "./pages/MarketPlace/subpages/MarketPlaceSoldProducts.jsx";

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
        <Route
          path="/communication-board"
          element={<CommunicationBoardPage />}
        />
        <Route path="/work-order" element={<ResidentWKPage />} />
        <Route path="/staff-work-order" element={<StaffWKPage />} />
        <Route path="/marketplace" element={<MarketPlaceLayout />}>
          <Route path={""} index element={<MarketPlaceIndexPage />} />
          <Route path={"playground"} element={<MarketPlaceHomePage />} />
          <Route path={"publish"} element={<MarketPlacePublishPage />} />
          <Route path={"update/:goodsId"} element={<MarketPlaceUpdatePage />} />
          <Route path={"my-goods"} element={<MarketPlaceMyProducts />} />
          <Route path={"my-orders"} element={<MarketPlaceMyOrders />} />
          <Route path={"my-sold"} element={<MarketPlaceSoldProducts />} />
          <Route
            path={"goods/:goodsId"}
            element={<MarketPlaceProductDetail />}
          />
        </Route>
        {/*<Route path="/work-order" element={<WorkOrderPage />} />*/}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/booking-manager" element={<BookingManager />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/cancel-booking" element={<CancelbookPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
