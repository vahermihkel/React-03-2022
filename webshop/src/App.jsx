import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import ViewProducts from './pages/admin/ViewProducts';
import Categories from './pages/admin/Categories';
import Shops from './pages/Shops';
import NotFound from './pages/NotFound';

function App() {
  return (
      <div>
        <NavigationBar />
        <Routes>
          <Route path="" exact element={ <Home /> } />
          <Route path="poed" exact element={ <Shops /> } />
          <Route path="ostukorv" exact element={ <Cart /> } />
          <Route path="toode/:id" exact element={ <SingleProduct /> } />
          <Route path="admin" exact element={ <AdminHome /> } />
          <Route path="admin/lisa" exact element={ <AddProduct /> } />
          <Route path="admin/muuda/:id" exact element={ <EditProduct /> } />
          <Route path="admin/tooted" exact element={ <ViewProducts /> } />
          <Route path="admin/kategooriad" exact element={ <Categories /> } />
          <Route path="*" exact element={ <NotFound /> } />
        </Routes>
      </div>
  );
}

export default App;
