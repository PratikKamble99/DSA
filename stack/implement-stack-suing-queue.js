import { Queue2 } from "../queue/queue-implementation.js";

class Stack {
    queue;
    constructor() {
        this.queue = new Queue2();
        console.log(this.queue);
    }

    push(val) {
        console.log("Pushing ..", val);
        this.queue.push(val);
        for (let i = 1; i < this.queue.size; i++) {
            this.queue.push(this.queue.top());
            this.queue.pop();
        }
    }

    top() {
        return this.queue.top();
    }

    pop() {
        return this.queue.pop();
    }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.top(), "TOP");
console.log(stack.pop(), "POP");
console.log(stack.top(), "TOP");
