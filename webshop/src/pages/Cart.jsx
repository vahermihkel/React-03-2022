import { useState } from "react";
import OmnivaMachines from "../components/cart/OmnivaMachines";
import Payment from "../components/cart/Payment";
import cartStyles from "./css/Cart.module.css";
import { cartSumService } from "../store/cartSumService";

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
      // if (cartProducts[index].product.stock <= cartProducts[index].quantity) {
      //   toast.error("Vabandame, antud toodet laos rohkem pole!", {
      //     position: "bottom-right",
      //     theme: "dark"
      //   });
      //   return;
      // }
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
    // if (clickedProduct.product.id === "11122333") {
    //   deleteSelectedOmniva();
    // }
  }

  function totalPrice() {
    let totalSum = 0;
    cartProducts.forEach(element => totalSum += element.product.price * element.quantity);
    cartSumService.sendCartSum(totalSum);
    return totalSum;
  }

  return (
  <div>
    { cartProducts.map(element => 
      <div className={cartStyles.cartProduct}>
        <img className={cartStyles.cartProductImg } src={element.product.imgSrc} alt="" />
        <div className={cartStyles.cartProductName}>{element.product.name}</div>
        <div className={cartStyles.cartProductPrice}>{Number(element.product.price).toFixed(2)} ???</div>
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
        <div className={cartStyles.cartProductSum}>{(element.product.price * element.quantity).toFixed(2)} ???</div>
{   element.product.id !== "11122333"   &&  <img className={cartStyles.cartProductButton} onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />}      </div>) 
    }
    <br /> 
        {/* vasak pool t??histab v??tit millega OmnivaMachines vastu v??tab
        parem pool t??histab v????rtust mida selle v??tmega saadetakse */}
    <OmnivaMachines 
        cartItems={cartProducts} 
        onDeleteProduct={removeFromCart}
        onSendCartProducts={setCartProducts} />
    <br />

    <div>KOKKU: {totalPrice().toFixed(2)} ???</div> 
    <Payment totalSum={totalPrice()} />
    
  </div>)
}

// camelCase  --- esimene t??ht on v??ike, iga j??rgnev s??na algab suurega 
//                (atribuudid, muutujad ja funktsioonid)
// PascalCase --- iga s??na on suure t??hega (klassid   <Home/> --- <ToastContainer/> -- <Link>)
// kebab-case --- iga s??na lahutab sidekriips  (css)
// snake_case --- iga s??na lahutab alumine kriips (failid_asdas.pdf)

export default Cart;

/* KODUS:
 Kustutamine
 ??ksik toode
 Dropdown - kategooriad editis
 Keypress  .findIndex / .filter

 MEIE:
 T??NA:
* ID kontroll - igal tootel oleks unikaalne ID (onKeyPress - .findIndex(element=>))
* Kategooriad - andmebaasi
  NELJAP??EV:
* Adminis olla otsing - "mer"  (onKeyPress - .filter(element=>))
* Pakiautomaadid Ostukorvi (Omniva)  (dropdown -> saan valida) - kustutada
* L??heb automaatselt ostukorvi pakiautomaat - hinnaga 3.5 - kustutada, siis kustub
* Kustutada ei saa, juurde lisada ( selectedParcelMachine && disabled-css-klassi )
* Alati on viimane minu ostukorvis ( .findIndex -- kas mul on pakiautomaat ostukorvis
  uut toodet lisatakse: KUI ON pakiautomaat, siis lisatakse eelviimaseks, 
  KUI EI OLE, siis lisatakse viimaseks   )

  TEISIP??EV:
* Komponentide p??hine loogika ( props teema )

  NELJAP??EV: 05.05
* PROPS
* Kaardi peal n??itan k??iki poode ( Leaflet )
-----

  TEISIP??EV:  10.05
* v Navbaris iga klikiga ka ostukorvi summa kokkuarvutamine (Subject)
* v Pakiautomaat ostukorvis alati viimane
* v Emailide saatmine Gmailile ja muule - smtp.js
* v NotFound
* v Pildid Firebase-i    Firebase Storage (URL)

  NELJAP??EV 12.05
* Sisselogimine / Registeerumine --- Admin
        URL peitmine

  TEISIP??EV  17.05
* Kogused?
* Avalehe kujundus

EMAILILE: 
1.Proovit???? (2020 aasta Nortal talve??likooli kandideerimiseks proovit????)
2.Print-screenina andmebaasi saata

  24.05    1.5h   arutame proovit????d (lahendame) - veebipoe kujundus
          13.00-14.30 

  31.05    1.5h   iseseisvate projektide vahepunkt - veebipoe kujundus, ...
  07.06    45 min viimane kord - arutame iseseisvaid projekte
 */
