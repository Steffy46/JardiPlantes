import { render, screen } from '@testing-library/react';
import App from './components/App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
//  });

 
test('Vérification du montant total du panier', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);

  var total = [{name:"Les immortelles", price:60, amount:1}];
  expect(totalBasket(total)).toBe(60);
 });




