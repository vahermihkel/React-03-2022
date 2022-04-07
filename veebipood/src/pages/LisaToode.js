import { useRef } from "react";
import { Link } from "react-router-dom";

// localStorage <- saadan tooted LisaToode vajutusel, võtan Avaleht minnes
// üksiku toote vaatamine <- võtan localStorage-st, otsin õige toote üles
// HaldaTooted <- uuesti toodete kuvamine nagu Avaleht, kustutamine uuesti nagu Ostukorv

// NELJAP
// maksmine <- API päring (päring interneti)
// muutmine <- localStorage-sse, samamoodi nagu lisamine ja samamoodi nagu üksiku toote vaatamine

// TEISIP
// andmebaas <- API päring (päring interneti)

// ingl k projekt
// tõlked
// bootstrap
// hüpikaknad

function LisaToode() {
  const nimiRef = useRef(); // kasutan vaid HTML-s
  const hindRef = useRef();
  const aktiivneRef = useRef();

  function uusToode() {
    // document.getElementById("nimiId").value - otsiks tervet HTMLi ehk kõik lehed läbi
    console.log(nimiRef.current.value);
    console.log(hindRef.current.value);
    console.log(aktiivneRef.current.checked);
    const toode = {
      nimi: nimiRef.current.value,
      hind: Number(hindRef.current.value),
      aktiivne: aktiivneRef.current.checked
    }
    console.log(toode);
    let tooted = localStorage.getItem("tooted"); // key    |    value
    if (tooted !== null) {
      tooted = JSON.parse(tooted); // []
    } else {
      tooted = [];
    }
    tooted.push(toode);
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return (
  <div>
    <Link to="/admin">
      <button>Tagasi</button>
    </Link>
    <br />
    <label>Nimi</label> <br />
    <input ref={nimiRef} type="text" /> <br />
    <label>Hind</label> <br />
    <input ref={hindRef} type="number" /> <br />
    <label>Aktiivne</label> <br />
    <input ref={aktiivneRef} type="checkbox" /> <br />
    <button onClick={() => uusToode()}>Sisesta</button>
  </div>)
}

export default LisaToode;