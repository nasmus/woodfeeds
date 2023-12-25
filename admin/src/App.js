import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogInScreen from '../src/AdminScreen/LogInScreen'
import AdminDashboard from './AdminScreen/AdminDashboard';

import AdminProductList from './AdminScreen/AdminProductList';
import AllOrderScreen from './AdminScreen/AllOrderScreen';
import AllUserListScreen from './AdminScreen/AllUserListScreen';
import Category from './AdminScreen/Category/Category';
import CreateCategory from './AdminScreen/CreateCategory';
import ProdcutUpload from './AdminScreen/ProdcutUpload';
import OrderDetails from './AdminScreen/OrderDetails';
import ProductDetailsScreen from './AdminScreen/ProductDetailsScreen';
import EditProductScreen from './AdminScreen/EditProductScreen';
import CategoryImageAdd from './AdminScreen/Category/CategoryImageAdd';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={ <LogInScreen /> } />
        <Route path='/dashboard' element={ <AdminDashboard /> } />
        <Route path='/productlist' element={ <AdminProductList /> } />
        <Route path='/orderlist' element={ <AllOrderScreen /> } />
        <Route path='/alluserlist' element={ <AllUserListScreen /> } />
        <Route path='/category' element={ <Category /> } />
        <Route path='/category/addcategory' element={ <CreateCategory /> } />
        <Route path='/category/category_image_add' element={ <CategoryImageAdd /> } />
        <Route path='/product-upload' element={ <ProdcutUpload /> } />
        <Route path='/orderdetails/:id' element={ <OrderDetails /> } />
        <Route path='/productdetails/:id' element={ <ProductDetailsScreen /> } />
        <Route path='/editproduct/:id' element={<EditProductScreen />} />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
