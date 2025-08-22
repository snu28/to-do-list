const inputTask = document.getElementById("input-bar");
const addBtn = document.getElementById("add-btn");
const inProgressList = document.getElementById("current-tasks")

addBtn.addEventListener("click", createTask);

function createTask() {
    const task = inputTask.value.trim();

    if (task ===" "){
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task", "active");
    li.textContent = task;
    inProgressList.appendChild(li);

    inputTask.value = "";



}