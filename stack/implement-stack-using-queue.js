// Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

// Implement the MyStack class:

// void push(int x) Pushes element x to the top of the stack.
// int pop() Removes the element on the top of the stack and returns it.
// int top() Returns the element on the top of the stack.
// boolean empty() Returns true if the stack is empty, false otherwise.
// Notes:

// You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.

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

// var MyStack = function() {
//   this.q1 = [];
//   this.q2 = [];
// };

// MyStack.prototype.push = function(x) {
//   while (this.q1.length !== 0) {
//     this.q2.push(this.q1.shift()) // remove first element from q1 and push it in q2
//   }
//   this.q1.push(x);
//   while (this.q2.length !== 0) {
//     this.q1.push(this.q2.shift())
//   }
// };

// MyStack.prototype.pop = function() {
//   if(this.size()==0) return 'empty stack';
//   return this.q1.shift()
// };

// MyStack.prototype.top = function() {
//   if(this.size()==0) return 'empty stack';
//   return this.q1[0]
// };

// MyStack.prototype.empty = function() {
//   return this.size() == 0
// };

// MyStack.prototype.size = function() {
//   return this.q1.length
// };

// // Your MyStack object will be instantiated and called as such:
//  var obj = new MyStack()
//  obj.push(11)
//  obj.push(13)
//  obj.push(14)
//  var param_2 = obj.pop()
//  var param_3 = obj.top()
//  // var param_4 = obj.empty()

// console.log(obj.q1, param_3)
