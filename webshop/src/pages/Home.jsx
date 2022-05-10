import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import CarouselGallery from "../components/CarouselGallery";
import SortButtons from "../components/SortButtons";
import { cartSumService } from "../store/cartSumService";

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
      //cartProducts[index].quantity = cartProducts[index].quantity + 1;
      // cartProducts[index].quantity += 2;
      // cartProducts[index].quantity = cartProducts[index].quantity / 2 + 1;
    } else {
      //                        {product:    {id: 33}, quantity: 1}
      const parcelMachineIndex = cartProducts.findIndex(element => element.product.id === "11122333");
      if (parcelMachineIndex >= 0) {
        cartProducts.splice(parcelMachineIndex, 0, {product: clickedProduct, quantity: 1});
      } else {
        cartProducts.push({product: clickedProduct, quantity: 1});
      }
    }
    sessionStorage.setItem("products", JSON.stringify(cartProducts));
    toast.success("Edukalt lisatud ostukorvi!", {
      position: "bottom-right",
      theme: "dark"
    });
    let totalSum = 0;
    cartProducts.forEach(element => totalSum += element.product.price * element.quantity);
    cartSumService.sendCartSum(totalSum);
  }

  return (
  <div>
    <CarouselGallery />
    <SortButtons homeProducts={products} onSetProducts={setProducts} />
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