
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderid');
let orderIdElement = document.getElementById('orderId');
orderIdElement.innerHTML = orderId; 
console.log('confirmation')


