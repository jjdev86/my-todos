let user = null;
if (localStorage.getItem("user") == null) {
  let user = prompt("enter your username");
  const data = {};
  data.username = user;
  fetch("/new-user", {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data, `from server`)
      localStorage.setItem("user", data[0].username);
      localStorage.setItem("userId", data[0]._id);
    })
    .catch(err => console.log(err));
}
if (localStorage.getItem("allTodos") == null) {
  localStorage.setItem("allTodos", JSON.stringify([]));
  localStorage.setItem("todoId", 0);
}

const createTodo = event => {
  // get todo input value
  var char = event.which || event.keyCode;
  if (char === 13 || event.type === 'click') {
    const input = document.querySelector("input[type='text']");
    if (input.value.length) {
      // let id = Number(localStorage.getItem("todoId")) + 1;
      // const allTodos = JSON.parse(localStorage.getItem("allTodos"));
      // allTodos.push({ id: id, nodeText: input.value, complete: false });
      // // incompleteTodos.push([id, this.value]);
      // localStorage.setItem("todoId", id);
      // localStorage.setItem("allTodos", JSON.stringify(allTodos));
      // addTodo(input, id);

      // refactor to call fetch to create post
      const todo = {};
      todo.todo = input.value;
      todo.userId = localStorage.getItem("userId");
      todo.username = localStorage.getItem('user');
      fetch("/add-todo", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(todo), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          let id = data[0]._id;
          const allTodos = JSON.parse(localStorage.getItem("allTodos"));
          allTodos.push({ id: id, nodeText: data[0].todo, complete: false });
          // incompleteTodos.push([id, this.value]);
          localStorage.setItem("todoId", id);
          localStorage.setItem("allTodos", JSON.stringify(allTodos));
          addTodo(data[0].todo, data[0]._id);
            // clear input text
          input.value = "";
        })
        .catch(err => console.log(err));
    
      
    }
  }
  
};


/******************************************************************************\
 * =======================ALTER TODO =================== *
 ******************************************************************************/

const updateTodo = (id, currentValue) => {
  // get Modal input value
  console.log(id, `todo?`)
  let update = document.getElementById("modal-input");
  const todoUpdate = {};
  todoUpdate.todo = update.value;
  todoUpdate._id = id;
  // edit todo via server
  fetch('/edit-todo', {
    method: "PATCH",
    body: JSON.stringify(todoUpdate),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos"));
    allTodos.forEach(todo => {
      if (todo.id === id) {
        todo.nodeText = data.todo;
      }
    });
  
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    displayAllTodos();
    
  })
  .catch(err => console.log(err));
  var myModal = document.getElementById("save-modal");
  myModal.setAttribute("data-dismiss", "modal");
  update.value = "";
  // console.log(update., 'test');
  // displayAllTodos();
};

const deleteTodo = () => {
  const parentNode = document.getElementById("todo-list");
  const id = Number(event.target.parentNode.parentNode.id);
  const allTodos = JSON.parse(localStorage.getItem("allTodos"));

  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      allTodos.splice(index, 1);
    }
  });
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
  let removed = parentNode.removeChild(event.target.parentNode.parentNode);

  return removed;
};

/******************************************************************************\
 * =======================FILTER BY TODO STATUS FUNCTIONS =================== *
 ******************************************************************************/

const completedTodo = (e, span, id) => {
  id = Number(id);
  console.log(e, `event`);
  // e.parentNode.childNodes[1].style.cssText = "text-decoration: line-through";
  span.style.cssText = "text-decoration: line-through";
  // disable edit button
  span.parentNode.childNodes[2].style.display = "none";
  e.value = "yes";
  e.checked = true;
  const allTodos = JSON.parse(localStorage.getItem("allTodos"));
  // update todo to complete
  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      todo.complete = true;
    }
  });
  //update completeTodos with new
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
  // displayIncompleteTodos();
};

const incompleteTodo = (e, span, id) => {
  id = Number(id);
  // e.parentNode.childNodes[1].style.cssText = "text-decoration: none";
  span.style.cssText = "text-decoration: none";
  console.log(e.parentNode, "line 121 incomplete");
  span.parentNode.childNodes[2].style.display = "inline-block";
  e.value = "false";

  const allTodos = JSON.parse(localStorage.getItem("allTodos"));
  allTodos.forEach((todo, index) => {
    if (todo.id === id) {
      todo.complete = false;
    }
  });
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
  // displayCompletedTodos();
};

const displayAllTodos = () => {
  // get all todos from storage
  const todos = JSON.parse(localStorage.getItem("allTodos"));
  document.getElementById("todo-list").innerHTML = "";

  todos.forEach((todo, index) => {
    const ul = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.setAttribute("id", todo.id);
    li.className = "col-xl-10 offset-xl-1 li";
    // creates a todo and appends to div
    const div = createFilteredTodo(todo);
    ul.appendChild(li).append(div);
  });
};

const deleteAllTodos = () => {
  localStorage.setItem("allTodos", "[]");
  document.getElementById("todo-list").innerHTML = "";
};

/******************************************************************************\
 * ============================HELPER FUNCTIONS================================/
 ******************************************************************************/

const addTodo = (input, id) => {
  let li = document.createElement("li");
  li.setAttribute("id", id);
  li.className = "col-xl-10 offset-xl-1 li";
  // create edit button with eventListner
  const editButton = editBtn();
  // create delete button with eventListner
  const deleteButton = deletebtn();
  // create checkbox
  const checkbox = checkBox();
  // create span tag
  const span = document.createElement("span");
  // div to contain checkbox, span, edit and delete buttons
  const div = document.createElement("div");
  // div.classList.add('row', 'todo-container');
  div.className = "row todo-container";
  // set input value to span tag
  // span.innerText = input.value;
  span.innerText = input;
  span.className = "col-xl-9 col-lg-9 col-md-8 col-sm-6";
  // clear input text
  // input.value = "";

  const ul = document.getElementById("todo-list");
  // append elements to div
  div.append(checkbox, span, editButton, deleteButton);
  // div.setAttribute('class', 'todo-container', 'row');
  // append div to li and li to ul
  ul.appendChild(li).append(div);
  // store todo in client storage
};

