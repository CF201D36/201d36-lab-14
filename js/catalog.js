/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {

    var optionElement = document.createElement('option');
    optionElement.setAttribute("value", Product.allProducts[i].name);
    optionElement.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionElement);

  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  event.preventDefault();
  var target = event.target;
  console.log(target);
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

function addSelectedItemToCart() {

  var selectElement = document.getElementById('items');
  var pickedItem = selectElement.options[selectElement.selectedIndex].value.toLowerCase();
  var quantitySelected = document.getElementById('quantity').value;


  cart.items.push(new CartItem(pickedItem, quantitySelected));
  console.log(cart);

}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() { }

function updateCartPreview() {

  var selectElement = document.getElementById('items');
  var pickedItem = selectElement.options[selectElement.selectedIndex].value.toLowerCase();
  var quantitySelected = document.getElementById('quantity').value;

  var previewElement = document.getElementById('cartContents');
  previewElement.innerHTML = '';
  var ulEl = document.createElement('ul');

  for (var i in cart.items) {
    var liEl = document.createElement('li');
    liEl.textContent = 'product: ' + cart.items[i].product + ', quantity: ' + cart.items[i].quantity;
    ulEl.appendChild(liEl);
  }

  previewElement.appendChild(ulEl);

};

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
