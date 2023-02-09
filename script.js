"use strict";

const inputTextNewTask = document.querySelector("#text-input-new-task");
const inputEditTask = document.querySelector("#input-edit-task");

const btnNewTask = document.querySelector("#btn-new-task");
const btnEditTaskSubmit = document.querySelector(".btn-edit-task-submit");
const btnCloseModal = document.querySelector("#close-modal");

const tasks = document.querySelector(".tasks");
const modalEditTask = document.querySelector(".modal-edit-task");
const overlay = document.querySelector(".overlay");

btnNewTask.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputTextNewTask.value) {
    const task = `<div class="task">
                <label class="task-text" for="task-completed">${inputTextNewTask.value}</label>
                <div class="commands">
                    <img src="/images/notchecked.png" class="btn-check-task" alt="taskCompleted">
                    <img src="/images/bin.png" alt="delete" class="btn-delete-task">
                    <img src="/images/pencil.png" alt="edit" class="btn-edit-task">
                </div>
            </div>`;
    tasks.insertAdjacentHTML("beforeend", task);
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
    task.remove();
  } else if (target.classList.contains("btn-edit-task")) {
    showModal();
    inputEditTask.focus();
  } else if (target.classList.contains("btn-check-task")) {
    if (task.firstElementChild.classList.contains("checked")) {
      task.firstElementChild.classList.remove("checked");
      target.src = "/images/notchecked.png";
    } else {
      task.firstElementChild.classList.add("checked");
      target.src = "/images/checked.png";
    }
  }
});

btnEditTaskSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputEditTask.value) {
    task.firstElementChild.textContent = inputEditTask.value;
  }
  closeModal();
});

window.addEventListener("error", function (event) {
  console.log(event);
});

btnCloseModal.addEventListener("click", function () {
  closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalEditTask.classList.contains("hidden")) {
    closeModal();
  }
});
