import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imgSrcRef = useRef();
  const categoryRef = useRef();
  const activeRef = useRef();
  const descriptionRef = useRef();
  const stockRef = useRef();
  const {id} = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const dbUrl = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // URL-st toote ID võtmist
  // VÕTAN andmebaasist kõik tooted
  // otsin õige toote üles ID abil KÕIKIDE toodete hulgast .find(element=>); abiga
  // näitan õiget toodet HTML-s defaultValue="" abil

  useEffect(()=>{
    fetch(dbUrl).then(response => response.json())
    .then(body => {
      const newArray = [];
      for (const key in body) {   // spetsiaalne for tsükkel OBJEKTI võtmete läbikäimiseks
          const value = body[key];            // {nimi: "Coca cola", hind: "3"}   ---> ["Coca cola", "3"]
          newArray.push(value);
      }
      setProducts(newArray);
      const productFound = newArray.find(element => Number(element.id) === Number(id));
      setProduct(productFound);
    })   // { -asdaeqw: {1}, -asd123as: {2}}   [{1},{2}]    ---> 
        //1.tekitan []     2.  [].push({1}) -->   [{1}].push({2})  -->  [{1},{2}]
  },[id]);

  function onEditProduct() {
    const newProduct = {
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "id": Number(idRef.current.value),
      "imgSrc": imgSrcRef.current.value,
      "isActive": activeRef.current.checked,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "stock": Number(stockRef.current.value),
    }

    //const index = products.indexOf(product);
    // asendan selle toote kõikide toodete hulgast
    const index = products.findIndex(element => element.id === product.id);
    products[index] = newProduct;
    // [{0},{1},{2}][3] = 
//      const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
//      beasts[2] = "giraffe";
//      console.log(beasts);

    fetch(dbUrl,{
      "method": "PUT", // PUT - asendab KÕIK ära kes seal on
      "body": JSON.stringify(products),  // asendan KÕIK tooted ära nii, et see 1 on muudetud
      "headers": {"Content-Type": "application/json"} 
                // päringu vastuvõtja saaks aru, et JSON kujuna läheb minu
    });
  }

  return (
  <div>
    { product && <div>
      <label>ID</label> <br />
      <input ref={idRef}  defaultValue={product.id} type="number" required /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} defaultValue={product.name} type="text" required /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} defaultValue={product.price} type="number" required /> <br />
      <label>Pilt</label> <br />
      <input ref={imgSrcRef} defaultValue={product.imgSrc} type="text" required /> <br />
      <label>Kategooria</label> <br />
      <input ref={categoryRef} defaultValue={product.category} type="text" required /> <br />
      <label>Kirjedus</label> <br />
      <input ref={descriptionRef} defaultValue={product.description} type="text" required /> <br />
      <label>Kogus</label> <br />
      <input ref={stockRef} defaultValue={product.stock} type="number" required /> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} defaultChecked={product.isActive} type="checkbox" required /> <br />
      <button onClick={() => onEditProduct()}>Muuda toode</button>
    </div>}
  </div>)
}

export default EditProduct;