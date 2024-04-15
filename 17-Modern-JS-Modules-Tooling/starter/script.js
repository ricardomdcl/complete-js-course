// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 10);
// console.log(price, tq);
console.log('aver importing module ', );


// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 10);
// console.log(ShoppingCart.totalPrice);

// import add from './shoppingCart.js';
// add('pizza', 10);

import add, {totalPrice, tq} from './shoppingCart.js';
add('pizza', 10);

/////////////////////////////////////////////////////////////////////////////////
// Top level await

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json(); 

// console.log('aver data ', data);

// const getLastPost = async function() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   return {title: data.at(-1).title, text: data.at(-1).body};
// }

// const lastPost = getLastPost();
// console.log('aver lastPost ', lastPost);

// const lastPost2 = await getLastPost();
// console.log('aver lastPost2 ', lastPost2);

////////////////////////////////////////////////////////////////////////////////////

// const ShoppingCart2 = (function() {
//   const cart = [];
//   const shippingcost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function(product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} added to cart shipping cost is: ${shippingcost}`);
//   }
//   const orderStock = function(product, quantity) {
//     console.log(`${quantity} ${product} ordered from suplier`);
//   }
  
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   }

// })()

// ShoppingCart2.addToCart('pizza', 10)
// ShoppingCart2.addToCart('apple', 2)
// console.log('aver ShoppingCart2 ', ShoppingCart2);

////////////////////////////////////////////////////////////////////////////////////////

import cloneDeep from 'lodash-es';

const state = {
  cart: [
    {producet: 'bread', quantity: 5},
    {producet: 'pizza', quantity: 1},
  ],
  user: {loggedIn: true},
}

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;

console.log('aver stateClone ', stateClone);
console.log('aver stateDeepClone ', stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

import 'core-js/stable';
import 'regenerator-runtime/runtime';
