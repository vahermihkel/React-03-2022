import { Link } from "react-router-dom";

function Menüü() {

  function muudaKeelt(lang) {
    const vanaKeel = localStorage.getItem("language");

    console.log("enne oli: " + vanaKeel + ", uus keel on: " + lang);

    // parem klõps -> inspect -> application
    localStorage.setItem("language", lang);
  }

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
    <button onClick={() => muudaKeelt('et')}>EE</button>
    <button onClick={() => muudaKeelt('ru')}>RU</button>
  </div>)
}

export default Menüü;