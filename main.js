/*
  @class Model
*/

class Model {
  constructor() {
    this.todos = [
      // { id: 0, text:'My fancy Todo', completed: false}
    ];
  }

  // Adding a simple todo giving a unique id with date and text
  createTodo(text) {
    const todo = {
      id: Date()
        .now.toString()
        .concat(text),
      text,
      completed: false
    };
    this.todos.push(todo);
  }

  // update todo text method, map through the todos and replace the text with the specified id
  updateTodo(id, text) {
    this.todos = this.todos.map(todo => {
      todo.id === id ? { id: todo.id, text, completed: todo.completed } : todo;
    });
  }

  // delete todo method: filter the todo with specified id
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // toggle todo completed method
  updateTodo(id) {
    this.todos = this.todos.map(todo => {
      todo.id === id
        ? { id: todo.id, text: todo.text, completed: !todo.completed }
        : todo;
    });
  }
}
/*
  @class View
*/

class View {
  constructor() {
    // This is the root element
    this.app = this.getElement('#root');

    // This is the title
    this.title = this.createElement('h1');
    this.title.textContent = 'Todos';

    // Form with input and submit button
    this.form = this.createElement('form');

    // Input
    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add todo';
    this.input.name = 'todo';

    // Button
    this.submitBtn = this.createElement('button');
    this.submitBtn.type = 'submit';
    this.submitBtn.textContent = 'Submit';

    // Wrapper of the todos
    this.todoList = this.createElement('ul', 'todo-list');

    // Append the input and button to the form
    this.form.append(this.input, this.submitBtn);

    // Append the title, form and todo list to app
    this.app.append(this.title, this.form, this.todoList);
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  getElement(selector) {
    return document.querySelector(selector);
  }
}

/*
  @class Controller
*/

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());
