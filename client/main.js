
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

    // allTodos.push([id, this.value]);
    allTodos.push({id: id, nodeText: this.value, complete: false});
    // incompleteTodos.push([id, this.value]);
    incompleteTodos.push({id : id, nodeText:  this.value, complete: false});
    localStorage.setItem('todoId', id);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
    localStorage.setItem('incompleteTodos', JSON.stringify(incompleteTodos))
    addTodo(this, id)
  }
});

/******************************************************************************\
 * =======================FILTER BY TODO STATUS FUNCTIONS =================== *
 ******************************************************************************/

const updateTodo = () => {
  let update = prompt('Please update your todo');
  console.log(event.target.parentNode, `parent node of ul`)
  console.log(event.target.previousSibling, `sibling?`)
  event.target.previousSibling.innerText = update;
  // event.parentNode.firstChild.innerText = update;
};

const deleteTodo = () => {
  const parentNode = document.querySelector('ul');
  let removed = parentNode.removeChild(event.target.parentNode.parentNode);
  return removed;
};

const completedTodo = (e, id) => {
  id = Number(id);
  e.parentNode.childNodes[1].style.cssText = "text-decoration: line-through";
  // disable edit button
  e.parentNode.childNodes[2].style.display = 'none';
  e.value = 'yes';

  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  // update todo to complete
  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      todo.complete = true;
    }
  });
  //update completeTodos with new 
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
}

const incompleteTodo = (e, id) => {
  id = Number(id);
  e.parentNode.childNodes[1].style.cssText = "text-decoration: none";
  e.parentNode.childNodes[2].style.display = "inline-block";
  e.value = 'no';

  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      todo.complete = false;
    }
  });
  localStorage.setItem('allTodos', JSON.stringify(allTodos));

};


const displayAllTodos = () => {

  // get all todos from storage
  const todos = JSON.parse(localStorage.getItem('allTodos'));
  document.querySelector('ul').innerHTML = '';

  todos.forEach((todo, index) => {
    const ul = document.querySelector("ul");
    const li = document.createElement('li');
    li.setAttribute('id', todo.id);
    // creates a todo and appends to div
    const div = createFilteredTodo(todo);
    ul.appendChild(li).append(div);
  });

};

const deleteAllTodos = () => {
  console.log('deleteAll todos')
  localStorage.setItem('allTodos', "[]");
  document.querySelector('ul').innerHTML = '';

};


/******************************************************************************\
 * ============================HELPER FUNCTIONS================================/
 ******************************************************************************/

const addTodo = (input, id) => {
  let li = document.createElement('li');
  li.setAttribute('id', id);

  // create edit button with eventListner
  const editButton = editBtn();
  // create delete button with eventListner
  const deleteButton = deletebtn();
  // create checkbox
  const checkbox = checkBox();
  // create span tag
  const span = document.createElement('span');
  // div to contain checkbox, span, edit and delete buttons
  const div = document.createElement('div');
  // set input value to span tag
  span.innerText = input.value;
  // clear input text
  input.value = '';

  const ul = document.querySelector('ul');
  // append elements to div
  div.append(checkbox, span, editButton, deleteButton)
  // append div to li and li to ul
  ul.appendChild(li).append(div);
  // store todo in client storage
};

const displayCompletedTodos = () => {
  const todos = JSON.parse(localStorage.getItem('allTodos'));
  document.querySelector('ul').innerHTML = '';
 
  todos.forEach((todo, index) => {
 
    if (todo.complete) {
     const ul = document.querySelector("ul");
     const li = document.createElement('li');
     li.setAttribute('id', todo.id);
     // creates a todo and appends to div
     let div = createFilteredTodo(todo);
     ul.appendChild(li).append(div);
    }
  });
 };
 
 const displayIncompleteTodos = () => {
   console.log('display all incompleteTodos');
   const todos = JSON.parse(localStorage.getItem('allTodos'));
   document.querySelector('ul').innerHTML = '';
 
   todos.forEach((todo, index) => {
 
     if (!todo.complete) {
      const ul = document.querySelector("ul");
      const li = document.createElement('li');
      li.setAttribute('id', todo.id);
      // creates a todo and appends to div
      let div = createFilteredTodo(todo);
      ul.appendChild(li).append(div);
     }
   });
 };
 
 const createFilteredTodo = (todo) => {
   const div = document.createElement('div');
   const span = document.createElement('span');
   span.innerText = todo.nodeText;
   const checkbox = checkBox();
   if (todo.complete) {
     span.style.cssText = "text-decoration: line-through";
     checkbox.checked = true;
   }
   const edit = editBtn();
   checkbox.value = todo.complete;
   const delBtn = deletebtn();
   div.append(checkbox, span, edit, delBtn);
   return div;
 }

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
