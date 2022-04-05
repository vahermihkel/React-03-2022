import { useRef } from "react";
import { Link } from "react-router-dom";

function LisaToode() {
  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivneRef = useRef();

  function uusToode() {
    console.log(nimiRef.current.value);
    console.log(hindRef.current.value);
    console.log(aktiivneRef.current.checked);
    const toode = {
      nimi: nimiRef.current.value,
      hind: hindRef.current.value,
      aktiivne: aktiivneRef.current.checked
    }
    console.log(toode);
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