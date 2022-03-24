import { Link } from "react-router-dom";

function Menüü() {
  return (
  <div>
    {/* URLi muutmine käib ainult <Link to=""> abil 
    see mille abil URLi muudan ehk klikin peale, peab olema <Link></Link> sees
    Link peab olema imporditud, et talle ligi pääseda
    */}
    <Link to="/"> 
      <button className='nupp'>Avalehele</button>
    </Link>
    <Link to="/checkout">
      <button>Ostukorvi</button>
    </Link>
    <Link to="/admin">
      <button>Admin vaatesse</button>
    </Link>
  </div>)
}

export default Menüü;