/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
  // function will go here
  //  note add this inside of our DOMContentLoaded event handler
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);
});

/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {*} users 
 */
function generateUserList(users, stocks) {
  // get the list element and for each user create a list item and append it to the list
  const userList = document.querySelector('.user-list');
  
  users.map(({user, id}) => {
    const listItem = document.createElement('li');
    listItem.innerText = user.lastname + ', ' + user.firstname;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });

  // register the event listener on the list
  userList.addEventListener('click', (event) => handleUserListClick(event, users));
}

/**
 * Handles the click event on the user list
 * @param {*} event 
 */
function handleUserListClick(event, users, stocks) {
  // get the user id from the list item
  const userId = event.target.id;
  // find the user in the userData array
  // we use a "truthy" comparison here because the user id is a number and the event target id is a string
  const user = users.find(user => user.id == userId);
  // populate the form with the user's data
  populateForm(user);

  userList.addEventListener('click', (event) => handleUserListClick(event, userData, stocksData));

  // render the portfolio items for the user
  renderPortfolio(user, stocks);

}

/**
 * Populates the form with the user's data
 * @param {*} user 
 */
function populateForm(data) {
  // use destructuring to get the user and id from the data object
  const { user, id } = data;
  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

// update the call to generateUserList to pass in the stock data

  generateUserList(userData, stocksData);

/**
 * Renders the portfolio items for the user
 * @param {*} user 
 */
function renderPortfolio(user, stocks) {
  // get the user's stock data
  const { portfolio } = user;
  // get the portfolio list element
  const portfolioDetails = document.querySelector('.portfolio-list');
  // clear the list from previous render
  portfolioDetails.innerHTML = '';
  // map over portfolio items and render them
  portfolio.map(({ symbol, owned }) => {
    // create a list item and append it to the list
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const actionEl = document.createElement('button');
    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    actionEl.innerText = 'View';
    actionEl.setAttribute('id', symbol);
    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl);
  });
}

/**
 * Renders the stock information for the symbol
 * @param {*} symbol 
 */
function viewStock(symbol, stocks) {
  // begin by hiding the stock area until a stock is viewed
  const stockArea = document.querySelector('.stock-form');
  if (stockArea) {
      // find the stock object for this symbol
      const stock = stocks.find( function (s) { return s.symbol == symbol;});

      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;

      document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}

