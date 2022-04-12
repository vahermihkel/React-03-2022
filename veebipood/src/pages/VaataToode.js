import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VaataToode() {
  // const [tooted, uuendaTooted] = useState([]); 
  const [toode, uuendaToode] = useState({});
  const url = "https://react-03-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";
  // "vitamin-well"
  // console.log(window.location.href.split("toode/")[1])

  // App.js -> localhost:3000/toode/:toodeId
  const { toodeId } = useParams();
  // console.log(toodeId);

  useEffect(() => { 
    fetch(url)
      .then(tagastus => tagastus.json()) 
      .then(tagastuseBody => {  
        const newArray = []; 
        for (const voti in tagastuseBody) {
          newArray.push(tagastuseBody[voti]);
        }
        // uuendaTooted(newArray); 
        const toodeLeitud = newArray.find(element => 
          element.nimi.replace(" ", "-").toLowerCase() === toodeId);
        uuendaToode(toodeLeitud); // uuendab HTMLi, enam ei ole tühi objekt
      });
  },[]);

  // // "[{n: "Coca-cola"}, {n: "Fanta"}, {n: "Sprite"}, {n: "Vitamin well"} ]"
  // let toode = {};
  // let tooted = localStorage.getItem("tooted"); 
  // if (tooted) { // !== null
  //   // [{n: "Coca-cola"}, {n: "Fanta"}, {n: "Vitamin well"}, {n: "Sprite"} ]
  //   tooted = JSON.parse(tooted);
  //   // .find({n: "Coca-cola"} => "coca-cola" === "vitamin-well") --- false
  //   // .find({n: "Fanta"} => "fanta" === "vitamin-well") --- false
  //   // .find({n: Vitamin well"} => "vitamin-well" === "vitamin-well") --- true
  //   // .find({n: "Sprite"} =>    ) --- SEDA EI TEHTA
  //   toode = tooted.find(element => element.nimi.replaceAll(" ", "-").toLowerCase() === toodeId);
  //   // .find()
  // }  

  return (<div>
    <div>{toode.nimi}</div>
    <div>{toode.hind}</div>
  </div>);
}

export default VaataToode;