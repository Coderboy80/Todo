"use strict";

const inputTextNewTask = document.querySelector("#text-input-new-task");
const inputEditTask = document.querySelector("#input-edit-task");

const btnNewTask = document.querySelector("#btn-new-task");
const btnEditTaskSubmit = document.querySelector(".btn-edit-task-submit");
const btnCloseModal = document.querySelector("#close-modal");

const tasks = document.querySelector(".tasks");
const modalEditTask = document.querySelector(".modal-edit-task");
const overlay = document.querySelector(".overlay");

let allTasks = JSON.parse(localStorage.getItem("allTheTasks")) ?? [];
displayTasks(allTasks);

function displayTasks(tasksArr) {
  tasks.innerHTML = "";
  for (let [key, value] of Object.entries(tasksArr)) {
    const taskEle = `<div class="task">
  <label class="task-text ${
    value.isCheck ? "checked" : ""
  }" for="task-completed">${value.task_}</label>
  <div class="commands">
      <img title="Task Completed" src="/images/${
        value.isCheck ? "checked.png" : "notchecked.png"
      }" class="btn-check-task" alt="taskCompleted">
      <img title="Remove Task" src="/images/bin.png" alt="delete" class="btn-delete-task">
      <img title="Edit Task" src="/images/pencil.png" alt="edit" class="btn-edit-task">
  </div>
</div>`;
    tasks.insertAdjacentHTML("beforeend", taskEle);
  }
}

btnNewTask.addEventListener("click", function (e) {
  e.preventDefault();

  let allTasksText = [];
  for (let [key, value] of Object.entries(allTasks)) {
    allTasksText.push(value.task_);
  }

  if (
    inputTextNewTask.value &&
    !allTasksText.includes(inputTextNewTask.value)
  ) {
    const task = inputTextNewTask.value;

    allTasks.push({ task_: task, isCheck: false });
    displayTasks(allTasks);
    storeLocally(allTasks);
  }

  inputTextNewTask.value = "";
});

function showModal() {
  modalEditTask.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modalEditTask.classList.add("hidden");
  overlay.classList.add("hidden");
  inputEditTask.value = "";
}

let task;
tasks.addEventListener("click", function (e) {
  let target = e.target;
  task = target.closest(".task");
  if (target.classList.contains("btn-delete-task")) {
    let removeTask = allTasks.findIndex((t) => {
      return t.task_ === task.firstElementChild.textContent;
    });
    allTasks.splice(removeTask, 1);
    displayTasks(allTasks);
    storeLocally(allTasks);
  } else if (target.classList.contains("btn-edit-task")) {
    showModal();
    inputEditTask.value = task.firstElementChild.textContent;
    inputEditTask.focus();
    inputEditTask.select();
  } else if (target.classList.contains("btn-check-task")) {
    if (task.firstElementChild.classList.contains("checked")) {
      for (let [key, value] of Object.entries(allTasks)) {
        if (value.task_ === task.firstElementChild.textContent) {
          value.isCheck = false;
          storeLocally(allTasks);
        }
      }
      task.firstElementChild.classList.remove("checked");
      target.src = "/images/notchecked.png";
    } else {
      for (let [key, value] of Object.entries(allTasks)) {
        if (value.task_ === task.firstElementChild.textContent) {
          value.isCheck = true;
          storeLocally(allTasks);
        }
      }
      task.firstElementChild.classList.add("checked");
      target.src = "/images/checked.png";
    }
  }
});

btnEditTaskSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  let allTasksText = [];
  for (let [key, value] of Object.entries(allTasks)) {
    allTasksText.push(value.task_);
  }
  if (inputEditTask.value && !allTasksText.includes(inputEditTask.value)) {
    let editTask = allTasks.findIndex((t) => {
      return t.task_ === task.firstElementChild.textContent;
    });
    allTasks[editTask].task_ = inputEditTask.value;
    displayTasks(allTasks);
    storeLocally(allTasks);
  }
  closeModal();
});

btnCloseModal.addEventListener("click", function () {
  closeModal();
});
overlay.addEventListener("click", function () {
  closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalEditTask.classList.contains("hidden")) {
    closeModal();
  }
});

function storeLocally(allTaskArr) {
  localStorage.setItem("allTheTasks", JSON.stringify(allTaskArr));
}
