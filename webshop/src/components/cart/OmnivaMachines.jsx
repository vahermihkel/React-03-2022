import { useEffect, useRef, useState } from "react";

function OmnivaMachines(props) {
  const omnivaUrl = "https://www.omniva.ee/locations.json";
  const [omnivaMachines, setOmnivaMachines] = useState([]); // List dropdowni sees
  const [selectedOmniva, setSelectedOmniva] = useState(
    sessionStorage.getItem("selectedOmnivaMachine")); // milline valiti
  const omnivaRef = useRef(); // dropdowni sisse väärtust kuulav

  useEffect(() => {
    fetch(omnivaUrl).then(response => response.json())
      .then(responseBody => setOmnivaMachines(responseBody))
  },[]);

  function selectOmnivaMachine() {
    //console.log(omnivaRef.current.value);
    const omnivaValue = omnivaRef.current.value;
    const cartOmniva = {
      product:
      {
        id: "11122333",
        name: "Omniva pakiautomaadi tasu",
        price: 3.5,
        imgSrc: "/locker.png"
      }, 
      quantity: 1
    }
    props.cartItems.push(cartOmniva);
    sessionStorage.setItem("products", JSON.stringify(props.cartItems));
    sessionStorage.setItem("selectedOmnivaMachine", JSON.stringify(omnivaValue));
    props.onSendCartProducts(props.cartItems.slice());
    setSelectedOmniva(omnivaValue);
  }

  function deleteSelectedOmniva() {
    setSelectedOmniva(null);
    sessionStorage.removeItem("selectedOmnivaMachine"); 
    props.onDeleteProduct({product: {id: "11122333"}});
  }

  return (<div>
    { !selectedOmniva && props.cartItems.length > 0 &&
      <select ref={omnivaRef} onChange={() => selectOmnivaMachine()}>
        { omnivaMachines.map(element => <option value={element.NAME}>{element.NAME}</option>) }
      </select>}
    { selectedOmniva && 
      <div>
      {selectedOmniva} <button onClick={() => deleteSelectedOmniva()}>X</button> 
      </div>}
  </div>)
}

// kes võtab kasutusele
// parent-child
// <OmnivaMachines />   <--- parentil
// OmnivaMachines(props)    <--- childil

// parent --> child liiguvad    info            Ostukorvi esemed sessionStorage-st
// child --> parent liiguvad    sündmused       ostukorvist eemaldamine

export default OmnivaMachines;