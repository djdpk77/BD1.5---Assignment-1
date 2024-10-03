let express = require('express');
let cors = require('cors');

let app = express();
//let port = 3000;
app.use(cors);

//Server-side values
let taxrate = 5; // 5%
let discountPercentage = 10; //10%
let loyaltyRate = 2; //2 points per $1

//Function to calculate total price of items in cart
function calculateTotalPrice(newItemPrice, cartTotal) {
  let result = cartTotal + newItemPrice;

  return result.toString();
}

//Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTotalPrice(newItemPrice, cartTotal));
});

//Function to compute the discounted price
function calculateDiscountedPrice(cartTotal, isMember) {
  let result;

  if (isMember) {
    result = cartTotal - (discountPercentage * cartTotal) / 100;
  } else {
    result = cartTotal;
  }

  return result.toString();
}

//Endpoint 2 : Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  res.send(calculateDiscountedPrice(cartTotal, isMember));
});

//Function to compute tax
function calculateTax(cartTotal) {
  let tax = (taxrate * cartTotal) / 100;

  return tax.toString();
}

//Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculateTax(cartTotal));
});

//Function to estimate delivery time
function calculateDeliveryTime(shippingMethod, distance) {
  let numberOfDays;

  if (shippingMethod === 'express') {
    numberOfDays = distance / 100;
  } else {
    numberOfDays = distance / 50;
  }

  return numberOfDays.toString();
}

//Endpoint 4 : Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);

  res.send(calculateDeliveryTime(shippingMethod, distance));
});

//Function to compute shipping cost
function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;

  return shippingCost.toString();
}

//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send(calculateShippingCost(weight, distance));
});

//Function to compute loyalty points
function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * 2;

  return loyaltyPoints.toString();
}

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calculateLoyaltyPoints(purchaseAmount));
});

//app.listen(port, () => {
//  console.log(`Example app listening at http://localhost:${port}`);
//});
