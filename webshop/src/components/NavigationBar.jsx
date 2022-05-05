import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  const { t, i18n } = useTranslation();

  function changeLanguage(newLanguage) {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language",newLanguage);
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand as={Link} to="/"> <img src="/webshio.png" alt="" /> </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/admin">{t('nav-admin-button')}</Nav.Link>
        <Nav.Link as={Link} to="/poed">Poed</Nav.Link>
        <Nav.Link as={Link} to="/ostukorv">{t('nav-cart-button')}</Nav.Link>
        <img onClick={() => changeLanguage("ee")} className="lang" src="/lang/estonia.png" alt="" />
        <img onClick={() => changeLanguage("ru")} className="lang" src="/lang/russia.png" alt="" />
        <img onClick={() => changeLanguage("en")} className="lang" src="/lang/united-kingdom.png" alt="" />
      </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;