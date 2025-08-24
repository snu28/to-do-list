const inputTask = document.getElementById("input-bar");
const addBtn = document.getElementById("add-btn");
const inProgressList = document.getElementById("current-tasks");
const completedTasks = document.getElementById("inactive-tasks");
const remainingNum = document.getElementById("remaining");
const completedNum = document.getElementById("completed");
const clearInProgress = document.getElementById("clear-current");
const clearCompleted = document.getElementById("clear-completed");

let tasks = [];

if (localStorage.getItem("tasks")){

    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task", task.status);
        li.textContent = task.text;
        if (task.status === "active"){
            inProgressList.appendChild(li);
        } else{
            completedTasks.appendChild(li);
        }
        
    });

    remainingNum.textContent = inProgressList.children.length;
    completedNum.textContent = completedTasks.children.length;
        
    

}


addBtn.addEventListener("click", createTask);

function createTask() {
    const task = inputTask.value.trim();

    if (task === ""){
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.classList.add("task", "active");
    li.textContent = task;
    inProgressList.appendChild(li);

    remainingNum.textContent = inProgressList.children.length;

    inputTask.value = "";

    tasks.push({text:task, status:"active"});
    localStorage.setItem("tasks", JSON.stringify(tasks));

    
    

}

inProgressList.addEventListener("click", completeTask);

function completeTask(event){
    const completedTask = event.target;
    completedTask.classList.remove("active");
    completedTask.classList.add("inactive");
    completedTasks.appendChild(completedTask);

    const index = tasks.findIndex(t => t.text === completedTask.textContent && t.status === "active");
    if (index !== -1) {
        tasks[index].status = "inactive";
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    remainingNum.textContent = inProgressList.children.length;
    completedNum.textContent = completedTasks.children.length;
    
}



function clear(type){
    if (type === "inProgressList"){
        tasks = tasks.filter(t => t.status !== "active");
        localStorage.setItem("tasks", JSON.stringify(tasks));
        inProgressList.innerHTML = "";
        remainingNum.textContent = "0";
    
    } else if (type ==="completedTasks"){
        tasks = tasks.filter(t => t.status !== "inactive");
        localStorage.setItem("tasks", JSON.stringify(tasks));
        completedTasks.innerHTML = "";
        completedNum.textContent = "0";

    
    }
}

clearInProgress.addEventListener("click", function(){
    clear("inProgressList")}
);

clearCompleted.addEventListener("click",function(){
    clear("completedTasks")}
);
