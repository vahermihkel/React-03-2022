import { useEffect, useState } from 'react';
import SendEmail from '../components/SendEmail';
import Map from './Map';

function Shops() {
  const [coordinaates, setCoordinates] = useState({lngLat: [59.4378, 24.7574], zoom: 11});
  const [shops, setShops] = useState([]);
  const dbUrl = "https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/shops.json";

  useEffect(() => {
    fetch(dbUrl).then(response => response.json())
    .then(responseBody => {
      const shopsFromDb = [];
      for (const key in responseBody) {
        shopsFromDb.push(responseBody[key]);
      }
      setShops(shopsFromDb);
    });
  },[]);

  return (<div>
    {/* <button onClick={() => setCoordinates({lngLat: [59.4231, 24.7991], zoom: 13})}>Ülemiste</button>
    <button onClick={() => setCoordinates({lngLat: [59.4277, 24.7193], zoom: 13})}>Kristiine</button> */}
    <button onClick={() => setCoordinates({lngLat: [59.4378, 24.7574], zoom: 11})}>Kõik poed</button>
    {shops.map(element => 
      <div>
        <button onClick={() => setCoordinates({lngLat: [element.latitude, element.longitude], zoom: 13})}>
          {element.name}
        </button>
      </div>
      )}
    <br /><br />
    <SendEmail />

    <Map shopMarkers={shops} mapCoordinaates={coordinaates}  />
  </div>)
}

export default Shops;
