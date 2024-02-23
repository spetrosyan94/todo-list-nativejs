const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const todoArray = [
  {
    id: 1,
    title: 'Принять душ 💧',
    done: false,
  },
  {
    id: 2,
    title: 'Приготовить завтрак 🍎',
    done: false,
  },
  {
    id: 3,
    title: 'Писать много кода на JS 😄',
    done: false,
  },
];

// При загрузке страницы создаем задачи из массива
createTemplateTask(todoArray);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', function (evt) {
  if (evt.target.matches('.todo__checkbox')) {
    checkTodo(evt);
  } else if (evt.target.matches('.todo__delete-btn')) {
    deleteTodo(evt);
  }
});

// Создание новой задачи
function addTodo(evt) {
  evt.preventDefault();

  const valueInputText = todoInput.value.trim()
  // Проверка на пустую строку
  if (valueInputText === '') {
    // alert('Вы забыли написать задачу!')
    todoInput.placeholder = 'Вы забыли написать задачу!'
    todoInput.classList.add('todo__input_none-text');
    return;
  }

  // Добавление задачи в массив
  const todoTask = {
    id: Date.now(),
    title: valueInputText,
    done: false,
  }

  todoInput.placeholder = 'Новая задача';
  todoInput.classList.remove('todo__input_none-text');
  // Очистка поля ввода
  todoInput.value = '';

  // Добавление задачи в массив
  todoArray.push(todoTask);
  console.log(todoArray);

  createTemplateTask(todoArray);
}

function deleteTodo(evt) {
  const buttonDelete = evt.target;

  if (!buttonDelete.matches('.todo__delete-btn')) {
    return;
  }

  const currentTodo = buttonDelete.closest('.todo__item');
  // Поиск индекса задачи
  const index = todoArray.findIndex((task) => task.id === Number(currentTodo.id));

  // Проверка на наличие задачи
  if(index === -1) {
    return console.log('Задача не найдена!');
  }

  console.log('Задача удалена!');
  // Удаление задачи из массива
  todoArray.splice(index, 1);
  currentTodo.remove();
}

function checkTodo(evt) {
  const inputCheckbox = evt.target;

  // Проверка на существование чекбокса
  if (!inputCheckbox.matches('.todo__checkbox')) {
    return;
  }

  const currentTodo = inputCheckbox.closest('.todo__item');
  const index = todoArray.findIndex((task) => task.id === Number(currentTodo.id));

  // Проверка на наличие задачи
  if(index === -1) {
    return console.log('Задача не найдена!');
  }

  // Проверка на отмеченный чекбокс
  if(!inputCheckbox.checked) {
    console.log('Чекбокс снят')
    todoArray[index].done = false;
    return;
  }

  console.log('Чекбокс отмечен')
  todoArray[index].done = true;
}

// Функция создания шаблона
function createTemplateTask(taskArray) {
      // Очистка разметки списка задач
      todoList.innerHTML = '';

  taskArray.forEach((task) => {
    const template = `
    <li class="todo__item" id=${task.id}>
    <label class="todo__item-label">
      <input class="todo__checkbox" type="checkbox" ${task.done ? 'checked' : ''}/>
      <span class="todo__item-text">${task.title}</span>
    </label>
    <button class="todo__delete-btn"></button>
    </li>
    `;
    todoList.insertAdjacentHTML('beforeend', template);
  })
}

