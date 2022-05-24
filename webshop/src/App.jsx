import { Navigate, Route, Routes } from 'react-router-dom';
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
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import ShopsSettings from './pages/admin/ShopsSettings';

function App() {
  const authCtx = useContext(AuthContext);

  return (
      <div>
        <NavigationBar />
        <Routes>
          <Route path="" exact element={ <Home /> } />
          <Route path="poed" exact element={ <Shops /> } />
          <Route path="ostukorv" exact element={ <Cart /> } />
          <Route path="toode/:id" exact element={ <SingleProduct /> } />
          <Route path="logi-sisse" exact element={ <SignIn /> } />
         { authCtx.loggedIn && 
          <>
            <Route path="admin" exact element={ <AdminHome /> } />
            <Route path="admin/lisa" exact element={ <AddProduct /> } />
            <Route path="admin/muuda/:id" exact element={ <EditProduct /> } />
            <Route path="admin/tooted" exact element={ <ViewProducts /> } />
            <Route path="admin/kategooriad" exact element={ <Categories /> } />
            <Route path="admin/lisa-kasutaja" exact element={ <SignUp /> } />
            <Route path="admin/halda-poode" exact element={ <ShopsSettings /> } />
          </>
         }
         { !authCtx.loggedIn && <Route path="admin/*" exact element={ <Navigate to="/logi-sisse" /> } />}
          <Route path="*" exact element={ <NotFound /> } />
        </Routes>
      </div>
  );
}

export default App;

// if (authCtx.loggedIn) {
//   // näita admin asju
// } else {
//   // näta signIn-mist
// }

// if (authCtx.loggedIn) {
//   // näita admin asju
// }
// if (!authCtx.loggedIn) {
//    // näta signIn-mist
// }
