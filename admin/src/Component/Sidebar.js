import React,{useContext} from 'react'
import "../Css/Sidebar.css"
import SidebarRow from './SidebarRow'
import {Link } from 'react-router-dom';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaidIcon from '@mui/icons-material/Paid';
import AppsIcon from '@mui/icons-material/Apps';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Store } from '../Store';

function Sidebar() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const signOutHandler = () => {
        ctxDispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
      };
    return (
        <div className="sidebar">
            <Link className='dashboard' to='/dashboard'>
                <SidebarRow Icon={AppsIcon} title="DashBoard" /> 
            </Link>
            <Link className="sidebar__link" to="/product-upload">
                <SidebarRow Icon={RateReviewIcon} title="Prdouct Upload" />
            </Link>
            
            <Link className="sidebar__link" to="/productlist">
                <SidebarRow Icon={AlignHorizontalLeftIcon} title="Product List" />
            </Link>
            <Link className="sidebar__link" to="/alluserlist">
                <SidebarRow  Icon={AddToHomeScreenIcon} title="User List" />
            </Link>

            <Link className="sidebar__link" to="/orderlist">
                <SidebarRow Icon={ShoppingCartIcon} title="Order List" />
            </Link>
            <Link className="sidebar__link" to="/category">
                <SidebarRow Icon={AccountTreeIcon} title="Category" />
            </Link>

            {/* <Link className="sidebar__link" to="/works">
                <SidebarRow Icon={BarChartIcon} title="Statistics" />
            </Link>
            
            <Link className="sidebar__link" to="/portfolio">
                <SidebarRow Icon={RateReviewIcon} title="Reviews" />
            </Link>
            <Link className="sidebar__link" to="/transection">
                <SidebarRow Icon={PaidIcon} title="Transactions" />
            </Link> */}
            <Link className="sidebar__link" to="/profile">
                <SidebarRow Icon={PersonIcon} title="Proifle" />
            </Link>
            <Link to="/" onClick={signOutHandler} className="sidebar__link" >
                <SidebarRow Icon={ExitToAppIcon} title="Log Out" />
            </Link>
            
        </div>
    )
}

export default Sidebar