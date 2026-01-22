const TODOS = [];
let instance = null;

class ToDoSingleTone {
    constructor() {
        if (instance !== null) throw new Error("You can only have instance ");
        instance = this;
    }

    addTodo(todo) {
        TODOS.push(todo);
    }

    getTodo() {
        return TODOS;
    }
}

const todosInstance = new ToDoSingleTone();
// todosInstance.addTodo("A");
// todosInstance.addTodo("B");
// console.log(todosInstance.getTodo());
// const s = new ToDoSingleTone(); // THIS THROW ERROR

// Object.freeze(todosInstance);

// AT THE END WE ARE CREATING THE OBJ SO INSTEAD OF CLASS WE CAN USE JS Obj
const TodoStore = {
    addTodo(todo) {
        TODOS.push(todo);
    },
    getTodo() {
        return TODOS;
    },
};

Object.freeze(TodoStore); // Object.freeze() restrict object extension like adding new key or modifying EG. TodoStore.something = {}

// export default todosInstance;
export default TodoStore;
