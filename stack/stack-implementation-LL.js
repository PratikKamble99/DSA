class NewNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    top = null;

    push(value) {
        const newNode = new NewNode(value);
        newNode.next = this.top;
        this.top = newNode;
    }

    pop() {
        const temp = this.top;
        this.top = this.top.next;
        temp.next = null;
        return temp;
    }

    getTop() {
        if (!this.top) return "stack is empty";
        return this.top.value;
    }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.getTop(), "TOP");
console.log(stack.pop(), "POP");
console.log(stack.getTop(), "TOP");
console.log(stack.pop(), "POP");
console.log(stack.getTop(), "TOP");
// console.log(stack.top);
