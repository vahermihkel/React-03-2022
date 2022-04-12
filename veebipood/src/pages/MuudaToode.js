import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useHistory()    .push()

function MuudaToode() {
  // localhost:3000/admin/muuda/:toodeName
  // react03202.web.app/admin/muuda/:toodeName

  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivneRef = useRef();
  const { toodeName } = useParams();
  const [tooted, uuendaTooted] = useState([]); // kui on andmebaasipäring, siis ta jõuab alati
  // enne HTMLi valmis teha ja alles siis on andmebaasipäring valmis
  const [toode, uuendaToode] = useState({}); // alguses näidatakse HTML-s {} tühja objekti
  const url = "https://react-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";
  const navigate = useNavigate();

  useEffect(() => { 
    fetch(url)
      .then(tagastus => tagastus.json()) 
      .then(tagastuseBody => {  
        const newArray = []; 
        for (const voti in tagastuseBody) {
          newArray.push(tagastuseBody[voti]);
        }
        uuendaTooted(newArray); 
        const toodeLeitud = newArray.find(element => 
          element.nimi.replace(" ", "-").toLowerCase() === toodeName);
        uuendaToode(toodeLeitud); // uuendab HTMLi, enam ei ole tühi objekt
      });
  },[]);

  function uuendatudToode() {
    const j2rjekorraNumber = tooted.indexOf(toode);
    tooted[j2rjekorraNumber] = {
      nimi: nimiRef.current.value,
      hind: Number(hindRef.current.value),
      aktiivne: aktiivneRef.current.checked
    };
    // localStorage.setItem("tooted", JSON.stringify(tooted));
    fetch(url,
      {
        method: "PUT",
        body: JSON.stringify(tooted),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(tagastus => {
      if (tagastus.status === 200) {
        navigate("/admin/halda-tooteid");
      }
    })
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