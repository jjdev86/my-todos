// Add evenListener to Add button
let addButton = document.getElementById('add-todo');
// add event listener
addButton.addEventListener('click', function () {
  let input = document.querySelector("input[type='text']");
  addTodo(input)
});

// add evenlistener on keypress
let input = document.querySelector("input[type='text']");

// handle event on keypress
input.addEventListener('keypress', function (keyPressed) {
  if (keyPressed.charCode === 13) {
    // addTodo(this)
    addTodo(this)
  }
})

// Append message to <ul>
const addTodo = (input) => {
  let li = document.createElement('li');
  // create edit button
  let editBtn = document.createElement('button');
  editBtn.innerText = 'edit';
  editBtn.classList.add('btn', 'edit-btn');
  editBtn.addEventListener('click', updateTodo);
  // create delete button
  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'delete';
  deleteBtn.classList.add('btn', 'delete-btn');
  deleteBtn.addEventListener('click', deleteTodo);
  let span = document.createElement('span');
  let ul = document.querySelector('ul');
  debugger;
  let newTodo = input.value;

  input.value = '';
  ul.appendChild(li).append(span, newTodo, editBtn, deleteBtn);
};

const updateTodo = () => {

};

const deleteTodo = () => {
  console.log(this, 'delete');
};