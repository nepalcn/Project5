
          
          makeRequest = () => {
            return new Promise((resolve, reject) => {
              console.log('hi')
              let apiRequest = new XMLHttpRequest();
              apiRequest.open('GET', 'http://localhost:3000/api/products/');
              apiRequest.send()
              apiRequest.onreadystatechange = () => {
                if (apiRequest.readyState === 4) {
                  if (apiRequest.status === 200) {
                    // if ready state and status return success code resolve promise with response
                    resolve(JSON.parse(apiRequest.response));
                  }
                  else {
                    // if no success reject with errore message
                    reject('Server is down!');
                  }
                }
              }
            });
          }
          //create element
          createCard = (response) => {
            console.log("buyer")
            const section = document.querySelector("items");

            for (let i in response) {
              //create elements for the card
              const card = document.createElement("article");
              const img = response[i].imageUrl;
              const newImg = document.createElement("img");
              const newa = document.createElement("a");
              

              console.log(response[i])
              //id is passed in querystring
              newa.setAttribute('href', `/front/html/product.html?id=${response[i]._id}`)
              newa.textContent = 'View Detail';
              newImg.classList.add('Img');
              newImg.setAttribute('width', '100%');
              newImg.setAttribute('src', img);
              
              //item description
              card.innerHTML += '<h2>' + response[i].name + '</h2>';
            
              card.innerHTML += '<p>' + response[i].description + '</p>';
              card.innerHTML += '<p>' + '$' + response[i].price + '</p>';
              //append the elements to the card
              
              card.appendChild(newImg);
              card.appendChild(newa);
              items.appendChild(card);

            }
          }

          init = async () => {
            try {
              //call makerequest for api request and wait response
              const requestPromise = makeRequest();
              const response = await requestPromise;
              // pass response to create card function to display results
              createCard(response);
            }
            catch (error) {
              //error msg displayed if request fail
              document.querySelector('items').innerHTML =  error ;
            }
          }
          init();
        
         

        