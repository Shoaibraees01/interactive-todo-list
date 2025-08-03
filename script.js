let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskDesc = document.getElementById('taskDesc');
  const taskText = taskInput.value.trim();
  const description = taskDesc.value.trim();

  if (taskText === '') return;

  const newTask = {
    text: taskText,
    description: description,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  taskInput.value = '';
  taskDesc.value = '';
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.description || '-'}</td>
      <td>${task.completed ? 'Completed' : 'Not Completed'}</td>
      <td>
        <button class="complete" onclick="toggleComplete(${index})">
          <i class="fas fa-check-circle"></i> ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button class="delete" onclick="deleteTask(${index})">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();
