import "./Header.scss";
import logo_alt from "../images/afra_logo_alt.png";

const Header = () => {
  return (
    <section className="header">
      <h1 className="header__text">Sneaker Shop API</h1>
      <img src={logo_alt} alt="Afra Logo" className="header__logo" />
    </section>
  );
};

export default Header;
