/* 
    Constructor Pattern is used to create and initialize objects using a constructor function or class, 
    ensuring consistent object structure and shared behavior through prototypes.
*/

/* 
    REACT EXAMPLE:- https://stackblitz.com/edit/cwa-dp-constructor-6zkob1hs?file=src%2FApp.js
    In react custom hook also work in same way
*/

class Todos {
    todos = [];
    constructor() {}
    getTodos() {
        return this.todos;
    }
    addTodo(todoText) {
        this.todos.push(todoText);
    }
}
