const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
    count.textContent = tasks.length;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.liked) li.classList.add("liked-task");

        // ✅ Complete checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        };

        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");

        // ⭐ Like button
        const likeBtn = document.createElement("button");
        likeBtn.textContent = task.liked ? "★" : "☆";
        likeBtn.className = "like-btn";
        likeBtn.onclick = () => {
            tasks[index].liked = !tasks[index].liked;
            saveTasks();
            renderTasks();
        };

        // ✏️ Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            const newText = prompt("Edit your task:", task.text);
            if (newText && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                saveTasks();
                renderTasks();
            }
        };

        // ❌ Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete";
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(likeBtn);
        li.appendChild(editBtn);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });

    updateCount();
}

function addTask() {
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ text: text, completed: false, liked: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

addBtn.onclick = addTask;
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

renderTasks();
