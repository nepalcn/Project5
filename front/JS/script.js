
//make request product in the main page 
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
    //create elements for the card and the value
    const card = document.createElement("article");
    const img = response[i].imageUrl;
    const newImg = document.createElement("img");
    const newa = document.createElement("a");

    console.log(response[i])
    newa.setAttribute('href', `/front/html/product.html?id=${response[i]._id}`)
    newa.textContent = 'View Detail';
    newImg.classList.add('Img');
    newImg.setAttribute('width', '100%');
    newImg.setAttribute('alt', response[i].altTxt)
    newImg.setAttribute('src', img);

    const name = document.createElement('h3');
    name.innerText = response[i].name;
    const description = document.createElement('p');
    description.innerText = response[i].description;
    const price = document.createElement('p');
    price.innerText = '$' + response[i].price;

    //append the elements to the card
    card.append(name, description, price, newImg, newa);
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
    document.querySelector('items').innerText =  error ;
  }
}
init();
