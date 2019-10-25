// let user = null;
// if (localStorage.getItem("user") == null) {
//   let user = prompt("enter your username");
//   const data = {};
//   data.username = user;
//   fetch("/new-user", {
//     method: "POST", // or 'PUT'
//     body: JSON.stringify(data), // data can be `string` or {object}!
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       localStorage.setItem("user", data[0].username);
//       localStorage.setItem("userId", data[0]._id);
//     })
//     .catch(err => console.log(err));
// }

const createTodo = event => {
  // get todo input value
  var char = event.which || event.keyCode;
  if (char === 13 || event.type === 'click') {
    const input = document.querySelector("input[type='text']");
    if (input.value.length) {

      // refactor to call fetch to create post
      const todo = {};
      todo.todo = input.value;
      todo.userId = localStorage.getItem("userId");
      console.log(todo, `line 32`)
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
          console.log(data, `todo`)
          addTodo(data[0])
          input.value = "";
        })
        .catch(err => console.log(err));
    }
  }

};


/******************************************************************************\
 * =======================ALTER TODO =================== *
 ******************************************************************************/

const updateTodo = (id) => {
  // get Modal input value
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
      displayAllTodos();
    })
    .catch(err => console.log(err));
  var myModal = document.getElementById("save-modal");
  myModal.setAttribute("data-dismiss", "modal");
  update.value = "";

};

const deleteTodo = () => {
  const parentNode = document.getElementById("todo-list");
  const id = event.target.parentNode.parentNode.id;
  let e = event;
  // call server to delete todo
  fetch('/remove-todo', {
    method: "DELETE", // or 'PUT'
    body: JSON.stringify({ id }), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      let removed = parentNode.removeChild(e.target.parentNode.parentNode);
      return removed;
    })
};

/******************************************************************************\
 * =======================FILTER BY TODO STATUS FUNCTIONS =================== *
 ******************************************************************************/

