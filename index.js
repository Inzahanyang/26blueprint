const loginEl = document.querySelector(".login");
const containerEl = document.querySelector(".container");
const loginForm = document.getElementById("login-form");

const loginInfo = {
  username: "admin",
  password: "1234",
};

localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

function login(e) {
  e.preventDefault();
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  const storedLoginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  if (
    usernameInput === storedLoginInfo.username &&
    passwordInput === storedLoginInfo.password
  ) {
    containerEl.classList.remove("off");
    loginForm.classList.add("off");
  } else {
    alert("로그인 실패");
  }
}

loginForm.addEventListener("submit", login);

const realTimeClock = () => {
  const watchEl = document.getElementById("display-clock");

  setInterval(() => {
    const now = new Date();
    watchEl.innerText = `${now.getHours()} : ${
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
    } : ${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()}`;
  }, 1000);
};
const randomBackgroundImg = () => {
  const randomImg = [
    [
      "https://images.unsplash.com/photo-1682685797898-6d7587974771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1691246806224-a6e9dde3678d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1514724390871-40d54bd0484d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1682685797527-63b4e495938f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1596203721435-47040fbf51a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1670&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80",
    ],
  ];

  const bodyEl = document.querySelector("body");
  bodyEl.style.backgroundImage = `url(${
    randomImg[Math.floor(Math.random() * randomImg.length)]
  })`;
  bodyEl.style.backgroundRepeat = `no-repeat`;
  bodyEl.style.backgroundPosition = `center`;
  bodyEl.style.backgroundSize = "cover";
};
const todoList = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  console.log(todos);
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");

  function addTodo() {
    const now = new Date();
    todos.push(
      `${todoInput.value} : ${now.getMonth() + 1}월 ${now.getDate()}일`
    );

    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = "";
    renderTodos();
  }

  function renderTodos() {
    const todoList = document.getElementById("todo-list");

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      todoItem.innerText = todo;
      todoItem.classList.add("todoItem");

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";
      deleteBtn.classList.add("deleteBtn");

      deleteBtn.addEventListener("click", () => {
        deleteTodo(index);
      });

      todoItem.appendChild(deleteBtn);
      todoList.appendChild(todoItem);
    });
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTodo();
  }

  todoForm.addEventListener("submit", handleSubmit);
  renderTodos();
};
const getweather = () => {
  const weatherEl = document.getElementById("weather-display");
  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=19e2633fadb3d41491cadb0710e34edb`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        weatherEl.innerText = `${data.name}'s weather is ${data.weather[0].description} `;
      });
  }

  if (!navigator.geolocation) {
    console.log(`no geo`);
  } else {
    navigator.geolocation.getCurrentPosition(success);
  }
};

realTimeClock();
randomBackgroundImg();
todoList();
getweather();
