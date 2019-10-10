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



const updateTodo = (id, currentValue) => {
  // get Modal input value
  let update = document.getElementById('modal-input');
  const allTodos = JSON.parse(localStorage.getItem('allTodos'));
  
  allTodos.forEach(todo => {
    if (todo.id === id) {
      todo.nodeText = update.value;
    }
  });
  localStorage.setItem('allTodos', JSON.stringify(allTodos));

  var myModal = document.getElementById('save-modal');
  myModal.setAttribute("data-dismiss", "modal");
  update.value = '';
  // console.log(update., 'test');
  displayAllTodos();
};

const deleteTodo = () => {
  const parentNode = document.getElementById("todo-list");
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


const completedTodo = (e, span, id) => {
  id = Number(id);
  console.log(e, `event`)
  // e.parentNode.childNodes[1].style.cssText = "text-decoration: line-through";
  span.style.cssText = "text-decoration: line-through"
  // disable edit button
  span.parentNode.childNodes[2].style.display = 'none';
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

const incompleteTodo = (e, span, id) => {

  id = Number(id);
  // e.parentNode.childNodes[1].style.cssText = "text-decoration: none";
  span.style.cssText = "text-decoration: none";
  console.log(e.parentNode, 'line 121 incomplete');
  span.parentNode.childNodes[2].style.display = "inline-block";
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
    li.className = 'col-xl-10 offset-xl-1 li';
    // creates a todo and appends to div
    const div = createFilteredTodo(todo);
    ul.appendChild(li).append(div);
  });

};

const deleteAllTodos = () => {

  localStorage.setItem('allTodos', "[]");
  document.getElementById('todo-list').innerHTML = '';

};


/******************************************************************************\
 * ============================HELPER FUNCTIONS================================/
 ******************************************************************************/

const addTodo = (input, id) => {
  let li = document.createElement('li');
  li.setAttribute('id', id);
  li.className = "col-xl-10 offset-xl-1 li";
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
  // div.classList.add('row', 'todo-container');
  div.className = 'row todo-container';
  // set input value to span tag
  span.innerText = input.value;
  span.className = 'col-xl-9 col-lg-9 col-md-8 col-sm-6';
  // clear input text
  input.value = '';

  const ul = document.getElementById("todo-list");
  // append elements to div
  div.append(checkbox, span, editButton, deleteButton)
  // div.setAttribute('class', 'todo-container', 'row');
  // append div to li and li to ul
  ul.appendChild(li).append(div);
  // store todo in client storage

};

const displayCompletedTodos = () => {
  const todos = JSON.parse(localStorage.getItem('allTodos'));
  document.getElementById("todo-list").innerHTML = '';
  // debugger;
  todos.forEach((todo, index) => {
 
    if (todo.complete) {
     const ul = document.getElementById("todo-list");
     const li = document.createElement('li');
     li.setAttribute('id', todo.id);
     li.className = "col-xl-10 offset-xl-1 li";
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
   document.getElementById("todo-list").innerHTML = '';
 
   todos.forEach((todo, index) => {
 
     if (!todo.complete) {
      const ul = document.getElementById("todo-list");
      const li = document.createElement('li');
      li.setAttribute('id', todo.id);
      li.className = "col-xl-10 offset-xl-1 li";
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
   span.className = 'col-xl-9', 'col-lg-9', 'col-md-8', 'col-sm-6';
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
  btn.className = 'btn col-xl-1 col-lg-1 col-md-1 col-sm-2 btn-outline-secondary btn-sm todo-btn';
  btn.setAttribute('data-toggle', 'modal');
  btn.setAttribute('data-target', "#exampleModal")

  btn.addEventListener('click', function (e) {
    // console.log(e)
    // btn.setAttribute('data-toggle', 'modal');
    // btn.setAttribute('data-target', "#exampleModal")
    var myModal = document.getElementById('save-modal');
    
    let id = this.parentNode.parentNode.id;
    let nodes = this.parentNode.childNodes;
    let currentTodoValue;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].localName == "span") {
        currentTodoValue = nodes[i].innerHTML;
      }
    }
    
    document.getElementById('modal-input').value = currentTodoValue;
    myModal.setAttribute('onclick', `updateTodo(${id}, "${currentTodoValue}")`)
    
    
    // console.log(this.parentNode)
    // updateTodo(this);

  });
  return btn;
};

const deletebtn = () => {
  // create delete button with eventListner
  let btn = document.createElement('button');
  btn.innerText = 'X';
  btn.className = 'col-xl-1 col-lg-1 col-md-1 col-sm-2 ';
  btn.addEventListener('click', function (evet) {
    deleteTodo(this)
  });
  return btn;
};

const checkBox = () => {
  const label = document.createElement('label');
  label.className = 'checkbox-label col-xl-1 col-lg-1 col-md-1 col-sm-2';
  const checkbox = document.createElement('input');






  checkbox.type = 'checkbox';
  checkbox.name = 'completed';
  checkbox.value = 'false';
  checkbox.className = 'col-xl-1 col-lg-1 col-md-1 col-sm-2 checkbox-label';
  // // eventListener that determine if todo is completed
  checkbox.addEventListener('click', function (e) {
    // on checkbox check, the todo will be marked completed
    // console.log(e, `event triggered`)
    // console.log(this, `this val`)
    let nodes = e.target.parentNode.parentNode.childNodes;
    let spanNode;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].localName == "span") {
        spanNode = nodes[i];
      }
    }
    // console.log(spanNode, `where are we in the tree`)
    let id = e.target.parentNode.parentNode.parentNode.id
    // console.log(id, `todo ID`)
    console.log(spanNode,`this value`)
    if (this.value === 'false') {
      // console.log(this, `checkbox?`)
      // completedTodo(this, id) 
      console.log(`box was checked as completed`) 
      completedTodo(this, spanNode, id);
    } else {
      // incompleteTodo(this, id);
      console.log(`box was checked as incompleted`) 
      incompleteTodo(this, spanNode, id);
    }
  });
  const span = document.createElement('span');
  span.className = 'checkbox-custom checkbox-label';
  label.append(checkbox, span);

  return label;
  // return checkbox;
};
