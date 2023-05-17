import "./Footer.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__text">
        Made with <FavoriteIcon /> by
        <a href="https://github.com/cataafra"> @cataafra</a>
      </div>
    </section>
  );
};

export default Footer;
