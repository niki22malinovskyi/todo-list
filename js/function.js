let title = document.getElementById("title"),
  text = document.getElementById("text"),
  sendBtn = document.querySelector(".todo__btn"),
  todo = document.querySelector(".todo__table"),
  todoList = document.querySelector(".todo__table__list"),
  checkBtn = document.querySelector(".toggle-button"),
  list = [];

if (localStorage.getItem("todo")) {
  list = JSON.parse(localStorage.getItem("todo"));
  createData(list);
}


function validation() {
  let result = true;
  let allInput = document.querySelectorAll(".todo__input");

  for (let item of allInput) {
    if (!item.value) {
      item.classList.add("warn");
      result = false;
    } else {
      item.classList.remove("warn");
    }
  }
  return result;
}


function generateId() {
  const words =
    "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

  let id = "";
  for (let char of words) {
    const index = Math.floor(Math.random() * words.length);
    id += words[index];
  }
  return id;
}


function createData(data) {
  let table = document.querySelector(".todo__table");
  let display = "";

  let listsTables = data.map((item) => {
    display += `
    <li class="todo__table__list ${item.important ? "important" : ""}" id='${
      item.id
    }' >
      <label class="checkbox">
        <input type="checkbox" class='checkbox__input check' ${item.checked ? "checked" : ""}>
        <span class="checkbox__inner"></span>
      </label>
    
    <div class="todo__text">
        <input class="${
          item.checked ? "checked" : ""
        } input-text title" type="text" value="${item.title}">
        
    </div>
        <textarea class="todo__input text" type="text"
        placeholder="Додаткова інформація до цієї задачі">${
          item.text
        }</textarea>
        <div class="todo__text-btn">
            
            <button class="btn btn-delete"><img src="img/delete.svg" alt="musor"></button>
            <button class="btn btn-important"><img src="img/important.svg" alt="!"></button>
        </div>
    </li>
    `;
    table.innerHTML = display;
  });

  return listsTables;
}


sendBtn.addEventListener("click", function () {
  let todo = {
    id: generateId(),
    title: title.value,
    text: text.value,
    important: false,
    checked: false,
  };

  if (validation() == true) {
    list.push(todo);
    title.value = "";
    text.value = "";
  }

  localStorage.setItem("todo", JSON.stringify(list));
  createData(list);
});


function deleteElement(temp) {
  let data = temp.getAttribute("id");
  temp.remove();
  list.filter((item, i) => {
    if (item.id === data) {
      list.splice(i, 1);
    }
  });

  createData(list);
  localStorage.setItem("todo", JSON.stringify(list));
}


function checkElement(temp) {
  let data = temp.getAttribute("id");
  list.map((item) => {
    if (item.id === data) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(list));
    }
  });
  createData(list);
}


function importantElement(temp) {
  let data = temp.getAttribute("id");

  list.map((item) => {
    if (item.id === data) {
      item.important = !item.important;
      localStorage.setItem("todo", JSON.stringify(list));
    }
  });
  createData(list);
}


function editTitle(temp, value) {
  let data = temp.getAttribute("id");

  list.map((item) => {
    if (item.id === data) {
      item.title = value;
    }
  });
  localStorage.setItem("todo", JSON.stringify(list));
}

function editText(temp, value) {
  let data = temp.getAttribute("id");

  list.map((item) => {
    if (item.id === data) {
      item.text = value;
    }
  });
  localStorage.setItem("todo", JSON.stringify(list));
}

todo.addEventListener("change", function (e) {
  let target = e.target;
  let data = target.className.split(" ").splice(-1, 1)[0];

  let temp = target.closest(".todo__table__list");

  if (data === "title") {
    editTitle(temp, target.value);
    console.log(temp, target.value);
  }

  if (data === "text") {
    editText(temp, target.value);
    console.log(temp, target.value);
  }
});

todo.addEventListener("click", function (e) {
  let target = e.target;
  let data = target.className.split(" ").splice(-1, 1)[0];

  let temp = target.closest(".todo__table__list");
  if (data === "btn-delete") {
    deleteElement(temp);
  }
  if (data === "check") {
    checkElement(temp);
  }
  if (data === "btn-important") {
    importantElement(temp);
  }
});