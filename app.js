// SELECTORS

// INPUT FIELD IN THE HEADER
const todoInput = document.querySelector('.todo-input');
// TODO ADD BUTTON IN THE HEADER
const todoButton = document.querySelector('.todo-button');
// UL LIST
const todoList = document.querySelector('.todo-list');
// SELECTOR
const filterOption = document.querySelector('.filter-todo');


// EVENT LISTENERS

// check if the page is loaded and call the function to render the saved todos

document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('change', filterTodo);

// FUNCTIONS

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // CREATE THE TODO-DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');

    newTodo.innerText = todoInput.value;

    if (todoInput.value === "") {
        alert('Field is empty!')
        return;
    }

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // ADD TODO TO LOCAL STORAGE

    saveLocalTodos(todoInput.value);

    // TO ERASE ALL SAVED DATA IN LOCAL STORAGE
    // localStorage.clear()

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // DELETE BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // APPEND IT TO THE LIST
    todoList.appendChild(todoDiv);

    // CLEAR TODO INPUT VALUE
    todoInput.value = "";

};

function deleteCheck(e) {
    // clicking on the "ul" classified as "todo-list"
    const item = e.target;
    // "item" can be anything we click in the "li" item we created
    // DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // ANIMATION
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    // CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo =  item.parentElement;
        todo.classList.toggle('completed');
    }
};

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all" :
                todo.style.display = 'flex';
                break;
            case "completed" :
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "incomplete" :
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            }
    })
};

function saveLocalTodos(todo) {
    // CHECK IF I HAVE ALREADY THINGS IN MY TODOS ARRAY
    
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {

    // CREATE THE TODO-DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');

    newTodo.innerText = todo;

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // TO ERASE ALL SAVED DATA IN LOCAL STORAGE
    // localStorage.clear()

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // DELETE BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // APPEND IT TO THE LIST
    todoList.appendChild(todoDiv);

    });
};

function removeLocalTodos(todo) {

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};