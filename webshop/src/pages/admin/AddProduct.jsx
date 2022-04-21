import { useRef } from "react";

function AddProduct() {
  const idRef = useRef(); // HTMLi inputi külge
  const nameRef = useRef();
  const priceRef = useRef();
  const imgSrcRef = useRef();
  const categoryRef = useRef();
  const activeRef = useRef();
  const descriptionRef = useRef();
  const stockRef = useRef();
  const dbUrl = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  function onAddProduct() {
    const newProduct = {
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "id": Number(idRef.current.value),
      "imgSrc": imgSrcRef.current.value,
      "isActive": activeRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value)
    }

    fetch(dbUrl,{
      "method": "POST",
      "body": JSON.stringify(newProduct),  // teeb õigesti JSON kuju stringiks
      "headers": {"Content-Type": "application/json"} 
                // päringu vastuvõtja saaks aru, et JSON kujuna läheb minu
    });

  }

  return (
  <div>
    <label>ID</label> <br />
    <input ref={idRef} type="number" required /> <br />
    <label>Nimi</label> <br />
    <input ref={nameRef} type="text" required /> <br />
    <label>Hind</label> <br />
    <input ref={priceRef} type="number" required /> <br />
    <label>Pilt</label> <br />
    <input ref={imgSrcRef} type="text" required /> <br />
    <label>Kategooria</label> <br />
    <input ref={categoryRef} type="text" required /> <br />
    <label>Kirjedus</label> <br />
    <input ref={descriptionRef} type="text" required /> <br />
    <label>Kogus</label> <br />
    <input ref={stockRef} type="number" required /> <br />
    <label>Aktiivne</label> <br />
    <input ref={activeRef} type="checkbox" required /> <br />
    <button onClick={() => onAddProduct()}>LISA</button>
  </div>)
}

export default AddProduct;