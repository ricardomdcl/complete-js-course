console.log('aver exporting module ', );



// Blocking code

// console.log('start fetching users');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('aver finish fetching users ', );


const shippingCost = 10;
const cart = [];

export const addToCart = function(product, quantity) {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice, totalQuantity as tq};

export default function(product, quantity) {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} added to cart`);
}