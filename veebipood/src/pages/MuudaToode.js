import { useRef } from "react";
import { useParams } from "react-router-dom";

function MuudaToode() {
  // localhost:3000/admin/muuda/:toodeName
  // react03202.web.app/admin/muuda/:toodeName

  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivneRef = useRef();
  const { toodeName } = useParams();

  let tooted = localStorage.getItem("tooted");
  let toode = {};
  if (tooted) {// if (tooted !== null)
    tooted = JSON.parse(tooted);
    toode = tooted.find(element => 
      element.nimi.replace(" ", "-").toLowerCase() === toodeName);
  }

  console.log(toodeName);

  function uuendatudToode() {
    const j2rjekorraNumber = tooted.indexOf(toode);

    tooted[j2rjekorraNumber] = {
      nimi: nimiRef.current.value,
      hind: Number(hindRef.current.value),
      aktiivne: aktiivneRef.current.checked
    };

    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return (<div>

    <label>Nimi</label> <br />
    <input ref={nimiRef} defaultValue={toode.nimi} type="text" /> <br />
    <label>Hind</label> <br />
    <input ref={hindRef} defaultValue={toode.hind} type="number" /> <br />
    <label>Aktiivne</label> <br />
    <input ref={aktiivneRef} defaultChecked={toode.aktiivne} type="checkbox" /> <br />
    <button onClick={() => uuendatudToode()}>Sisesta</button>

  </div>);
}

export default MuudaToode;