import { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { cartSumService } from "../store/cartSumService";
import AuthContext from "../store/AuthContext";
import "./NavigationBar.css";


function NavigationBar() {
  const { t, i18n } = useTranslation();
  const [cartSum, setCartSum] = useState(getCartFromSS());
  const authCtx = useContext(AuthContext);

  function getCartFromSS() {
    const products = sessionStorage.getItem("products");
    if (products) {
      let totalSum = 0;
      const cartProducts = JSON.parse(products);
      cartProducts.forEach(element => totalSum += element.product.price * element.quantity);
      return totalSum;
    } else {
      return 0;
    }
  }

  function changeLanguage(newLanguage) {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language",newLanguage);
  }

  // nii kui vajutatakse send()
  // läheb käima getCartSum
  cartSumService.getCartSum().subscribe(cartSumFromObs => setCartSum(cartSumFromObs))

  function logout() {
    sessionStorage.removeItem("userData");
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand as={Link} to="/"> <img src="/webshio.png" alt="" /> </Navbar.Brand>
      <Nav className="me-auto">
       { authCtx.loggedIn && <Nav.Link as={Link} to="/logi-sisse">Logi sisse</Nav.Link>}
       { authCtx.loggedIn && <Nav.Link onClick={() => logout()}>Logi välja</Nav.Link>}
        <Nav.Link as={Link} to="/admin">{t('nav-admin-button')}</Nav.Link>
        <Nav.Link as={Link} to="/poed">Poed</Nav.Link>
        <Nav.Link as={Link} to="/ostukorv">{t('nav-cart-button')}</Nav.Link>
        <div>Kokku ostukorvis: {cartSum.toFixed(2)} €</div>
        <img onClick={() => changeLanguage("ee")} className="lang" src="/lang/estonia.png" alt="" />
        <img onClick={() => changeLanguage("ru")} className="lang" src="/lang/russia.png" alt="" />
        <img onClick={() => changeLanguage("en")} className="lang" src="/lang/united-kingdom.png" alt="" />
      </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;