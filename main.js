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
