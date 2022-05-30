//create function
function init() {
  console.log('bye')
  showCartItems();
  calculateTotalCartPrice();
}

//show cart item in the page
function showCartItems() {
  const cartItems = document.getElementById("cart__items");
  let cart = JSON.parse(localStorage.getItem('cart'));
  console.log('hi')


  //create items from localStorage data
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      let tr = document.createElement('tr');
      let nameCell = document.createElement('td');
      let colorsCell = document.createElement('td');
      let quantity = document.createElement('td');
      let priceCell = document.createElement('td');
      let btnRemoveCell = document.createElement('td');
      priceCell.style.paddingLeft = '100px';
      btnRemoveCell.style.paddingLeft = '200px';
      quantity.style.paddingLeft = '100px';
      colorsCell.style.paddingLeft = '100px';
      nameCell.style.paddingLeft = '100px';
      tr.style.fontSize = '20px'

      //convert number
      let priceString = cart[i].price.toString();
      let price = priceString.substring(1, 5);
      let priceNumber = parseInt(price);

      //get cartItem value
      nameCell.innerText = cart[i].name;
      colorsCell.innerText = cart[i].colors;
      priceCell.innerText = ' $' + " " + (priceNumber * cart[i].quantity) + '.00';

      //create remove btn and add event listener
      var btnRemove = document.createElement('button');
      btnRemove.className = 'btn-del';
      btnRemove.addEventListener('click', removeItem)
      btnRemove.innerText = 'x';

      btnRemoveCell.append(btnRemove);
      //create quantity input field  and add event listener
      var quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = 1;
      quantityInput.value = cart[i].quantity;
      quantityInput.id = 'quantity';
      quantityInput.className = 'quantity';
      quantityInput.addEventListener('change', changeQuantity
      );
      quantity.append(quantityInput);


      //append the items
      tr.append(btnRemoveCell, nameCell, colorsCell, quantity, priceCell);
      cart__items.appendChild(tr);
    }

  }

}
// remove item from the cart and local storage when click x btn and update total price
function removeItem(event) {
  console.log('removed')
  var title = event.currentTarget.parentElement.nextElementSibling.innerText;
  var color = event.currentTarget.parentElement.nextElementSibling.nextElementSibling.innerText;

  let cart = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].colors == color && cart[i].name == title) {
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      var btnClick = event.target
      btnClick.closest('tr').remove()
      break;
    }
  }
  calculateTotalCartPrice();
}

// change product quantity and update total price
function changeQuantity(event) {
  console.log('hey', event)
  var color = event.currentTarget.parentElement.previousElementSibling.innerText;
  var title = event.currentTarget.parentElement.previousElementSibling.previousElementSibling.innerText;

  let cart = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].colors == color && cart[i].name == title) {
      cart[i].quantity = parseInt(event.target.value);
      let price = cart[i].price.substring(1, 5);
      let priceNumber = parseInt(price);
      event.currentTarget.parentElement.nextElementSibling.innerText = ' $' + " " + (cart[i].quantity * priceNumber) + '.00';
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  calculateTotalCartPrice();

}

// calcculate total order value
function calculateTotalCartPrice() {
  console.log('new')
  let cart = JSON.parse(localStorage.getItem('cart'));
  let total = document.getElementById('totalPrice');
  let totalCartPrice = 0;
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      let priceString = cart[i].price.toString();
      let price = priceString.substring(1, 5);
      let priceNumber = parseInt(price);
      let productPrice = priceNumber * cart[i].quantity;
      totalCartPrice += productPrice;
    }
  }

  if (total) {
    console.log('total')
    total.innerText = totalCartPrice + '.00';

  }
}


//get  Element
let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let address = document.getElementById('address');
let addressErrorMsg = document.getElementById("addressErrorMsg");
let city = document.getElementById('city');
let cityErrorMsg = document.getElementById("cityErrorMsg");
let email = document.getElementById('email');
let emailErrorMsg = document.getElementById("emailErrorMsg");
let submit = document.getElementById('order');
// validation boolean false
let isFirstNameValid = false;
let isLastNameValid = false;
let isAddressValid = false;
let isCityValid = false;
let isEmailValid = false;


//submit btn addEventListener
submit.addEventListener('click', ($event) => {
  console.log('yes')
  $event.preventDefault();
  let products = [];

  let cart = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < cart.length; i++) {
    products.push(cart[i].id);
  }
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
  }
  let data = {
    products: products,
    contact: contact

  }
  //if all information is ok makeRequest
  if (isFirstNameValid && isLastNameValid && isAddressValid && isCityValid && isEmailValid) {
    makeRequest(data);
  }

});

//api request
function makeRequest(data) {
  fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then((response) => {
    console.log('data', response);

    let orderId = response.orderId;

    // show id in the url
    location.replace(`confirmation.html?orderid=${orderId}`);

  }).catch((error) => {
    console.log(error);
  })

};

//validation firstName
firstName.addEventListener('blur', () => {
  const regName = /^[a-zA-Z]+$/;
  if (!regName.test(firstName.value)) {
    firstName.style.border = 'red solid 2px';
    return false;
  }
  else {
    firstName.style.border = 'green solid 2px';
    isFirstNameValid = true;
  }
})
//lastName
lastName.addEventListener('blur', () => {
  const regName = /^[a-zA-Z]+$/;
  if (!regName.test(lastName.value)) {
    lastName.style.border = 'red solid 2px';
    return false;
  }
  else {
    lastName.style.border = 'green solid 2px';
    isLastNameValid = true;
  }
})
//address
address.addEventListener('blur', () => {
  const regAddress = /^\s*\S+(?:\s+\S+){2}/;
  if (!regAddress.test(address.value)) {
    address.style.border = 'red solid 2px';
    return false;
  }
  else {
    address.style.border = 'green solid 2px';
    isAddressValid = true;
  }
})
//city
city.addEventListener('blur', () => {
  const regCity = /^[a-zA-Z]+$/;
  if (!regCity.test(city.value)) {
    city.style.border = 'red solid 2px';
    return false;
  }
  else {
    city.style.border = 'green solid 2px';
    isCityValid = true;
  }
})
//Email
email.addEventListener('blur', () => {
  const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!regEmail.test(email.value)) {
    email.style.border = 'red solid 2px';
    return false;
  }
  else {
    email.style.border = 'green solid 2px';
    isEmailValid = true;
  }
})
init();

