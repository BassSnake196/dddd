const input = document.getElementById("inputBox");
const list = document.getElementById("list");
const button = document.querySelector(".boton");
const errorMsg = document.getElementById("errorMsg");
const btnDe = document.getElementById("delete");

// 🔹 Cargar tareas guardadas al inicio
document.addEventListener("DOMContentLoaded", loadTasks);

// 🔹 Agregar tarea
button.addEventListener("click", () => {
  if (input.value.trim() === "") {
    errorMsg.style.display = "block";  // mostrar mensaje
    input.classList.add("input-error"); // marcar input en rojo
  } else {
    errorMsg.style.display = "none";
    input.classList.remove("input-error");

    addTask(input.value);
    saveTask(input.value);

    input.value = "";
  }
});

// 🔹 Quitar error al escribir
input.addEventListener("input", () => {
  if (input.value.trim() !== "") {
    errorMsg.style.display = "none";

  }
});

// 🔹 Función para crear un li con toggle y botón de borrar
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  if (completed) li.classList.add("completed-task");

  // 🔹 Toggle a la izquierda
  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("toggle-btn");
  toggleBtn.textContent = "";
  if (completed) toggleBtn.classList.add("completed");

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("completed");
    li.classList.toggle("completed-task");
    updateTaskStatus(taskText, li.classList.contains("completed-task"));
  });

  // 🔹 Texto de la tarea
  const span = document.createElement("span");
  span.textContent = taskText;
  span.classList.add("task-text");

  // 🔹 Botón eliminar
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", () => {
    li.remove();
    removeTask(taskText);
  });

  // 🔹 Estructura de la tarea
  li.appendChild(toggleBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);
}

// 🔹 Guardar tarea en localStorage
function saveTask(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔹 Cargar tareas desde localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}

// 🔹 Eliminar tarea de localStorage
function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔹 Actualizar el estado completado en localStorage
function updateTaskStatus(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🔹 Borrar todas las tareas
btnDe.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  list.innerHTML = "";
});
