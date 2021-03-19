import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import "../styles/Login.css";
import { Input } from "antd";

import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Login(props) {
  // Etats du sign-up
  const [signUpLastname, setSignUpLastname] = useState("");
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Etats du sign-in
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Etat de vérification de l'existance de l'utilisateur
  const [userExists, setUserExists] = useState(false);

  // Etats d'erreurs de sign-in/ sign-up
  const [errorSignIn, setErrorSignIn] = useState([]);
  const [errorSignUp, setErrorSignUp] = useState([]);

  // Appel de la route /sign-up et enregistrement des données du user en base
  const handleSubmitSignUp = async () => {
    const data = await fetch('/sign-up', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `lastnameFromFront=${signUpLastname}&firstnameFromFront=${signUpFirstname}&emailFromfront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
    });

    const body = await data.json()
    console.log(body)

    if(body.result === true) {
      props.addToken(body.token);
      setUserExists(true);
    } else {
      setErrorSignUp(body.error);
    }
  };

  // Appel de la route /sign-in et vérification de l'existance du user en base
  const handleSubmitSignIn = async () => {
    const data = await fetch('/sign-in', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromfront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });

    const body = await data.json()
    console.log(body)


    if(body.result === true) {
      props.addToken(body.token);
      setUserExists(true);
    } else {
      setErrorSignIn(body.error);
    }
  };

  if (userExists) {
    return <Redirect to='/' />;
  }

  const tabErrorSignIn = errorSignIn.map((error, i) => {
    return (<p>{error}</p>)
  });

  const tabErrorSignUp = errorSignUp.map((error, i) => {
    return (<p>{error}</p>)
  });

  return (
    <div>
      <Header />

      <h1>Inscription / Connection</h1>
      <p>
        Bienvenue dans l'univers de Jardi Plantes ! Grâce à votre compte vous
        pouvez retrouver vos plantes préférées dans vos favoris
      </p>
      <Link to="/">Retourner à l'accueil</Link>

      <div className="jp-login-page">
        {/* SIGN-IN */}

        <div className="jp-sign">
          <h2>Se connecter</h2>
          <Input
            className="jp-login-input"
            placeholder="Adresse email"
            onChange={(e) => setSignInEmail(e.target.value)}
            // value={signInEmail}
          />

          <Input.Password
            className="jp-login-input"
            placeholder="Mot de passe"
            onChange={(e) => setSignInPassword(e.target.value)}
            // value={signInPassword}
          />

          {tabErrorSignIn}

          <Button
            style={{ width: "150px" }}
            type="primary"
            onClick={() => handleSubmitSignIn()}
          >
            Se connecter
          </Button>
        </div>

        {/* SIGN-UP */}

        <div className="jp-sign">
          <h2>S'inscrire</h2>
          <Input
            className="jp-login-input"
            placeholder="Prénom"
            onChange={(e) => setSignUpLastname(e.target.value)}
            // value={signUpLastname}
          />

          <Input
            className="jp-login-input"
            placeholder="Nom"
            onChange={(e) => setSignUpFirstname(e.target.value)}
            // value={signUpFirstname}
          />

          <Input
            className="jp-login-input"
            placeholder="Adresse email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            // value={signUpEmail}
          />

          <Input.Password
            className="jp-login-input"
            placeholder="Mot de passe"
            onChange={(e) => setSignUpPassword(e.target.value)}
            // value={signUpPassword}
          />

          {tabErrorSignUp}

          <Button
            style={{ width: "150px" }}
            type="primary"
            onClick={() => handleSubmitSignUp()}
          >
            S'inscrire
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    addToken: function(token) {
      dispatch({ type: "addToken", token: token });
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);
