import { useState } from "react";
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
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts[index].quantity--;
    if (cartProducts[index].quantity === 0) {
      removeFromCart(clickedProduct);
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
  }

  function increaseQuantity(clickedProduct) {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts[index].quantity++;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    // 1. uuendama HTMLi
    // 2. uuendama sessionStorage-t
  }

  function removeFromCart(clickedProduct) {
    const index = cartProducts.findIndex(
      element => element.product.id === clickedProduct.product.id);
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
  }

  return (
  <div>
    { cartProducts.map(element => 
      <div className={cartStyles.cartProduct}>
        <img className={cartStyles.cartProductImg } src={element.product.imgSrc} alt="" />
        <div className={cartStyles.cartProductName}>{element.product.name}</div>
        <div className={cartStyles.cartProductPrice}>{Number(element.product.price).toFixed(2)} €</div>
        <div className={cartStyles.cartProductQuantityControls}>
          <img className={cartStyles.cartProductButton} onClick={() => decreaseQuantity(element)} src="/cart/minus.png" alt="" />
          <div className={cartStyles.cartProductQuantity}>{element.quantity}</div>
          <img className={cartStyles.cartProductButton} onClick={() => increaseQuantity(element)} src="/cart/plus.png" alt="" />
        </div>
        <div className={cartStyles.cartProductSum}>{(element.product.price * element.quantity).toFixed(2)} €</div>
        <img className={cartStyles.cartProductButton} onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />
      </div>) 
    }
    <br />  <br />
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
