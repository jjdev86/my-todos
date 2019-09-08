// Global Variables to Tack Todos
// window.completed = [];
localStorage.setItem('completedTodos', JSON.stringify([]));
// window.incomple = [];
localStorage.setItem('incompleteTodos', JSON.stringify([]));
// window.allTodos = [];
localStorage.setItem('allTodos', JSON.stringify([]));
localStorage.setItem('todoId', 0); 
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
    let id = Number(localStorage.getItem('todoId')) + 1;

    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    const incompleteTodos = JSON.parse(localStorage.getItem('incompleteTodos'));

    allTodos.push([id, this.value]);
    incompleteTodos.push([id, this.value]);
    localStorage.setItem('todoId', id);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
    localStorage.setItem('incompleteTodos', JSON.stringify(incompleteTodos))
    addTodo(this, id)
  }
});







const addTodo = (input, id) => {
  let li = document.createElement('li');
  li.setAttribute('id', id);

  // create edit button with eventListner
  let editBtn = document.createElement('button');
  editBtn.innerText = 'edit';
  editBtn.classList.add('btn', 'edit-btn');
  editBtn.addEventListener('click', function () {
    updateTodo(this);
  });

  // create delete button with eventListner
  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'delete';
  deleteBtn.classList.add('btn', 'delete-btn');
  deleteBtn.addEventListener('click', function (evet) {
    deleteTodo(this)
  });

  // create radio button "yes" and "no"
  const div = document.createElement('div');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'completed';
  checkbox.value = 'no';
  // eventListener that determine if todo is completed
  checkbox.addEventListener('click', function (e) {
    // on checkbox check, the todo will be marked completed
    if (this.value === 'no') {
      console.log(this, `checkbox?`)

      let id = e.target.parentNode.parentNode.id
      completedTodo(this, id)  
    } else {
      incompleteTodo(this, id);
    }
  })

  let span = document.createElement('span');
  let ul = document.querySelector('ul');
  let newTodo = input.value;
  span.innerText = newTodo;
  input.value = '';
  // append elements to div
  div.append(checkbox, span, editBtn, deleteBtn)
  // append div to ul parent list
  ul.appendChild(li).append(div);
  // store todo in client storage
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

const completedTodo = (e, id) => {
  id = Number(id);
  e.parentNode.childNodes[1].style.cssText = "text-decoration: line-through";
  // disable edit button
  e.parentNode.childNodes[2].style.display = 'none';
  e.value = 'yes';

  // remove todo from incompletesTodos
  const incomplete = JSON.parse(localStorage.getItem('incompleteTodos'));
  let todoRemoved; 
  incomplete.forEach((todo, index) => {
    if (todo[0] === id) {
      todoRemoved = todo;
      // remove the todo from incomplete todos
      incomplete.splice(index, 1);
    }
  });
  // update localStorage incompleteTodos
  localStorage.setItem('incompleteTodos', JSON.stringify(incomplete));
  // add todo to competedTodos
  const completed = JSON.parse(localStorage.getItem('completedTodos'));
  completed.push(todoRemoved);
  // UPDATE localStorage completedTodos
  localStorage.setItem('completedTodos', JSON.stringify(completed));
  // strike todo text
  // style="text-decoration: line-through;"
}

const incompleteTodo = (e, id) => {
  id = Number(id);
  e.parentNode.childNodes[1].style.cssText = "text-decoration: none";
  e.parentNode.childNodes[2].style.display = "inline-block";
  e.value = 'no';

  // get all completed todos, and remove todo
  const completed = JSON.parse(localStorage.getItem('completedTodos'));
  let todoRemoved; 
  completed.forEach((todo, index) => {
    if (todo[0] === id) {
      todoRemoved = todo;
      // remove the todo from incomplete todos
      completed.splice(index, 1);
    }
  });
  // UPDATE completedTodos storage
  localStorage.setItem('completedTodos', JSON.stringify(completed));
  // Get incomplete todos, add todoRemoved to incompleteTodos
  const incomplete = JSON.parse(localStorage.getItem('incompleteTodos'));
  incomplete.push(todoRemoved);
  // UPDATE incompleteTodos
  localStorage.setItem('incompleteTodos', JSON.stringify(incomplete));
};


const displayAllTodos = () => {
  console.log(`displayAllTodos`);
  // get all todos from storage
  const todos = JSON.parse(localStorage.getItem('allTodos'));
  document.querySelector('ul').innerHTML = '';

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i]; // [1, 'hi there']

    const ul = document.querySelector("ul");
    const li = document.createElement('li');
    li.setAttribute('id', todo[0]);
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.innerText = todo[1];
    const checkbox = checkBox();
    const edit = editBtn();
    const delBtn = deletebtn();
    div.append(checkbox, span, edit, delBtn);
    ul.appendChild(li).append(div);
}

};

const deleteAllTodos = () => {
  console.log('deleteAll todos')
  // let ul = document.querySelector('ul');
  document.querySelector('ul').innerHTML = '';
  // GET all todos from storage

};

const displayCompletedTodos = () => {
 console.log(`display all completed todos`);
};

const displayIncompleteTodos = () => {
  console.log('display all incompleteTodos');
};


const editBtn = () => {
  // create edit button with eventListner
  let btn = document.createElement('button');
  btn.innerText = 'edit';
  btn.classList.add('btn', 'edit-btn');
  btn.addEventListener('click', function () {
    updateTodo(this);
  });
  return btn;
};

const deletebtn = () => {
  // create delete button with eventListner
  let btn = document.createElement('button');
  btn.innerText = 'delete';
  btn.classList.add('btn', 'delete-btn');
  btn.addEventListener('click', function (evet) {
    deleteTodo(this)
  });
  return btn;
};

const checkBox = () => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'completed';
  checkbox.value = 'no';
  // // eventListener that determine if todo is completed
  checkbox.addEventListener('click', function (e) {
    // on checkbox check, the todo will be marked completed
    let id = e.target.parentNode.parentNode.id
    if (this.value === 'no') {
      console.log(this, `checkbox?`)
      completedTodo(this, id)  
    } else {
      incompleteTodo(this, id);
    }
  })
  return checkbox;
};