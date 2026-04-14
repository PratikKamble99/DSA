// STACK have 5 operations
// FIFI( first in first out )
// 1) enqueue() :- insert element
// 2) dequeue():- remove element
// 3) front():- to know which element is at first position
// 4) isEmpty():- whether queue is empty or not
// 5) size():- return size of queue

// IMPLEMENTATION

class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(ele) {
        this.queue.push(ele);
    }

    dequeue() {
        if (this.isEmpty()) return "Empty queue";
        return this.queue.shift();
    }

    front() {
        if (this.isEmpty()) return "Empty queue";
        return this.queue[0];
    }

    rear() {
        if (this.isEmpty()) return "Empty queue";
        return this.queue[this.size() - 1];
    }

    isEmpty() {
        return this.size() == 0;
    }

    size() {
        return this.queue.length;
    }

    printQueue() {
        return this.queue;
    }
}

// const myQueue = new Queue();

// myQueue.enqueue(12);
// myQueue.enqueue(32);
// myQueue.enqueue(99);

// myQueue.dequeue();

// console.log(myQueue.front());
// console.log(myQueue.rear());

// console.log(myQueue.printQueue());

// Implement Queue using Array
export class Queue2 {
    start = -1;
    end = -1;
    size = 0;

    constructor() {
        this.queue = [];
    }

    push(val) {
        this.end++;
        this.size += 1;
        if (this.start == -1) {
            this.start++;
            this.queue[this.end] = val;
            return;
        }

        this.queue[this.end] = val;
    }

    pop() {
        this.size--;
        return this.queue[this.start++];
    }

    top() {
        return this.queue[this.start] ?? -1;
    }
}

// const queue1 = new Queue2();
// queue1.push(20);
// queue1.push(30);
// queue1.push(40);
// console.log(queue1.top(), "TOP");
// console.log(queue1.pop(), "POP");
// console.log(queue1.pop(), "POP");
// console.log(queue1.top(), "TOP");
