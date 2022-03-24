import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// 1. npm install react-router-dom; <-- võimaldab importida react-router-dom vajalikku routimiseks
// 2. import BrowserRouter
// 3. katta App component Browserrouteriga

// kommentaar
// ctrl + ä kui aktiveerin koodi

// README - tutvustus Reacti osas
// package.json - koodilõikude kogumik (üldvaade)

// React versioon 15 -> 17
// package.json failis muudan ära 15 asemel 17
// ja kirjutan cmd-sse "npm install"

// package.json ---> omab infot node_modules
//         sisu kohta

// package-lock.json -> detailvaade
//  seda ei muudeta, võin muuta, aga kasu ei oma

// .gitignore -> mida ma Githubi üles ei pane
// node_modules ei lähe, sest liiga suur
//    lihtsasti genereeritav

// node_module -> kõik erinevad koodilõigud, 
//mida React vajab

// public -> pildid, andmete failid

// src -> kood - .js ja .css