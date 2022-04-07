import { useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  const [tooted, uuendaTooted] = useState(saaTooted());

  // parameetri panen sellel eesmärgil kui tahan kindlale tootele midagi teha

  // ei ole vaja parameetrit: kustutaKõikTooted()    võtaKõikTooted()

  // on vaja parameetrit: kustutaÜksKindel(toode)    lisaÜksKindel(toode)   võtaÜksKindel(toode)
  function saaTooted() {
    const tootedLS = localStorage.getItem("tooted");
    if (tootedLS) { // !== null
      return JSON.parse(tootedLS);
    } else {
      return [];
    }
  }

  function kustuta(toode) {
    console.log(toode); // <--- ei saa korralikult toodet kätte HTML-st
    const j2rjekorraNumber = tooted.indexOf(toode);
    console.log(j2rjekorraNumber); // <--- ei saa indexit kätte
    tooted.splice(j2rjekorraNumber,1);
    console.log(tooted); // <---- ei saanud kustutatud
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
        <Link to={"/admin/muuda/" + 
          element.nimi
          .replace(" ", "-")
          .toLowerCase()} >
          <button>Muuda</button>
        </Link>
      </div>
    )}
  </div>)
}

export default HaldaTooteid;