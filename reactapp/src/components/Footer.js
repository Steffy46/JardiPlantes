import React from "react";

///// Styles /////
import "../styles/Footer.css";

///// Pictos /////
import iconFacebook from "../assets/social-icons/facebook.png";
import iconInstagram from "../assets/social-icons/instagram.png";
import iconLinkedin from "../assets/social-icons/linkedin.png";
import iconPinterest from "../assets/social-icons/pinterest.png";
import iconTwitter from "../assets/social-icons/twitter.png";
import iconYoutube from "../assets/social-icons/youtube.png";

function Footer() {
  return (
    <footer className="jp-footer">
      <div id="jp-social-icon">
        <ul>
          <a target="_blank" href="https://www.facebook.com/">
            <li className="jp-icon-list">
              <img
                src={iconFacebook}
                alt="Facebook"
                className="jp-social-icon"
              />
            </li>
          </a>
          <a target="_blank" href="https://www.instagram.com/">
            <li className="jp-icon-list">
              <img
                src={iconInstagram}
                alt="Instagram"
                className="jp-social-icon"
              />
            </li>
          </a>
          <a target="_blank" href="https://www.linkedin.com/">
            <li className="jp-icon-list">
              <img
                src={iconLinkedin}
                alt="Linkedin"
                className="jp-social-icon"
              />
            </li>
          </a>
          <a target="_blank" href="http://pinterest.fr/">
            <li className="jp-icon-list">
              <img
                src={iconPinterest}
                alt="Pinterest"
                className="jp-social-icon"
              />
            </li>
          </a>
          <a target="_blank" href="http://twitter.com/">
            <li className="jp-icon-list">
              <img src={iconTwitter} alt="Twitter" className="jp-social-icon" />
            </li>
          </a>
          <a target="_blank" href="https://www.youtube.com/">
            <li className="jp-icon-list">
              <img src={iconYoutube} alt="Youtube" className="jp-social-icon" />
            </li>
          </a>
        </ul>
      </div>
      <p className="jp-footer-copyright">
        © Stéphanie Bézard - Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
