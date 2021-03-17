import React, { useState, useEffect } from 'react';
import '../styles/Cart.css';

function Cart({ updateCart, setUpdateCart }) {
	const [isOpen, setIsOpen] = useState(true);
	const total = updateCart.reduce(
		(acc, plantType) => acc + plantType.amount * plantType.price,
		0
	)
	
	useEffect(() => {
		document.title = `Panier : ${total} € d'achats`
	}, [total])
	

	return isOpen ? (
		
		<div className='jp-cart'>
			<button
				className='jp-cart-toggle-button'
				onClick={() => setIsOpen(false)}
			>
				Fermer le panier
			</button>

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
            		<button onClick={() => setUpdateCart([])}>Vider le panier</button>
				</div>
			) : (
				<div>Votre panier est vide</div>
			)}
		</div>
		
	) : (
		<div className='jp-cart-closed'>
			<button
				className='jp-cart-toggle-button'
				onClick={() => setIsOpen(true)}
			>
				Ouvrir le Panier
			</button>
		</div>
	)
}

export default Cart