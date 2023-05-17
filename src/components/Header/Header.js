import "./Header.scss";
import logo from "../../images/afra_logo.png";
import { Button } from "@mui/material";

const Header = () => {
    return (
        <section className="header">
            <div className="header__utility-bar">
                <div></div>
                <img src={logo} alt="Afra Logo" className="header__logo" />
                {localStorage.user ? (<div className="header__username">{localStorage.user} ({localStorage.role}) </div>) : (<div className="header__auth-buttons">
                    <Button href="/register">Sign Up</Button>
                    <Button href="/login">Sign In</Button>
                </div>)}
            </div>
            <h1 className="header__text">Streetwear Store Manager</h1>
        </section>
    );
};

export default Header;
