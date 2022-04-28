import { useEffect, useRef, useState } from "react";
import cartStyles from "./css/Cart.module.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState(getCartFromSS());

  function getCartFromSS() {
    const products = sessionStorage.getItem("products");
    if (products) {
      return JSON.parse(products);
    } else {
      return [];
    }
  }

  function decreaseQuantity(clickedProduct) {
    if (clickedProduct.product.id !== "11122333") {
      const index = cartProducts.findIndex(
        element => element.product.id === clickedProduct.product.id);
      cartProducts[index].quantity--;
      if (cartProducts[index].quantity === 0) {
        removeFromCart(clickedProduct);
      }
      setCartProducts(cartProducts.slice());
      sessionStorage.setItem("products", JSON.stringify(cartProducts));
    }
  }

  function increaseQuantity(clickedProduct) {
    if (clickedProduct.product.id !== "11122333") {
      const index = cartProducts.findIndex(
        element => element.product.id === clickedProduct.product.id);
      cartProducts[index].quantity++;
      setCartProducts(cartProducts.slice());
      sessionStorage.setItem("products", JSON.stringify(cartProducts));
    }
  }

  function removeFromCart(clickedProduct) {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    if (clickedProduct.product.id === "11122333") {
      deleteSelectedOmniva();
    }
  }

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
    cartProducts.push(cartOmniva);
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    sessionStorage.setItem("selectedOmnivaMachine", JSON.stringify(omnivaValue));
    setSelectedOmniva(omnivaValue);
  }

  function deleteSelectedOmniva() {
    setSelectedOmniva(null);
    sessionStorage.removeItem("selectedOmnivaMachine"); 
  }

  return (
  <div>
    { cartProducts.map(element => 
      <div className={cartStyles.cartProduct}>
        <img className={cartStyles.cartProductImg } src={element.product.imgSrc} alt="" />
        <div className={cartStyles.cartProductName}>{element.product.name}</div>
        <div className={cartStyles.cartProductPrice}>{Number(element.product.price).toFixed(2)} €</div>
        <div className={cartStyles.cartProductQuantityControls}>
          { element.product.id !== "11122333" && <img 
                      className={element.product.id === "11122333" ? 
                        cartStyles.cartProductButtonDisabled : cartStyles.cartProductButton
                      } 
                      onClick={() => decreaseQuantity(element)} 
                      src="/cart/minus.png" 
                      alt="" />}
            <div className={cartStyles.cartProductQuantity}>{element.quantity} tk</div>
          { element.product.id !== "11122333" && <img 
                      className={element.product.id === "11122333" ? 
                          cartStyles.cartProductButtonDisabled : cartStyles.cartProductButton} 
                      onClick={() => increaseQuantity(element)} 
                      src="/cart/plus.png" 
                      alt="" />}        
        </div>
        <div className={cartStyles.cartProductSum}>{(element.product.price * element.quantity).toFixed(2)} €</div>
        <img className={cartStyles.cartProductButton} onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />
      </div>) 
    }
    <br /> 

    { !selectedOmniva && 
      <select ref={omnivaRef} onChange={() => selectOmnivaMachine()}>
        { omnivaMachines.map(element => <option value={element.NAME}>{element.NAME}</option>) }
      </select>}
    { selectedOmniva && 
      <div>
      {selectedOmniva} <button onClick={() => removeFromCart({product: {id: "11122333"}})}>X</button> 
      </div>}

    <br />
    
  </div>)
}

// camelCase  --- esimene täht on väike, iga järgnev sõna algab suurega 
//                (atribuudid, muutujad ja funktsioonid)
// PascalCase --- iga sõna on suure tähega (klassid   <Home/> --- <ToastContainer/> -- <Link>)
// kebab-case --- iga sõna lahutab sidekriips  (css)
// snake_case --- iga sõna lahutab alumine kriips (failid_asdas.pdf)

export default Cart;

/* KODUS:
 Kustutamine
 Üksik toode
 Dropdown - kategooriad editis
 Keypress  .findIndex / .filter

 MEIE:
 TÄNA:
* ID kontroll - igal tootel oleks unikaalne ID (onKeyPress - .findIndex(element=>))
* Kategooriad - andmebaasi
  NELJAPÄEV:
* Adminis olla otsing - "mer"  (onKeyPress - .filter(element=>))
* Pakiautomaadid Ostukorvi (Omniva)  (dropdown -> saan valida) - kustutada
* Läheb automaatselt ostukorvi pakiautomaat - hinnaga 3.5 - kustutada, siis kustub
* Kustutada ei saa, juurde lisada ( selectedParcelMachine && disabled-css-klassi )
* Alati on viimane minu ostukorvis ( .findIndex -- kas mul on pakiautomaat ostukorvis
  uut toodet lisatakse: KUI ON pakiautomaat, siis lisatakse eelviimaseks, 
  KUI EI OLE, siis lisatakse viimaseks   )

  TEISIPÄEV:
* Komponentide põhine loogika ( props teema )
* Kaardi peal näitan kõiki poode ( Leaflet )
* Emailide saatmine Gmailile ja muule
* Navbaris iga klikiga ka ostukorvi summa kokkuarvutamine (Subject)
* Sisselogimine / Registeerumine --- Admin
        URL peitmine
* NotFound, Karusell-galerii

 */
