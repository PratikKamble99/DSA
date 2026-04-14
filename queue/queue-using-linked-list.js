class NewNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.start = null;
        this.end = null;
    }

    push(val) {
        console.log("pushing into queue", val);
        const newNode = new NewNode(val);
        if (this.start == null || this.end == null) {
            this.start = newNode;
            this.end = newNode;
            return;
        }

        this.end.next = newNode;
    }

    top() {
        if (!this.start) return -1;
        return this.start.value;
    }

    pop() {
        if (!this.start) return -1;
        const temp = this.start;
        this.start = this.start.next;
        temp.next = null;
        return temp.value;
    }
}

const queue = new Queue();
queue.push(10);
queue.push(20);
console.log(queue.top(), "TOP");
console.log(queue.pop(), "POP");
console.log(queue.pop(), "POP");
console.log(queue.top(), "TOP");
queue.push(30);
console.log(queue.top(), "TOP");
console.log(queue.pop(), "POP");
console.log(queue.top(), "TOP");
