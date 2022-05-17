import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
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
    <Table>
      <thead>
        <tr>
          <th>Pilt</th>
          <th>Nimi</th>
          <th>ID</th>
          <th>Hind</th>
          <th>Kirjeldus</th>
          <th>Kategooria</th>
          <th>Aktiivne</th>
          <th>Kogus</th>
          <th>Tegevused</th>
        </tr>
      </thead>
      <tbody>
        {products.map(element => 
          <tr>
            <td><img className="admin-picture" src={element.imgSrc} alt="" /></td>
            <td>{element.name}</td>
            <td>{element.id}</td>
            <td>{element.price} €</td>
            <td>{element.description}</td>
            <td>{element.category}</td>
            <td>{element.isActive}</td>
            <td>{element.stock}</td>
            <Link to={"/admin/muuda/" + element.id}>
              <button>MUUDA</button>
            </Link>
          </tr>)}
      </tbody>
    </Table>
  </div>)
}

export default ViewProducts;