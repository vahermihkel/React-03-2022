import { Route, Routes } from 'react-router-dom';
import './App.css';
import Menüü from './components/Menüü';
import AdminHome from './pages/AdminHome';
import Avaleht from './pages/Avaleht';
import Ostukorv from './pages/Ostukorv';
import LisaToode from './pages/LisaToode';
import HaldaTooteid from './pages/HaldaTooteid';

// cmd -> npm start järgselt
// brauseris -> parem klõps -> inspect -> console
function App() {
  return (
    <div>
      <Menüü />
      {/* Routes sees on defineeritud kõik URL ja lehtede seosed */}
      <Routes> 
        {/* localhost:3000/ näitab Avaleht.js sisu */}
        <Route path='/' exact element={ <Avaleht /> } />
        {/* localhost:3000/checkout näitab Ostukorv.js sisu */}
        <Route path='/checkout' exact element={ <Ostukorv /> } />
        <Route path='/admin' exact element={ <AdminHome /> } />
        <Route path='/admin/lisa-toode' exact element={ <LisaToode /> } />
        <Route path='/admin/halda-tooteid' exact element={ <HaldaTooteid /> } />
      </Routes>
    </div>
  );
}

export default App;
