import { useParams } from "react-router-dom";

function VaataToode() {
  // "vitamin-well"
  // console.log(window.location.href.split("toode/")[1])

  const { toodeId } = useParams();
  console.log(toodeId);

  // "[{n: "Coca-cola"}, {n: "Fanta"}, {n: "Sprite"}, {n: "Vitamin well"} ]"
  let toode = {};
  let tooted = localStorage.getItem("tooted"); 
  if (tooted) { // !== null
    // [{n: "Coca-cola"}, {n: "Fanta"}, {n: "Vitamin well"}, {n: "Sprite"} ]
    tooted = JSON.parse(tooted);
    // .find({n: "Coca-cola"} => "coca-cola" === "vitamin-well") --- false
    // .find({n: "Fanta"} => "fanta" === "vitamin-well") --- false
    // .find({n: Vitamin well"} => "vitamin-well" === "vitamin-well") --- true
    // .find({n: "Sprite"} =>    ) --- SEDA EI TEHTA
    toode = tooted.find(element => element.nimi.replaceAll(" ", "-").toLowerCase() === toodeId);
    // .find()
  }  

  return (<div>
    <div>{toode.nimi}</div>
    <div>{toode.hind}</div>
  </div>);
}

export default VaataToode;