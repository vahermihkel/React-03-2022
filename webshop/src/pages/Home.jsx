import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import CarouselGallery from "../components/home/CarouselGallery";
import SortButtons from "../components/home/SortButtons";
import AuthContext from "../store/AuthContext";
import { cartSumService } from "../store/cartSumService";
import "./css/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(url).then(response => response.json())
    .then(responseBody => {
      const productsFromDb = [];
      for (const key in responseBody) {
        productsFromDb.push(responseBody[key]);
      }
      setProducts(productsFromDb);
      // [{i: "", n: "", c: "drones"}, {i: "", n: "", c: "camera"}]
      // ["drones", "camera"]
      setOriginalProducts(productsFromDb);
      const categoriesFromProducts = [...new Set(productsFromDb.map(element => element.category))];
      setCategories(categoriesFromProducts);
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
      if (cartProducts[index].product.stock <= cartProducts[index].quantity) {
        toast.error("Vabandame, antud toodet laos rohkem pole!", {
          position: "bottom-right",
          theme: "dark"
        });
        return;
      }
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

  const onSelectCategory = (category) => {
    if (category === 'all') {
      setProducts(originalProducts);
      setSelectedCategory('all')
    } else {
      setProducts(originalProducts.filter(element => element.category === category));
      setSelectedCategory(category);
    }
  }

  return (
  <div>
    <CarouselGallery />
    <div className={selectedCategory === 'all' && 'bold'} onClick={() => onSelectCategory('all')}>Kõik kategooriad</div>
    { categories.map(element => //['drones', 'cameras']       'drones'
      <div 
        onClick={() => onSelectCategory(element)} 
        className={selectedCategory === element && 'bold'}>
          {element}
      </div>) }
    <SortButtons homeProducts={products} onSetProducts={setProducts} />
    { isLoading && <div className="spinner-wrapper">
      <div className="lds-ripple"><div></div><div></div></div>
    </div>}
    {products.filter(element => element.isActive || authCtx.loggedIn).map(element => 
      <div className={`product 
            ${element.isActive && authCtx.loggedIn && 'active'} 
            ${!element.isActive && authCtx.loggedIn && 'inactive'}`}>
        <img className="product-img" src={element.imgSrc} alt="" />
        <div>{element.name}</div>
        <div>{Number(element.price).toFixed(2)}</div>
        <button onClick={() => addToCart(element)}>Lisa {element.name} ostukorvi</button>
      </div>)}
      <ToastContainer />
  </div>)
}

// filterda kõik kes on aktiivsed
//   sisselogitud     loggedIn
// (element => true && false)  ---> false
// (element => true && true)  ---> true
// (element => false && true)  ---> false
// (element => false && false)  ---> false

// (element => true || false)  ---> true
// (element => true || true)  ---> true
// (element => false || false)  ---> false
// (element => false || true)  ---> true

export default Home;