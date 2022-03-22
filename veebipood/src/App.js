import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import Ostukorv from './pages/Ostukorv';

// cmd -> npm start järgselt
// brauseris -> parem klõps -> inspect -> console
function App() {
  return (
    <div>
      <div>
        <Link to={"/"}>
          <button className='nupp'>Avalehele</button>
        </Link>
        <Link to={"/ostukorv"}>
          <button>Ostukorvi</button>
        </Link>
      </div>
      <Routes>
        {/* localhost:3000/ */}
        <Route path='/' exact element={ <Avaleht /> } />
        {/* localhost:3000/ostukorv */}
        <Route path='/ostukorv' exact element={ <Ostukorv /> } />
      </Routes>
    </div>
  );
}

export default App;
