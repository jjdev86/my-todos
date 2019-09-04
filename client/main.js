/**
 * ADD EVENTS TO INPUT AND BUTTONS
 */
// Add event to Add button
let addButton = document.getElementById('add-todo');
// add event listener
addButton.addEventListener('click', function () {
  let input = document.querySelector("input[type='text']");
  addTodo(input)
});

// Add Event to input on keyPress
let input = document.querySelector("input[type='text']");

// handle event on keypress
input.addEventListener('keypress', function (keyPressed) {
  if (keyPressed.charCode === 13) {
    // addTodo(this)
    addTodo(this)
  }
});






// Append message to <ul>
const addTodo = (input) => {
  let li = document.createElement('li');
  // create edit button
  let editBtn = document.createElement('button');
  editBtn.innerText = 'edit';
  editBtn.classList.add('btn', 'edit-btn');
  editBtn.addEventListener('click', function () {
    updateTodo(this);
  });
  // create delete button
  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'delete';
  deleteBtn.classList.add('btn', 'delete-btn');
  deleteBtn.addEventListener('click', function (evet) {
    deleteTodo(this)
  });

  // create radio button "yes" and "no"
  const div = document.createElement('div');
  const yes = document.createElement('input');
  yes.type = 'radio';
  yes.name = 'yes';
  yes.value = 'Yes';

  const no = document.createElement('input');
  no.type = 'radio';
  no.name = 'no';
  no.value = 'No';

  div.appendChild(yes);
  div.appendChild(no);

  let span = document.createElement('span');
  let ul = document.querySelector('ul');
  let newTodo = input.value;
  span.innerText = newTodo;
  input.value = '';

  ul.appendChild(li).append(div, span, editBtn, deleteBtn);
};

const updateTodo = (event) => {
  let update = prompt('Please update your todo');
  event.parentNode.firstChild.innerText = update;
    // need to implement no input from user
      // user must enter new update, or be given rejection
};

const deleteTodo = (event) => {
  const parentNode = document.getElementsByTagName('ul');
  let removed = parentNode[0].removeChild(event.parentNode);
  return removed;

};