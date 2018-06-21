/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

//Initialize some test data
function initTestData() {
  var aProduct = new Product('assets/bag.jpg', 'Bag');
  console.log(aProduct);
  cart.addItem(aProduct);
  console.log(cart);
}
// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  // initTestData();
  showCart();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  console.log('Begin clearCart');
  var old_tbody = table.getElementsByTagName('tbody').item(0);
  var new_tbody = document.createElement('tbody');
  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  console.log('old tbody: ' + old_tbody);
  console.log('new tbody: ' + new_tbody);
  console.log('End clearCart');
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  console.log('Begin showCart');

  // Find the table body
  var tbodyElement = table.getElementsByTagName('tbody');

  //Iterate over the items in the cart
  var cartItems = cart.items;
  console.log('cart items: ' + cartItems);
  var aCartItem;
  for (var i = 0; i < cartItems.length; i++) {
    aCartItem = cartItems[i];
    console.log('cart item: ' + aCartItem);
    //Create a TR
    var trElement = document.createElement('tr');

    //Create a TD for the delete link, quantity,  and the item
    var tdDelete = document.createElement('td');
    var btn = document.createElement('BUTTON');
    console.log(btn);
    trElement.appendChild(tdDelete);

    var tdQuantity = document.createElement('td');
    tdQuantity.textContent = aCartItem.quantity;
    trElement.appendChild(tdQuantity);

    var tdItem = document.createElement('td');
    var itemProduct = aCartItem.product;
    var imageSrc = itemProduct.path;
    tdItem.textContent = '<img src=' + imageSrc;
    trElement.appendChild(tdItem);

    //Add the TR to the TBODY and each of the TD's to the TR
    tbodyElement.appendChild(trElement);
  }

  console.log('End showCart');
}

function removeItemFromCart(event) {

  console.log('Begin removeItemFromCart');

  var theTarget = event.target;
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  console.log('The target :' + theTarget);

  //Save the cart back to local storage
  cart.saveToLocalStorage();

  //Re-draw the cart table
  renderCart();

  console.log('End removeItemFromCart');
}

// This will initialize the page and draw the cart on screen
renderCart();
