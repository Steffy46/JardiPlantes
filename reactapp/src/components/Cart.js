import React, { useState, useEffect } from "react";

///// Styles /////
import "../styles/Cart.css";
import { Button } from "reactstrap";

///// Redux /////
import { connect } from "react-redux";

function Cart({ updateCart, setUpdateCart }) {

  // Ouverture / Fermerture du panier
  const [isOpen, setIsOpen] = useState(true);

  // Calcul du montant total du panier
  const total = updateCart.reduce(
    (acc, plantType) => acc + plantType.amount * plantType.price,
    0
  );

  // Affichage du montant du panier dans l'onglet du site (Titre de la page)
  useEffect(() => {
    document.title = `Panier : ${total} € d'achats`;
  }, [total]);

  // Condition ternaire de l'ouverture et de la fermeture du panier
  return isOpen ? (
    <div className="jp-cart">
      <button
        className="jp-cart-toggle-button"
        onClick={() => setIsOpen(false)}
      >
        Fermer le panier
      </button>

	{/* 
	Condition ternaire
	Montant du panier si il y a des articles qui ont été ajouté 
	OU
	"Panier vide" si aucun article n'a été ajouté au panier  
	*/}
      {updateCart.length > 0 ? (
        <div>
          <h2>Panier</h2>
          <ul>
            {updateCart.map(({ name, price, amount }, index) => (
              <div key={`${name}-${index}`}>
                {name} {price} € x {amount}
              </div>
            ))}
          </ul>

          <h3>Total : {total} €</h3>
          <Button onClick={() => setUpdateCart([])}>Vider le panier</Button>
        </div>
      ) : (
        <div>Votre panier est vide</div>
      )}
    </div>
  ) : (
    <div className="jp-cart-closed">
      <Button className="jp-cart-toggle-button" onClick={() => setIsOpen(true)}>
        Ouvrir le Panier
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(mapStateToProps, null)(Cart);