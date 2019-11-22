/*
  @class Model
*/

class Model {
  constructor() {
    this.todos = [
      // { id: 0, text: 'My fancy Todo', completed: false },
      // { id: 0, text: 'My fancy Todo', completed: false },
      // { id: 0, text: 'My fancy Todo', completed: false },
      // { id: 0, text: 'My fancy Todo', completed: false }
    ];
  }

  // Adding a simple todo giving a unique id with date and text
  createTodo(text) {
    const todo = {
      id: Date()
        .toString()
        .replace(/ /g, '')
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

  _getInputText() {
    return this.input.value;
  }

  _resetInputText() {
    this.input.value = '';
  }

  // Display todos -> executed when update delete create or toggled todos
  displayTodos(todos) {
    // Deleting all todos in the list element
    while (this.todoList.firtsChild) {
      this.todoList.removeChild(this.todoList.firtsChild);
    }

    // Show a message is there is no todos
    if (!todos.length) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to do! Add a task?';
      this.todoList.append(p);
    } else {
      /* loop through todos array and create a li element with the data from 
          the todo and append it to the listTodo
      */

      todos.forEach(todo => {
        const li = this.createElement('li');
        li.id = todo.id;

        // Checkbox
        const checkbox = this.createElement('input');
        checkbox.type = 'check';
        checkbox.checked = todo.completed;

        // Text
        const span = this.createElement('span');
        span.contentEditable = true;
        span.classList.add('editable');

        if (todo.completed) {
          const strike = this.createElement('s');
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        // Button
        const deleteBtn = this.createElement('button');
        deleteBtn.textContent = 'Delete';

        // Appending to the li element
        li.append(checkbox, span, deleteBtn);

        // Appeding to the ul element
        this.todoList.append(li);
      });
    }
  }
}

/*
  @class Controller
*/

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListChanged();
  }

  onTodoListChanged() {
    this.view.displayTodos(this.model.todos);
  }
}

const app = new Controller(new Model(), new View());
