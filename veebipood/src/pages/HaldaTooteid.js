import { useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  const [tooted, uuendaTooted] = useState(saaTooted());

  function saaTooted() {
    const tootedLS = localStorage.getItem("tooted");
    if (tootedLS) { // !== null
      return JSON.parse(tootedLS);
    } else {
      return [];
    }
  }

  function kustuta(toode) {
    const j2rjekorraNumber = tooted.indexOf(toode);
    tooted.splice(j2rjekorraNumber,1);
    uuendaTooted(tooted.slice());
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return (
  <div>
    <Link to="/admin">
      <button>Tagasi</button>
    </Link>
    {tooted.map(element => 
      <div>
        <div>{element.nimi}</div>
        <div>{element.hind}</div>
        <button onClick={() => kustuta(element)}>Kustuta</button>
        <button>Muuda</button>
      </div>
    )}
  </div>)
}

export default HaldaTooteid;