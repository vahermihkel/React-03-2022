import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const url = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const searchRef = useRef();
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    fetch(url).then(response => response.json())
    .then(responseBody => {
      const productsFromDb = [];
      for (const key in responseBody) {
        productsFromDb.push(responseBody[key]);
      }
      setProducts(productsFromDb);
      setOriginalProducts(productsFromDb);
    })
  },[]);

  // Number("mingisugune-string")  <-- error, sest ei oska numbriks teha
  // Number("12312312");   <--- ok
  // 12312312.indexOf()   <-- error, kuna numbril ei ole indekseid
  // "12312312".indexOf() <-- ok
  // 12313123.toString()   <-- alati ok

  function searchProducts() {
    console.log(searchRef.current.value);
                            //   .indexOf()
    // searchRef  - mida sisestasin
    // product.name.indexOf(searchRef)
    // KUI LEIAB, siis on index >= 0
    // KUI EI LEIA, siis on index -1
    // filterdan sisse kõik kellel on index suurem kui 0
    const searchedProduct = searchRef.current.value.toLowerCase();
    const productsFound = originalProducts.filter(element => 
      element.name.toLowerCase().indexOf(searchedProduct) >= 0 || 
        element.id.toString().indexOf(searchedProduct) >= 0 );
    setProducts(productsFound);
  }

  return (
  <div>
    <input ref={searchRef} onChange={() => searchProducts()} type="text" />
    {products.map(element => 
      <div>
        <img src={element.imgSrc} alt="" />
        <div>{element.name}</div>
        <div>{element.id}</div>
        <div>{element.price} €</div>
        <div>{element.description}</div>
        <div>{element.category}</div>
        <div>{element.isActive}</div>
        <div>{element.stock}</div>
        <Link to={"/admin/muuda/" + element.id}>
          <button>MUUDA</button>
        </Link>
      </div>)}
  </div>)
}

export default ViewProducts;