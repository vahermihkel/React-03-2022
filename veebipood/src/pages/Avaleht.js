import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {
  // string - sõnalised ---- "12"
  // number - numbrilised ---- 12
  // boolean - kahendVäärtuselised ---- true/false
  // const [s6na, muudaS6na] = useState("Sõnaline muutuja");
  // const [number, muudaNumber] = useState(12);
  // const [kahendV22rtus, muudaKahendV22rtus] = useState(true);
  // const [s6na4, muudaS6na4] = useState("23");
  const [tooted, uuendaTooted] = useState([]);
  const url = "https://react-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";

  useEffect(() => {
    fetch(url) 
      .then(tagastus => tagastus.json()) 
      .then(tagastuseBody => {
        console.log(tagastuseBody);
        const newArray = [];
        for (const voti in tagastuseBody) {
          newArray.push(tagastuseBody[voti]);
        }
        uuendaTooted(newArray);
      });
  },[]);
  // function saaTooted() {
  //   const tootedLS = localStorage.getItem("tooted");

  //   if (tootedLS !== null) {  // if (tootedLS)
  //     return JSON.parse(tootedLS);
  //   } else {
  //     return [
  //       {nimi: "Coca", hind: 1, aktiivne: true},
  //       {nimi: "Fanta", hind: 3, aktiivne: false}, 
  //       {nimi: "Sprite", hind: 2, aktiivne: true},
  //       {nimi: "Vichy", hind: 5, aktiivne: true},
  //       {nimi: "Vitamin well", hind: 8, aktiivne: true}
  //     ];
  //   }
  // }
  // function uuendaK6ik() {
  //   muudaS6na("Muudetud väärtus");
  //   muudaNumber(33);
  //   muudaKahendV22rtus(false);
  //   muudaS6na4("34");
  // }

                    // {nimi: "C", hind: 3, aktiivne: true}
  function lisaOstukorvi(toode) {
    console.log("asdas"); // inspect -> console -- asdas Avaleht.js 30
    console.log(toode); // {nimi: "C", hind: 3, aktiivne: true} - Avaleht.js 31
    // 1. Andmebaas
    // 2. Brauserisse
    // 3. Fail .txt .json

    // tooted.push(toode);
    // uuendaTooted(tooted.slice());

    // localStorage <---
    // {"Coca", hind: 1, kogus: 5},{"Fanta", hind: 2, kogus: 5}  --> liidaKokku kõik element.hind
    //1. let ostukorviTooted = null;
    //2. let ostukorviTooted = "[{nimi: "C", hind: 3, aktiivne: true}]";
    let ostukorviTooted = localStorage.getItem("ostukorviTooted");
    if (ostukorviTooted !== null) { // null - tühjus  !== - ei võrdu
      // 2. ostukorvitooted = [{nimi: "C", hind: 3, aktiivne: true}]
      ostukorviTooted = JSON.parse(ostukorviTooted);
    } else {
      // 1. läheb siia kui on null
      ostukorviTooted = [];
    }
    // 1. [].push({nimi: "C", hind: 3, aktiivne: true})
    // 1. [{nimi: "C", hind: 3, aktiivne: true}]
    // 2. [{nimi: "C", hind: 3, aktiivne: true}].push({nimi: "C", hind: 3, aktiivne: true});
    // 2. [{nimi: "C", hind: 3, aktiivne: true},{nimi: "C", hind: 3, aktiivne: true}]
    ostukorviTooted.push(toode);
              // 1. key="ostukorviTooted"     value="[{nimi: "C", hind: 3, aktiivne: true}]"
              // 2. key="ostukorviTooted"     value="[{nimi: "C", hind: 3, aktiivne: true},{nimi: "C", hind: 3, aktiivne: true}]"
    localStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted));

    // JSON.stringify - ainult sellepärast et brauseri storage nõuab String kuju
    // JSON.parse - ainult sellepärast et brauseri storage annab meile String kuju
  }

  return (
  <div>
    {tooted.map(element => 
      <div>
        <Link to={"/toode/" + element.nimi.replaceAll(" ", "-").toLowerCase()}>
          <div>{element.nimi}</div>
          <div>{element.hind}</div>
        </Link>
        <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
      </div>)}
  </div>)

  // return(
  // <div>
  //   <div>1. {s6na}</div>
  //   <div>2. {number}</div>
  //   <div>3. K: {kahendV22rtus}</div>
  //   <div>4. {s6na4}</div>
  //   <div>5. {number + number}</div>
  //   <div>6. {number + s6na}</div>
  //   <div>7. {number + s6na4}</div>
  //   <div>8. {s6na4 + s6na4}</div>
  //   { kahendV22rtus === true && <div>9. Seda näitan vaid siis kui kahendVäärtus on true</div>}
  //   { s6na.length > 0 && <div>10. Seda näitan vaid siis kui sõna on olemas</div>}
  //   { number > 0 && <div>11. Seda näitan vaid siis kui number on erinev kui 0</div>}
  //   <button onClick={() => uuendaK6ik()}>Muuda sõna</button>
  //   <button onClick={() => muudaS6na("")}>Muuda sõna tühjaks</button>
  //   <button onClick={() => muudaNumber(0)}>Muuda number tühjaks</button>
  // </div>)
}

export default Avaleht;