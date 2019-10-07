if (localStorage.getItem('allTodos') == null) {
  localStorage.setItem('allTodos', JSON.stringify([]));
  localStorage.setItem('todoId', 0); 
}
/**
 * ADD EVENTS TO INPUT AND BUTTONS
 */
// Add event to Add button
let addButton = document.getElementById('add-todo');
// add event listener
addButton.addEventListener('click', function () {
  let input = document.querySelector("input[type='text']");
  // addTodo(input)
  if (input.value.length) {
    let id = Number(localStorage.getItem('todoId')) + 1;
    const allTodos = JSON.parse(localStorage.getItem('allTodos'));
    allTodos.push({id: id, nodeText: input.value, complete: false});
    // incompleteTodos.push([id, this.value]);
    localStorage.setItem('todoId', id);
    localStorage.setItem('allTodos', JSON.stringify(allTodos));
    addTodo(input, id)
  } else {
    console.log('add a todo');
    // span message below input box to add todo
  }
});

// Add Event to input on keyPress
let input = document.querySelector("input[type='text']");
// handle event on keypress
input.addEventListener('keypress', function (keyPressed) {
  if (keyPressed.charCode === 13) {
    // addTodo(this)
    if (this.value.length) {
      let id = Number(localStorage.getItem('todoId')) + 1;
      const allTodos = JSON.parse(localStorage.getItem('allTodos'));
      allTodos.push({id: id, nodeText: this.value, complete: false});
      // incompleteTodos.push([id, this.value]);
      localStorage.setItem('todoId', id);
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
      addTodo(this, id)
    } else {
      console.log('add a todo');
    }
  }
});

/******************************************************************************\
 * =======================ALTER TODO =================== *
 ******************************************************************************/
 
const updateTodo = () => {
  let update = prompt('Please update your todo');
  // get todo id
  const id = Number(event.target.parentNode.parentNode.id);
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));

  allTodos.forEach(todo => {
    if (todo.id === id) {
      todo.nodeText = update;
    }
  });
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
  event.target.previousSibling.innerText = update;

};

const deleteTodo = () => {
  const parentNode = document.querySelector('ul');
  const id = Number(event.target.parentNode.parentNode.id);
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));

  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      allTodos.splice(index, 1);
    }
  });
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
  let removed = parentNode.removeChild(event.target.parentNode.parentNode);

  return removed;
};


/******************************************************************************\
 * =======================FILTER BY TODO STATUS FUNCTIONS =================== *
 ******************************************************************************/


const completedTodo = (e, id) => {
  id = Number(id);
  e.parentNode.childNodes[1].style.cssText = "text-decoration: line-through";
  // disable edit button
  e.parentNode.childNodes[2].style.display = 'none';
  e.value = 'yes';
  e.checked = true;
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  // update todo to complete
  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      todo.complete = true;
    }
  });
  //update completeTodos with new 
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
  // displayIncompleteTodos();
}

const incompleteTodo = (e, id) => {

  id = Number(id);
  e.parentNode.childNodes[1].style.cssText = "text-decoration: none";
  e.parentNode.childNodes[2].style.display = "inline-block";
  e.value = 'false';

  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      todo.complete = false;
    }
  });
  localStorage.setItem('allTodos', JSON.stringify(allTodos));
  // displayCompletedTodos();
};


const displayAllTodos = () => {

  // get all todos from storage
  const todos = JSON.parse(localStorage.getItem('allTodos'));
  document.getElementById("todo-list").innerHTML = '';

  todos.forEach((todo, index) => {
    const ul = document.getElementById("todo-list");
    const li = document.createElement('li');
    li.setAttribute('id', todo.id);
    // creates a todo and appends to div
    const div = createFilteredTodo(todo);
    ul.appendChild(li).append(div);
  });

};

const deleteAllTodos = () => {
  localStorage.setItem('allTodos', "[]");
  document.querySelector('ul').innerHTML = '';
};


/******************************************************************************\
 * ============================HELPER FUNCTIONS================================/
 ******************************************************************************/

const addTodo = (input, id) => {
  // let li = document.createElement('li');
  // li.setAttribute('id', id);
  // // create edit button with eventListner
  // const editButton = editBtn();
  // // create delete button with eventListner
  // const deleteButton = deletebtn();
  // // create checkbox
  // const checkbox = checkBox();
  // // create span tag
  // const span = document.createElement('span');
  // // div to contain checkbox, span, edit and delete buttons
  // const div = document.createElement('div');
  // div.classList.add('row', 'todo-container');
  // // set input value to span tag
  // span.innerText = input.value;
  // span.setAttribute('class', 'col-9')
  // // clear input text
  // input.value = '';

  // const ul = document.getElementById("todo-list");
  // // append elements to div
  // div.append(checkbox, span, editButton, deleteButton)
  // // div.setAttribute('class', 'todo-container', 'row');
  // // append div to li and li to ul
  // ul.appendChild(li).append(div);
  // store todo in client storage

  // NEW WAY TO CREATE TODOS, USINV DIV INSTEAD OF UL
  //create div
  const div = document.createElement('div');
  div.setAttribute('id', id);
  div.classList.add('row', 'todo-container');
  // create edit button with eventListner
  const editButton = editBtn();
  // create delete button with eventListner
  const deleteButton = deletebtn();
  // create checkbox
  const checkbox = checkBox();
  // create span tag
  const span = document.createElement('span');
  // set input value to span tag
  span.innerText = input.value;
  span.setAttribute('class', 'col-9')
  // clear input text
  input.value = '';
  // append elements to div
  div.append(checkbox, span, editButton, deleteButton)
  document.getElementById("div-container").append(div);
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
    //  div.setAttribute('class', 'todo-container');
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
      // div.setAttribute('class', 'todo-container');
      ul.appendChild(li).append(div);
     }
   });
 };
 
 const createFilteredTodo = (todo) => {
   const div = document.createElement('div');
   const span = document.createElement('span');
   span.innerText = todo.nodeText;
   span.setAttribute('class', 'col-9')
   const checkbox = checkBox();
   if (todo.complete) {
     span.style.cssText = "text-decoration: line-through";
     checkbox.checked = true;
   }

   const edit = editBtn();
   checkbox.value = todo.complete;
   const delBtn = deletebtn();
   div.append(checkbox, span, edit, delBtn);
   div.setAttribute('class', 'todo-container row');
   return div;
 }

const editBtn = () => {
  // create edit button with eventListner
  let btn = document.createElement('button');
  btn.innerText = 'edit';
  btn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
  btn.addEventListener('click', function () {
    updateTodo(this);
  });
  return btn;
};

const deletebtn = () => {
  // create delete button with eventListner
  let btn = document.createElement('button');
  btn.innerText = 'X';
  btn.classList.add('btn', 'btn-danger', 'btn-sm');
  btn.addEventListener('click', function (evet) {
    deleteTodo(this)
  });
  return btn;
};

const checkBox = () => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'completed';
  checkbox.value = 'false';
  checkbox.setAttribute('class', 'col-xs-2');
  // // eventListener that determine if todo is completed
  checkbox.addEventListener('click', function (e) {
    // on checkbox check, the todo will be marked completed
    let id = e.target.parentNode.parentNode.id
    if (this.value === 'false') {
      console.log(this, `checkbox?`)
      completedTodo(this, id)  
    } else {
      incompleteTodo(this, id);
    }
  })
  return checkbox;
};
