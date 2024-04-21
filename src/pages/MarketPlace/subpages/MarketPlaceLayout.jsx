import {Outlet} from "react-router-dom";
import HeaderBar from "../components/HeaderBar.jsx";


const MarketPlaceLayout = () => {
    return (
        <div>
            <HeaderBar />
            <Outlet />
        </div>
    )
}
export default MarketPlaceLayout;