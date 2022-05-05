
function SortButtons(props) {
  function onSortAZ() {
    props.homeProducts.sort( (a,b) => a.name.localeCompare(b.name) );
    props.onSetProducts(props.homeProducts.slice());
  }

  function onSortZA() {
    props.homeProducts.sort( (a,b) => b.name.localeCompare(a.name) );
    props.onSetProducts(props.homeProducts.slice());
  }

  function onSortPriceAsc() {
    props.homeProducts.sort( (a,b) => a.price - b.price );
    props.onSetProducts(props.homeProducts.slice());
  }

  function onSortPriceDesc() {
    props.homeProducts.sort( (a,b) => b.price - a.price );
    props.onSetProducts(props.homeProducts.slice()); // uuendab HTML-i (useState() osa)
            // .slice()  ---> products kutsub välja setProducts, mis uuendab products
  }

  return (
    <div>
       <button onClick={() => onSortAZ()}>Sorteeri A-Z</button>
      <button onClick={() => onSortZA()}>Sorteeri Z-A</button>
      <button onClick={() => onSortPriceAsc()}>Sorteeri hind kasvavalt</button>
      <button onClick={() => onSortPriceDesc()}>Sorteeri hind kahanevalt</button><br />
    </div>)
}

export default SortButtons;