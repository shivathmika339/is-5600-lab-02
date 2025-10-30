/* add your code here */

document.addEventListener('DOMContentLoaded', () => {

  // Parse data from the JS files
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Render the initial user list
  generateUserList(userData, stocksData);

  // Register event listeners for Save and Delete buttons
  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  // DELETE USER
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const userId = document.querySelector('#userID').value;
    const userIndex = userData.findIndex(user => user.id == userId);

    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);
    }
  });

  // SAVE USER
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const id = document.querySelector('#userID').value;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        userData[i].user.firstname = document.querySelector('#firstname').value;
        userData[i].user.lastname = document.querySelector('#lastname').value;
        userData[i].user.address = document.querySelector('#address').value;
        userData[i].user.city = document.querySelector('#city').value;
        userData[i].user.email = document.querySelector('#email').value;

        generateUserList(userData, stocksData);
        break;
      }
    }
  });
});

function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = ''; // clear old list

  users.map(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = user.lastname + ', ' + user.firstname;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });

  // ✅ Remove any existing event listeners before adding a new one
  const newUserList = userList.cloneNode(true);
  userList.parentNode.replaceChild(newUserList, userList);

  // ✅ Add a single event listener to the new list
  newUserList.addEventListener('click', (event) =>
    handleUserListClick(event, users, stocks)
  );
}

/**
 * Handles click event on the user list
 */
function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const user = users.find(u => u.id == userId);
  if (!user) return;
  populateForm(user);
  renderPortfolio(user, stocks);
}


/**
 * Populates the form with the user's data
 */
function populateForm(data) {
  const { user, id } = data;
  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}
/**
 * Renders the portfolio items for the user
 */
function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector('.portfolio-list');

  // Clear previous render, but keep headers
  portfolioDetails.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  portfolio.map(({ symbol, owned }) => {
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

  // Event listener for viewing stock details
  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}

/**
 * Renders stock information for the symbol
 */
function viewStock(symbol, stocks) {
  const stockArea = document.querySelector('.stock-form');
  if (stockArea) {
    const stock = stocks.find(s => s.symbol == symbol);
    if (!stock) return;

    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;

    document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}