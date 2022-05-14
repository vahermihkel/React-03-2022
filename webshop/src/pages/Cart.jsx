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
{   element.product.id !== "11122333"   &&  <img className={cartStyles.cartProductButton} onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />}      </div>) 
    }
    <br /> 
        {/* vasak pool tähistab võtit millega OmnivaMachines vastu võtab
        parem pool tähistab väärtust mida selle võtmega saadetakse */}
    <OmnivaMachines 
        cartItems={cartProducts} 
        onDeleteProduct={removeFromCart}
        onSendCartProducts={setCartProducts} />
    <br />

    <div>KOKKU: {totalPrice().toFixed(2)} €</div> 
    <Payment totalSum={totalPrice()} />
    
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

  NELJAPÄEV: 05.05
* PROPS
* Kaardi peal näitan kõiki poode ( Leaflet )
-----

  TEISIPÄEV:  10.05
* v Navbaris iga klikiga ka ostukorvi summa kokkuarvutamine (Subject)
* v Pakiautomaat ostukorvis alati viimane
* v Emailide saatmine Gmailile ja muule - smtp.js
* v NotFound
* v Pildid Firebase-i    Firebase Storage (URL)

  NELJAPÄEV 12.05
* Sisselogimine / Registeerumine --- Admin
        URL peitmine

  TEISIPÄEV  17.05
* Kogused?
* Avalehe kujundus

  24.05    1.5h
  31.05    1.5h
 */
