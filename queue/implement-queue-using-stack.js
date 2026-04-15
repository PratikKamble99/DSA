// Ques 3 : Implement Queue using Stacks
// Implement a first in first out(FIFO) queue using only two stacks.
// The implemented queue should have all functions of queue(enqueue, front, dequeue, and empty).

import { StackUsingArr } from "../stack/stack-implementation.js";

class Queue {
    constructor() {
        this.s1 = new StackUsingArr();
        this.s2 = new StackUsingArr();
    }

    // Time Com - O(2n)
    push(x) {
        // If stack1 have vales then push them into stack2
        if (this.s1.getTop()) {
            while (this.s1.getTop() !== -1) {
                this.s2.push(this.s1.pop());
            }
        }
        // Push new value into stack1
        this.s1.push(x);

        // If stack2 have vales then push them into stack1
        if (this.s2.getTop() !== -1) {
            this.s1.push(this.s2.pop());
        }
    }

    // O(1)
    top() {
        return this.s1.getTop();
    }

    // O(1)
    pop() {
        return this.s1.pop();
    }
}

// Approach 2
class Queue2 {
    constructor() {
        this.s1 = new StackUsingArr();
        this.s2 = new StackUsingArr();
    }

    // Push element into stack1
    push(x) {
        this.s1.push(x);
    }

    top() {
        // check if stack2 have values then return top of stack2 because we have already pushed all values of stack1 into stack2
        if (this.s2.getTop() != -1) {
            return this.s2.getTop();
        }

        // If stack2 is empty then push all values of stack1 into stack2 and return top of stack2
        while (this.s1.getTop() !== -1) {
            this.s2.push(this.s1.pop());
        }

        return this.s2.getTop();
    }

    pop() {
        // check if stack2 have values then pop from stack2 because we have already pushed all values of stack1 into stack2
        if (this.s2.getTop() != -1) {
            return this.s2.pop();
        }

        // If stack2 is empty then push all values of stack1 into stack2 and pop from stack2
        while (this.s1.getTop() !== -1) {
            this.s2.push(this.s1.pop());
        }

        return this.s2.pop();
    }
}

const queue = new Queue2();
queue.push(10);
queue.push(20);
queue.pop();
queue.pop();
queue.push(30);
queue.push(40);
console.log(queue.top());

// var MyQueue = function() {
//   this.s1=[];
//   this.s2=[];
// };

// MyQueue.prototype.enqueue = function(x) {
//   this.s1.push(x)
// };

// MyQueue.prototype.dequeue = function() {
//   if(this.empty()) return 'Queue is empty';
//   while(this.s1.length != 0){
//     this.s2.push(this.s1.pop())
//   }
//   this.s2.pop();
//   while(this.s2.length!=0){
//     this.s1.push(this.s2.pop())
//   }
// };

// MyQueue.prototype.peek = function() {
//   return this.s1[0]
// };

// MyQueue.prototype.empty = function() {
//   this.s1.length==0
// };

//  // Your MyQueue object will be instantiated and called as such:
//  var myqueue = new MyQueue();

//  myqueue.enqueue(10)
//  myqueue.enqueue(30)
//  myqueue.enqueue(40)
//  var param_2 = myqueue.dequeue()
//  myqueue.enqueue(50)
//  var param_2 = myqueue.dequeue()
//  var param_3 = myqueue.peek()
//  var param_4 = myqueue.empty()

// console.log(myqueue.s1, '---', param_3)
