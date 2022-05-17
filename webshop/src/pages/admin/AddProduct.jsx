import { useEffect, useRef, useState } from "react";
import FileUpload from "../../components/FileUpload"; // 1. import FileUpload uus komponent

function AddProduct() {
  const idRef = useRef(); // HTMLi inputi külge
  const nameRef = useRef();
  const priceRef = useRef();
  // const imgSrcRef = useRef();
  const categoryRef = useRef();
  const activeRef = useRef();
  const descriptionRef = useRef();
  const stockRef = useRef();
  const dbUrl = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idNotUnique, setIdNotUnique] = useState(false);
  const [pictureUrl, setPictureUrl] = useState(null); // 2. lisasin uue useState-i

  useEffect(() => {
    fetch(dbUrl + "/products.json").then(response => response.json())
    .then(responseBody => {
      const productsFromDb = [];
      for (const key in responseBody) {
        productsFromDb.push(responseBody[key]);
      }
      setProducts(productsFromDb);
      console.log(productsFromDb);
    })
  },[]);

  useEffect(() => {
    fetch(dbUrl + "/categories.json").then(response => response.json())
    .then(responseBody => {
      const categoriesFromDb = [];
      for (const key in responseBody) {
        categoriesFromDb.push(responseBody[key]);
      }
      setCategories(categoriesFromDb);
      console.log(categoriesFromDb);
    })
  },[]);


  function onAddProduct() {
    const newProduct = {
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "id": Number(idRef.current.value),
      "imgSrc": pictureUrl,  // 3. ref-i asemel pictureUrl
      "isActive": activeRef.current.checked,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value)
    }

    fetch(dbUrl + "/products.json",{   // 4. products.json liitsin juurde
      "method": "POST",
      "body": JSON.stringify(newProduct),  // teeb õigesti JSON kuju stringiks
      "headers": {"Content-Type": "application/json"} 
                // päringu vastuvõtja saaks aru, et JSON kujuna läheb minu
    });

  }

  function checkIdUniqueness() {
    console.log(idRef.current.value);
    const index = products.findIndex(element => 
          Number(element.id) === Number(idRef.current.value));
    if (index >= 0) {
      setIdNotUnique(true);
    } else {
      setIdNotUnique(false);
    }
  }

  return (
  <div>
    { idNotUnique && <div>ID on mitteunikaalne</div>}
    <label>ID</label> <br />
    <input onChange={() => checkIdUniqueness()} ref={idRef} type="number" required /> <br />
    <label>Nimi</label> <br />
    <input ref={nameRef} type="text" required /> <br />
    <label>Hind</label> <br />
    <input ref={priceRef} type="number" required /> <br />
    <label>Pilt</label> <br />
    < FileUpload onSendPictureUrl={setPictureUrl} /> 
    {/* 5. Võtsin komponendi HTML-s kasutusele ja võtmega pannakse käima minu useState
               parempoolne funktsioon */}
               
    {/* <input ref={imgSrcRef} type="text" required /> <br /> */}
    <label>Kategooria</label> <br />
    {/* <input ref={categoryRef} type="text" required /> <br /> */}
    <select ref={categoryRef}>
      {categories.map(element => <option value={element.name}>{element.name}</option>)}
      {/* <option value="bmw-5-series">BMW 5.seeria</option>
      <option value="audi-a6">Audi A6</option> */}
    </select><br />
    <label>Kirjedus</label> <br />
    <input ref={descriptionRef} type="text" required /> <br />
    <label>Kogus</label> <br />
    <input ref={stockRef} type="number" required /> <br />
    <label>Aktiivne</label> <br />
    <input ref={activeRef} type="checkbox" required /> <br />
    <button disabled={idNotUnique} onClick={() => onAddProduct()}>LISA</button>
  </div>)
}

export default AddProduct;