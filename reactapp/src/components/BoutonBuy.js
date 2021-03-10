import React, { useState } from 'react';

import { 
    Button
   } from 'reactstrap';

function BoutonBuy({ props, updateCart, setUpdateCart}) {

    // const savedCart = localStorage.getItem('updateCart')
	// const [updateCart, setUpdateCart] = useState(savedCart ? JSON.parse(savedCart) : [])

    

    function addToCart(name, price) {
        const currentPlantSaved = updateCart.find((plant) => plant.name === name);
        if (currentPlantSaved) {
          const cartFilterCurrentPlant = updateCart.filter(
            (plant) => plant.name !== name
          );
          setUpdateCart([
            ...cartFilterCurrentPlant,
            { name, price, amount: currentPlantSaved.amount + 1 },
          ]);
        } else {
          setUpdateCart([...updateCart, { name, price, amount: 1 }]);
        }
      }

  return (
    <div>
        <Button onClick={() => addToCart()}>Acheter</Button>
    </div>
  );
}

export default BoutonBuy;

