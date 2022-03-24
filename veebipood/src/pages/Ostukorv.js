import { useState } from "react";

function Ostukorv() {
  // ["element nr1","element nr2",4,5,6]
  // 1. Muutujad
  const [ostukorv, muudaOstukorvi] = useState(["element nr1","element nr2",4,5,6]);

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
    console.log(ostukorv);
    muudaOstukorvi(ostukorv.slice()); // uuenda HTMLi
  }

                    // 4
  function lisaToode(toode) {
    // ["element nr1","element nr2",4,5,6]
    // .push(4);

    ostukorv.push(toode);
    muudaOstukorvi(ostukorv.slice()); // uuendab HTMLi (useState)
    console.log(ostukorv);
  }

  // 2. HTML
  return(
    <div>
      {ostukorv.length > 0 && 
      <div>
        <div>Kokku on {ostukorv.length} toodet ostukorvis</div>
        <button onClick={() => muudaOstukorvi([])}>Tühjenda</button>
      </div>}
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
      { ostukorv.map(element => 
        <div>
          <div>Nimi: {element}</div>
          <div>Hind: 3</div>
          <div>Kategooria: karastusjoogid</div>
          <button onClick={() => kustutaToode(element)}>X</button>
          <button onClick={() => lisaToode(element)}>Lisa</button>
        </div>
      ) }
    </div>
    )
}

export default Ostukorv;