const displayCompletedTodos = () => {
  const todos = JSON.parse(localStorage.getItem("allTodos"));
  document.getElementById("todo-list").innerHTML = "";
  // debugger;
  todos.forEach((todo, index) => {
    if (todo.complete) {
      const ul = document.getElementById("todo-list");
      const li = document.createElement("li");
      li.setAttribute("id", todo.id);
      li.className = "col-xl-10 offset-xl-1 li";
      // creates a todo and appends to div
      let div = createFilteredTodo(todo);
      //  div.setAttribute('class', 'todo-container');
      ul.appendChild(li).append(div);
    }
  });
};

const displayIncompleteTodos = () => {
  console.log("display all incompleteTodos");
  const todos = JSON.parse(localStorage.getItem("allTodos"));
  document.getElementById("todo-list").innerHTML = "";

  todos.forEach((todo, index) => {
    if (!todo.complete) {
      const ul = document.getElementById("todo-list");
      const li = document.createElement("li");
      li.setAttribute("id", todo.id);
      li.className = "col-xl-10 offset-xl-1 li";
      // creates a todo and appends to div
      let div = createFilteredTodo(todo);
      // div.setAttribute('class', 'todo-container');
      ul.appendChild(li).append(div);
    }
  });
};

const createFilteredTodo = todo => {
  const div = document.createElement("div");
  div.className = "todo-container row";

  const span = document.createElement("span");
  span.innerText = todo.nodeText;
  (span.className = "col-xl-9"), "col-lg-9", "col-md-8", "col-sm-6";

  const checkbox = checkBox();

  if (todo.complete) {
    span.style.cssText = "text-decoration: line-through";
    checkbox.firstChild.checked = true;
  }

  const edit = editBtn();
  checkbox.value = todo.complete;
  const delBtn = deletebtn();
  div.append(checkbox, span, edit, delBtn);
  // div.setAttribute("class", "todo-container row");
  return div;
};

const editBtn = () => {
  let div = document.createElement("div");
  div.className = "col-xl-1 col-lg-1 col-md-1 col-sm-2";

  // create edit button with eventListner
  let btn = document.createElement("button");
  btn.innerText = "edit";
  btn.className = "btn btn-edit";
  btn.setAttribute("data-toggle", "modal");
  btn.setAttribute("data-target", "#exampleModal");

  btn.addEventListener("click", function(e) {
    // console.log(e)
    // btn.setAttribute('data-toggle', 'modal');
    // btn.setAttribute('data-target', "#exampleModal")
    var myModal = document.getElementById("save-modal");

    let id = this.parentNode.parentNode.id;
    let nodes = this.parentNode.childNodes;
    let currentTodoValue;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].localName == "span") {
        currentTodoValue = nodes[i].innerHTML;
      }
    }

    document.getElementById("modal-input").value = currentTodoValue;
    myModal.setAttribute("onclick", `updateTodo("${id}", "${currentTodoValue}")`);

    // console.log(this.parentNode)
    // updateTodo(this);
  });
  return btn;
};

const deletebtn = () => {
  let div = document.createElement("div");
  div.className = "col-xl-1 col-lg-1 col-md-1 col-sm-2";

  // create delete button with eventListner
  let btn = document.createElement("button");
  btn.innerText = "X";
  btn.addEventListener("mouseenter", function(e) {
    chbg(this, "#fff", "#058DB5");
  });

  btn.className = "btn btn-delete";
  btn.addEventListener("click", function(event) {
    deleteTodo(this);
  });
  return btn;
};

const checkBox = () => {
  // create label
  const label = document.createElement("label");
  label.className = "checkbox-label col-xl-1 col-lg-1 col-md-1 col-sm-2";
  // create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "completed";
  checkbox.value = "false";
  checkbox.className = "col-xl-1 col-lg-1 col-md-1 col-sm-2 checkbox-label";
  // add listener that determine to check if todo is complete/incomplete
  checkbox.addEventListener("click", function(e) {
    // get id of li containing the todo
    let id = e.target.parentNode.parentNode.parentNode.id;
    // nodes inside li
    let nodes = e.target.parentNode.parentNode.childNodes;
    let spanNode;
    // find the node with the todo text value
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].localName == "span") {
        spanNode = nodes[i];
      }
    }
    // determine if checkbox is unchecked
    if (this.value === "false") {
      completedTodo(this, spanNode, id);
    } else {
      incompleteTodo(this, spanNode, id);
    }
  });
  // span to contain custom checkbox
  const span = document.createElement("span");
  span.className = "checkbox-custom checkbox-label";
  label.append(checkbox, span);

  return label;
};

// fn to change edit button color onmouseover on remove btn
const chbg = (e, bg, color) => {
  console.log(color);
  e.previousSibling.style.background = bg;
  e.previousSibling.style.color = color;

  // reset the color after mouse leave
  e.addEventListener("mouseleave", function() {
    e.previousSibling.style.color = "";
    e.previousSibling.style.background = "";
  });
};

// validate savebtn
const validateSave = e => {
  const save = document.getElementById("save-modal");

  if (e.value.length >= 1 && e.value != "Default text") {
    save.style.background = "#058DB5";
    save.style.color = "#fff";
    save.disabled = false;
  } else {
    save.style.background = "#fff";
    save.style.color = "#058db5";
    save.disabled = true;
  }
};
