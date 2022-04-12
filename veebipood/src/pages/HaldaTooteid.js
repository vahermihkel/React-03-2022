import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {
  // tooted = [];
  const [tooted, uuendaTooted] = useState([]);
  const url = "https://react-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";

  // parameetri panen sellel eesmärgil kui tahan kindlale tootele midagi teha

  // ei ole vaja parameetrit: kustutaKõikTooted()    võtaKõikTooted()

  // on vaja parameetrit: kustutaÜksKindel(toode)    lisaÜksKindel(toode)   võtaÜksKindel(toode)
  // function saaTooted() {

  useEffect(() => { // väldib uuesti sisse minemist kui useState käima pannakse
    fetch(url) // HTTP päring 
      .then(tagastus => tagastus.json()) // terve tagastus (status code + time + headers + body)
      .then(tagastuseBody => {  // teine .then on tagastuse body
        console.log(tagastuseBody); // {-N-asd: {Toode1}}, -lwtj: {Toode2}}
        const newArray = []; // newArray = []
        // 1. voti = -N-asd
        //  [].push({Toode1})
        // 2. voti = -lwtj
        // [{Toode1}].push({Toode2})
        // ---> [{Toode1}, {Toode2}]
        for (const voti in tagastuseBody) {
          newArray.push(tagastuseBody[voti]);
        }
        uuendaTooted(newArray); // uuendatakse HTMLi, aga kuna on useEffect sees, siis ei loopi
      });
  },[]);

  // makse
  // andmebaas
  // pakiautomaatide osas
  // sisselogimine-registreerumine
  // e-maili saatmine
  // piltide/videode üleslaadimine

    
    // const tootedLS = localStorage.getItem("tooted");
    // if (tootedLS) { // !== null
    //   return JSON.parse(tootedLS);
    // } else {
    //   return [];
    // }
    // return [];
  // }

  function kustuta(toode) {
    console.log(toode); // <--- ei saa korralikult toodet kätte HTML-st
    const j2rjekorraNumber = tooted.indexOf(toode);
    console.log(j2rjekorraNumber); // <--- ei saa indexit kätte
    tooted.splice(j2rjekorraNumber,1);
    console.log(tooted); // <---- ei saanud kustutatud
    uuendaTooted(tooted.slice());
    // localStorage.setItem("tooted", JSON.stringify(tooted)); 
    fetch(url,
      {
        method: "PUT",
        body: JSON.stringify(tooted),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
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