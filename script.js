const todoForm = document.querySelector('.todo__form');
const todoInput = document.querySelector('.todo__input');
const todoSubmitButton = document.querySelector('.todo__submit-button');
const todoSelectButton = document.querySelector('.todo__select');
const todoList = document.querySelector('.todo__list');
let todoArray = [];
const baseTodoArray = [
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
    done: true,
  },
];




todoSubmitButton.addEventListener('click', addTodo);

todoSelectButton.addEventListener('click', selectTodo);


todoList.addEventListener('click', function (evt) {
  if (evt.target.matches('.todo__checkbox')) {
    checkTodo(evt);
  } else if (evt.target.matches('.todo__delete-btn')) {
    deleteTodo(evt);
  }
});




// Первоначальная инициализация массива задач при запуске страницы
getArrayInitialize();

// При загрузке страницы отрисовываем в разметке задачи из массива
createTemplateTask(todoArray);




// Метод для получения данных из локального хранилища браузера
function getLocalStorage(element) {
  return JSON.parse(localStorage.getItem(element));
}

// Метод для сохранения данных в локальном хранилище браузера
function setLocalStorage(element) {
  localStorage.setItem('todoArray', JSON.stringify(element));
}

// Первоначальная инициализация массива задач при запуске страницы
function getArrayInitialize() {
  todoArray = getLocalStorage('todoArray');

  // Проверка на наличие задач в локальном хранилище
  if (todoArray === null) {
    todoArray = [...baseTodoArray];
    setLocalStorage(todoArray)
  }
}

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
  // Сохранение задач в localStorage
  setLocalStorage(todoArray)
  // Отрисовываем задачи в разметке на странице
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
  if (index === -1) {
    return console.log('Задача не найдена!');
  }

  console.log('Задача удалена!');
  // Удаление задачи из массива
  todoArray.splice(index, 1);
  // Сохранение массива задач в localStorage
  setLocalStorage(todoArray)
  // Удаление задачи из разметки
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
  if (index === -1) {
    return console.log('Задача не найдена!');
  }

  // Проверка на отмеченный чекбокс
  if (!inputCheckbox.checked) {
    console.log('Чекбокс снят')
    todoArray[index].done = false;
    // Сохранение массива задач в localStorage
    setLocalStorage(todoArray);
    return;
  }

  console.log('Чекбокс отмечен')
  todoArray[index].done = true;
  // Сохранение массива задач в localStorage
  setLocalStorage(todoArray);
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

// Функция фильтрации задач
function selectTodo() {
  const selectValue = todoSelectButton.value;
  let selectArray;

  const filterFunctions = {
    All: () => createTemplateTask(todoArray),
    Completed: () => {
      selectArray = todoArray.filter((task) => task.done === true);
      createTemplateTask(selectArray);
    },
    Uncompleted: () => {
      selectArray = todoArray.filter((task) => task.done === false);
      createTemplateTask(selectArray);
    }
  }

  // Вызов функции фильтрации
  const selecredFunction = filterFunctions[selectValue];
  if (selecredFunction) {
    selecredFunction();
  }
}
