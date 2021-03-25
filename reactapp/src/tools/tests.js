test('Vérification du montant total du panier', () => {
    var total = [{name:"Les immortelles", price:60, amount:1}];
    expect(totalBasket(total)).toBe(60);
   });