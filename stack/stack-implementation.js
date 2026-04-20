// STACK have 5 operations
// LIFO ( last in first out )
// 1) pop() :- remove element
// 2) push():- insert element
// 3) peek():- to know which element is at last position
// 4) isEmpty():- whether stack is empty or not
// 5) size():- return size of stack

// IMPLEMENTATION
class Stack {
    constructor() {
        this.stack = [];
    }

    push(element) {
        return this.stack.push(element);
    }

    pop() {
        if (this.isEmpty()) return "stack is empty";
        return this.stack.pop();
    }

    peek() {
        if (this.isEmpty()) return "stack is empty";
        return this.stack[this.size() - 1];
    }

    size() {
        return this.stack.length;
    }

    isEmpty() {
        return this.size() == 0;
    }

    printStack() {
        return this.stack;
    }
}

// const stack = new Stack();

// console.log(stack.push(12));
// console.log(stack.size());
// console.log(stack.push(20));
// console.log(stack.peek());
// console.log(stack.printStack());

/* ========================================================================================== */
export class StackUsingArr {
    top = -1;
    #stack;
    constructor() {
        this.#stack = [];
    }

    push(val) {
        this.top++;
        this.#stack[this.top] = val;
    }

    pop() {
        if (this.top == -1) return -1 /* throw Error("Stack is empty") */;
        this.top -= 1;
        return this.#stack[this.top + 1];
    }

    getTop() {
        if (this.top == -1) return -1;
        return this.#stack[this.top];
    }
}

// const stack = new StackUsingArr();
// stack.push(10);
// stack.push(20);
// console.log(stack.getTop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.getTop());
