import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const url = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(url).then(response => response.json())
    .then(responseBody => {
      const productsFromDb = [];
      for (const key in responseBody) {
        productsFromDb.push(responseBody[key]);
      }
      setProducts(productsFromDb);
    })
  },[]);

  return (
  <div>
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