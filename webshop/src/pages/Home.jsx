import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    setIsLoading(true);
    fetch(url).then(response => response.json())
    .then(responseBody => {
      const productsFromDb = [];
      for (const key in responseBody) {
        productsFromDb.push(responseBody[key]);
      }
      setProducts(productsFromDb);
      setIsLoading(false);
    })
  },[]);

  // [{1},{2},{3},{4},{1},{1},{4}]
  // [{toode:{1}, kogus: 3},{toode:{2}, kogus: 1},{toode:{3}, kogus: 1},{toode:{4}, kogus: 2}]
                // {id: 22}    ///  {id: 33}
  function addToCart(clickedProduct) {
    //[{product:{id: 11}, quantity: 3},{product:{id: 22}, quantity: 1}]
    let cartProducts = sessionStorage.getItem("products");
    if (cartProducts !== null) {
      cartProducts = JSON.parse(cartProducts);
    } else {
      cartProducts = [];
    }
    const index = cartProducts.findIndex(element => element.product.id === clickedProduct.id);
    if (index >= 0) {   // index !== -1
      //[{product:{id: 11}, quantity: 3},{product:{id: 22}, quantity: 1}][1] --->
      //{product:{id: 22}, quantity: 1}.quantity   --->  2  ---> {product:{id: 22}, quantity: 2}
      cartProducts[index].quantity++;
      // cartProducts[index].quantity += 2;
      // cartProducts[index].quantity = cartProducts[index].quantity / 2 + 1;
    } else {
      //                        {product:    {id: 33}, quantity: 1}
      cartProducts.push({product: clickedProduct, quantity: 1});
    }
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    toast.success("Edukalt lisatud ostukorvi!", {
      position: "bottom-right",
      theme: "dark"
    });
  }

  function onSortAZ() {
    products.sort( (a,b) => a.name.localeCompare(b.name) );
    setProducts(products.slice());
  }

  function onSortZA() {
    products.sort( (a,b) => b.name.localeCompare(a.name) );
    setProducts(products.slice());
  }

  function onSortPriceAsc() {
    products.sort( (a,b) => a.price - b.price );
    setProducts(products.slice());
  }

  function onSortPriceDesc() {
    products.sort( (a,b) => b.price - a.price );
    setProducts(products.slice()); // uuendab HTML-i (useState() osa)
            // .slice()  ---> products kutsub välja setProducts, mis uuendab products
  }

  return (
  <div>
    <button onClick={() => onSortAZ()}>Sorteeri A-Z</button>
    <button onClick={() => onSortZA()}>Sorteeri Z-A</button>
    <button onClick={() => onSortPriceAsc()}>Sorteeri hind kasvavalt</button>
    <button onClick={() => onSortPriceDesc()}>Sorteeri hind kahanevalt</button><br />
    { isLoading && <div className="spinner-wrapper">
      <div className="lds-ripple"><div></div><div></div></div>
    </div>}
    {products.map(element => 
      <div>
        <img className="product-img" src={element.imgSrc} alt="" />
        <div>{element.name}</div>
        <div>{Number(element.price).toFixed(2)}</div>
        <button onClick={() => addToCart(element)}>Lisa {element.name} ostukorvi</button>
      </div>)}
      <ToastContainer />
  </div>)
}

export default Home;