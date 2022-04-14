import { useEffect, useState } from "react";

function Home() {
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
      console.log(productsFromDb);
    })
  },[]);

  return (<div>Home</div>)
}

export default Home;