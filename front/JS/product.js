
              const queryString = window.location.search;
              const urlParams = new URLSearchParams(queryString);
              const id = urlParams.get('id');

              console.log('product')
              //fetch single product by id
              makeRequest = () => {
                return new Promise((resolve, reject) => {
                  console.log('hi')
                  let apiRequest = new XMLHttpRequest();
                  apiRequest.open('GET', 'http://localhost:3000/api/products/' + id);
                  apiRequest.send()
                  apiRequest.onreadystatechange = () => {
                    if (apiRequest.readyState === 4) {
                      if (apiRequest.status === 200) {
                        // if ready state and status return success code resolve promise with response
                        resolve(JSON.parse(apiRequest.response));
                      }
                      else {
                        // if no success reject with error message
                        reject('API Request failed!');
                      }
                    }
                  }
                });
              }
              init = async () => {
                try {
                  //call makerequest for api request and wait response
                  const requestPromise = makeRequest();
                  const response = await requestPromise;
                  showproduct(response)
                  // pass response to create card function to display results

                }
                catch (error) {
                  //error msg displayed if request fail
                  document.querySelector('items').innerHTML = error;
                }
              }
              init();


              function showproduct(data) {
                console.log('singleproduct')

                const productName = document.getElementById('title');
                productName.innerHTML = data.name;

                const price = document.getElementById('price');
                price.innerHTML = '$' + data.price;

                const description = document.getElementById('description');
                description.innerHTML = data.description;


                const select = document.getElementById('colors');
                for (let data2 of data.colors) {
                  console.log(data2);


                  const newOption = document.createElement('option');
                  const optionText = document.createTextNode(data2);
                  // set option text
                  newOption.appendChild(optionText);
                  // and option value
                  newOption.setAttribute('value', data2);
                  select.appendChild(newOption);

                }
              }
              
              let cart = document.getElementById("addToCart");
              console.log('cart', cart)
              cart.addEventListener('click', () => {
                // console.log('added to cart');
                let cart = [];
                let localStorage = window.localStorage.getItem('cart');
                if (localStorage === null) {
                  cart = [];
                } else {
                  cart = JSON.parse(localStorage);
                }
                // cartNumbers();
                let product = {
                  id: id,
                  name: document.getElementById('title').innerText,
                  price: document.getElementById('price').innerText,
                  colors: document.getElementById('colors').value,
                  quantity: parseInt(document.getElementById("quantity").value),
                };

                console.log('hi')
                for (var i = 0; i < cart.length; i++) {
                  if (product.id == cart[i].id && product.colors == cart[i].colors)
                   {

                    cart[i].quantity += product.quantity;
                    window.localStorage.setItem("cart", JSON.stringify(cart));
                    alert('sucessfully added to cart')
                    return;
                  }
                }
                cart.push(product);

               
                window.localStorage.setItem("cart", JSON.stringify(cart));
                alert('sucessfully added to cart')


              });
          

            