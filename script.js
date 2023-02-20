// Get DOM elements
const todoList = document.querySelector(".todo-list");
const form = document.querySelector("form");
const input = document.querySelector('input[type="text"]');

// Function to create a new todo item
function createTodoItem(text) {
  // Create new todo item
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  todoItem.appendChild(checkbox);

  // Create label
  const label = document.createElement("label");
  label.textContent = text;
  todoItem.appendChild(label);

  // Create edit button
  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.textContent = "Edit";
  todoItem.appendChild(editButton);

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  todoItem.appendChild(deleteButton);

  // Add todo item to list
  todoList.appendChild(todoItem);
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    createTodoItem(text);
    input.value = "";
  }
}

// Event listener for form submission
form.addEventListener("submit", handleFormSubmit);

// Event listener for edit button click
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-button")) {
    const todoItem = event.target.closest(".todo-item");
    const label = todoItem.querySelector("label");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = label.textContent;
    todoItem.replaceChild(input, label);
    input.focus();
    input.addEventListener("blur", () => {
      const text = input.value.trim();
      if (text !== "") {
        label.textContent = text;
      } else {
        todoItem.removeChild(input);
      }
    });
  }
});

// Event listener for delete button click
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    const todoItem = event.target.closest(".todo-item");
    todoList.removeChild(todoItem);
  }
});

// Event listener for checkbox click
todoList.addEventListener("change", (event) => {
  if (event.target.getAttribute("type") === "checkbox") {
    const todoItem = event.target.closest(".todo-item");
    if (event.target.checked) {
      todoItem.classList.add("completed");
    } else {
      todoItem.classList.remove("completed");
    }
  }
});
