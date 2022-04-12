import { useState } from "react";

function Ostukorv() {
  // ["element nr1","element nr2",4,5,6]
  // 1. Muutujad
  
  // useState - vasakpoolset kasutan HTML-s (ostukorv)
  // parempoolse abil muudan vasakpoolset - kui toimub muutus, siis uueneb ka HTML
  // useState - on vaja importida, Reacti väljamõeldud kood, mis on node_modules kaustas
  // useState() - sulgude sees on vasakpoolse muutuja algväärtus ehk mida näidatakse sel hetkel
  //            kui lehele tullakse
  const [ostukorv, muudaOstukorvi] = useState(saaOstukorviTooted());

  function saaOstukorviTooted() {
                    // "[{..},{..},{..}]" --> JSON.parse() -->  [{..},{..},{..}]
    if (localStorage.getItem("ostukorviTooted") !== null) {
      return JSON.parse(localStorage.getItem("ostukorviTooted"));
    } else {
      return [];
    }
  }
                // "element nr1"
  function kustutaToode(toode) {
// js how to delete element from array
// stackoverflow
    console.log(toode);
    console.log(ostukorv);
                              // "element nr1"
     // 0             //["element nr1","element nr2",4,5,6].indexOf("element nr1"); 
    const index = ostukorv.indexOf(toode);
    console.log(index);
    // ["element nr1","element nr2",4,5,6].splice(0,1);  -> ["element nr2",4,5,6].splice(0,1);
    ostukorv.splice(index,1);
            // ostukorv.remove(toode) <--- sellist asja ei ole
    console.log(ostukorv);
    muudaOstukorvi(ostukorv.slice()); // uuenda HTMLi
    localStorage.setItem("ostukorviTooted", JSON.stringify(ostukorv));
  }

                    // 4
  function lisaToode(toode) {
    // ["element nr1","element nr2",4,5,6]
    // .push(4);

    ostukorv.push(toode);
    muudaOstukorvi(ostukorv.slice()); // uuendab HTMLi (useState)
    console.log(ostukorv);
    localStorage.setItem("ostukorviTooted", JSON.stringify(ostukorv));
  }

  function tyhjenda() {
    muudaOstukorvi([]); //HTML muuta
    localStorage.setItem("ostukorviTooted", JSON.stringify([])); // localStorage-t uuendada
    // localStorage.clear();
  }

  function arvutaOstukorviKogusumma() {
    let koguSumma = 0;
              // [{nimi: "Coca", hind: 2}, {nimi: "Fanta", hind: 3}]
              // .forEach({nimi: "Coca", hind: 2} =>  2  = 0 + 2 )
              // .forEach({nimi: "Fanta", hind: 3} => 5   = 2 + 3 )
    ostukorv.forEach(element => koguSumma = koguSumma + element.hind);
    return koguSumma;
  }

  function maksma() {
    const andmed = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": arvutaOstukorviKogusumma(),
      "order_reference": Math.random() * 999999,
      "nonce": "92ddcfab96e34a5f" + new Date() + Math.random() * 999999,
      "timestamp": new Date(),
      "customer_url": "https://react03202.web.app"
    }

    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",{
      method: "POST",
      body: JSON.stringify(andmed),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(tagastus => tagastus.json())
    .then(tagastuseBody => window.location.href = tagastuseBody.payment_link);
  }

  // 2. HTML --- märge, selgitan "let", "const", function () <--- muutujate loogika üle
  return(
    <div>
      {ostukorv.length > 0 && 
      <div>
        <div>Kokku on {ostukorv.length} toodet ostukorvis</div>
        <button onClick={() => tyhjenda()}>Tühjenda</button>
      </div>}
      <div>
      {ostukorv.length === 0 && <div>Ostukorv on tühi</div>}
      {/* ["element nr1","element nr2",4,5,6].map("element nr1" => <div>
          <div>Nimi: element nr1</div>
          <div>Hind: 3</div>
          <div>Kategooria: karastusjoogid</div>
          <button onClick={() => kustutaToode("element nr1")}>X</button>
          <button onClick={() => lisaToode("element nr1")}>Lisa</button>
        </div>) */}
         {/* ["element nr1","element nr2",4,5,6].map("element nr2" => <div>
          <div>Nimi: element nr2</div>
          <div>Hind: 3</div>
          <div>Kategooria: karastusjoogid</div>
          <button onClick={() => kustutaToode("element nr2")}>X</button>
          <button onClick={() => lisaToode("element nr2")}>Lisa</button>
        </div>) */}
        {/* ["element nr1","element nr2",4,5,6].map(4 => <div>
          <div>Nimi: 4</div>
          <div>Hind: 3</div>
          <div>Kategooria: karastusjoogid</div>
          <button onClick={() => kustutaToode(4)}>X</button>
          <button onClick={() => lisaToode(4)}>Lisa</button>
        </div>) */}
        </div>
      { ostukorv.map(element => 
        <div>
          {/* {nimi: "COca cola", price: 2, aktiivne: true} */}
          <div>Nimi: {element.nimi}</div>
          <div>Hind: {element.hind}</div>
          <div>Kategooria: karastusjoogid</div>
          <button onClick={() => kustutaToode(element)}>X</button>
          <button onClick={() => lisaToode(element)}>Lisa</button>
        </div>
      ) }
      {ostukorv.length > 0 && <div>
        <div>KOKKU: {arvutaOstukorviKogusumma()} €</div>
        <button onClick={() => maksma()}>MAKSMA</button>
      </div>}
    </div>
    )
}

export default Ostukorv;