const completedTodo = (e, span, _id) => {

  fetch('/complete-todo', {
    method: "PATCH",
    body: JSON.stringify({ _id, isComplete: true }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      span.style.cssText = "text-decoration: line-through";
      // disable edit button
      span.parentNode.childNodes[2].disabled = true;
      e.value = JSON.stringify(data.isComplete);
      e.checked = data.isComplete;
    })
    .catch(err => console.log(err));

};

const incompleteTodo = (e, span, _id) => {

  fetch('/complete-todo', {
    method: "PATCH",
    body: JSON.stringify({ _id, isComplete: false }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {

      span.style.cssText = "text-decoration: none";
      span.parentNode.childNodes[2].style.display = "inline-block";
      e.value = data.isComplete;
    })


};

const displayAllTodos = () => {
  // get all todos from storage

  document.getElementsByClassName('spinner-border')[0].style.display = '';
  document.getElementById("todo-list").innerText = '';

  setTimeout(() => {
    // get todos from db
    fetch(`/all-todos`, {
      method: "GET", // or 'PUT'
      // body: JSON.stringify({_id }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        document.getElementsByClassName('spinner-border')[0].style.display = 'none';
        console.log(data, `from displayAllTodos`);
        document.getElementById("todo-list").innerHTML = "";
        data.forEach((todo, index) => {

          const ul = document.getElementById("todo-list");
          const li = document.createElement("li");
          li.setAttribute("id", todo._id);
          li.className = "col-xl-10 offset-xl-1 li";
          // creates a todo and appends to div
          const div = createFilteredTodo(todo);
          ul.appendChild(li).append(div);
        });
      })
      .catch(err => console.log(err));

  }, 1000)

};

const deleteAllTodos = () => {
  // localStorage.setItem("allTodos", "[]");
  const _id = localStorage.getItem("userId");
  // get todos from db
  fetch(`/remove-all-todos${_id}`, {
    method: "DELETE", // or 'PUT'
    // body: JSON.stringify({_id }), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => {
      // console.log(data, `response`)
      document.getElementById("todo-list").innerHTML = "";
    })
    .catch(err => console.log(err));
};

/******************************************************************************\
 * ============================HELPER FUNCTIONS================================/
 ******************************************************************************/

const addTodo = (data) => {
  let li = document.createElement("li");
  li.setAttribute("id", data._id);
  li.className = "col-xl-10 offset-xl-1 li";
  // create edit button with eventListner
  const editButton = editBtn();
  // create delete button with eventListner
  const deleteButton = deletebtn();
  // create checkbox
  const checkbox = checkBox(data.isComplete);
  // create span tag
  const span = document.createElement("span");
  // div to contain checkbox, span, edit and delete buttons
  const div = document.createElement("div");
  // div.classList.add('row', 'todo-container');
  div.className = "row todo-container";
  // set input value to span tag
  // span.innerText = input.value;
  span.innerText = data.todo;
  span.className = "col-xl-9 col-lg-9 col-md-8 col-sm-6";

  const ul = document.getElementById("todo-list");
  // append elements to div
  div.append(checkbox, span, editButton, deleteButton);
  // div.setAttribute('class', 'todo-container', 'row');
  // append div to li and li to ul
  ul.appendChild(li).append(div);
  // store todo in client storage
};

const displayCompletedTodos = () => {
  // const todos = JSON.parse(localStorage.getItem("allTodos"));
  document.getElementById("todo-list").innerHTML = "";
  // debugger;
  const _id = localStorage.getItem("userId");
  fetch(`/completed-todos${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      data.forEach((todo, index) => {
        const ul = document.getElementById("todo-list");
        const li = document.createElement("li");
        li.setAttribute("id", todo._id);
        li.className = "col-xl-10 offset-xl-1 li";
        // creates a todo and appends to div
        let div = createFilteredTodo(todo);
        //  div.setAttribute('class', 'todo-container');
        ul.appendChild(li).append(div);
      });
    })
    .catch(err => {
      console.log(err);
    });

};

const displayIncompleteTodos = () => {

  document.getElementById("todo-list").innerHTML = "";
  const _id = localStorage.getItem("userId");
  fetch(`/incomplete-todos${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data, `incomplete todos`);
      data.forEach((todo, index) => {
        const ul = document.getElementById("todo-list");
        const li = document.createElement("li");
        li.setAttribute("id", todo._id);
        li.className = "col-xl-10 offset-xl-1 li";
        // creates a todo and appends to div
        let div = createFilteredTodo(todo);

        ul.appendChild(li).append(div);
      });
    })
    .catch(err => console.log(err));
};

const createFilteredTodo = todo => {
  const div = document.createElement("div");
  div.className = "todo-container row";

  const span = document.createElement("span");
  span.innerText = todo.todo;
  span.className = "col-xl-9 col-lg-9 col-md-8 col-sm-6";

  const checkbox = checkBox(todo.isComplete);

  if (todo.isComplete) {
    span.style.cssText = "text-decoration: line-through";
    checkbox.firstChild.checked = true;
  }

  const edit = editBtn();
  if (todo.isComplete) {
    edit.disabled = true;
  }
  checkbox.value = todo.isComplete;
  const delBtn = deletebtn();

  div.append(checkbox, span, edit, delBtn);

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

  btn.addEventListener("click", function (e) {
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

  });
  return btn;
};

const deletebtn = () => {
  let div = document.createElement("div");
  div.className = "col-xl-1 col-lg-1 col-md-1 col-sm-2";

  // create delete button with eventListner
  let btn = document.createElement("button");
  btn.innerText = "X";
  btn.addEventListener("mouseenter", function (e) {
    chbg(this, "#fff", "#058DB5");
  });

  btn.className = "btn btn-delete";
  btn.addEventListener("click", function (event) {
    deleteTodo(this);
  });
  return btn;
};

const checkBox = (isComplete) => {
  // create label
  const label = document.createElement("label");
  label.className = "checkbox-label col-xl-1 col-lg-1 col-md-1 col-sm-2";
  // create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "completed";
  checkbox.value = isComplete;
  checkbox.className = "col-xl-1 col-lg-1 col-md-1 col-sm-2 checkbox-label";
  // add listener that determine to check if todo is complete/incomplete
  checkbox.addEventListener("click", function (e) {
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
      // enable edit button
      this.parentNode.nextSibling.nextSibling.disabled = false;
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
  e.previousSibling.style.background = bg;
  e.previousSibling.style.color = color;

  // reset the color after mouse leave
  e.addEventListener("mouseleave", function () {
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
