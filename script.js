'use strict';

// element variables
const form = document.querySelector('form');
const link = 'https://crudcrud.com/api/68b3933196994e8a821f2a204015a9bc/orderData';
const orderList = document.getElementById('orderList');

// event listener form submission
form.addEventListener('submit', orderForm);

// Function to handle form submission
async function orderForm(event) {
  event.preventDefault();

  const price = event.target.price.value;
  const selectDish = event.target.selectDish.value;
  const selectTable = event.target.table.value;

  const obj = {
    price,
    selectDish,
    selectTable,
  };

  try {
    const response = await axios.post(link, obj);
    displayData(response.data);
    form.removeEventListener('submit', orderForm);
  } catch (error) {
    console.error(error);
  }
}

// Function to display data 
function displayData(user) {
  const newRow = document.createElement('tr');
  const dishCell = document.createElement('td');
  dishCell.textContent = `${user.price}-${user.selectDish} - ${user.selectTable}`;

  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete user';
  deleteButton.dataset.userId = user._id; 

  deleteButton.addEventListener('click', () => {
    deleteUser(user._id);
  });

  deleteCell.appendChild(deleteButton);

  // Append the cells to the new row
  newRow.appendChild(dishCell);
  newRow.appendChild(deleteCell);

  // Append the new row to the table body
  orderList.appendChild(newRow);

  // Clear form inputs
  document.getElementById('price').value = '';
  document.getElementById('selectDish').value = '';
  document.getElementById('table').value = '';
}

// Function to delete a user
async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${link}/${userId}`);
    removeUser(userId);
  } catch (error) {
    console.error(error);
  }
}

// Function to remove a user from the table
function removeUser(userId) {
  const userRow = document.querySelector(`button[data-user-id="${userId}"]`).parentNode.parentNode;
  if (userRow) {
    userRow.remove();
  }
}

// Load  data when the page is loaded
window.addEventListener('DOMContentLoaded', async () => {
  if (orderList.children.length === 0) { 
    try {
      const response = await axios.get(link);
      response.data.forEach((user) => {
        // Load initial data here
        displayData(user);
      });
    } catch (error) {
      console.error(error);
    }
  }
});
