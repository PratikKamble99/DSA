/* Build a MinStack class that works like a normal stack, but can also return the smallest value in the stack, instantly. */

class MinStack {
    constructor() {
        this.min_stack = [];
        this.stack = [];
    }

    push(val) {
        const min =
            this.min_stack.length == 0
                ? val
                : Math.min(this.min_stack[this.min_stack.length - 1], val);

        this.min_stack.push(min);
        this.stack.push(val);
    }

    pop() {
        this.stack.pop();
        this.min_stack.pop();
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        const min = this.min_stack[this.min_stack.length - 1];
        return min;
    }
}

const s = new MinStack();
s.push(-2);
s.push(0);
s.push(-3);
console.log(s.getMin()); // -3
s.pop();
console.log(s.top()); // 0
console.log(s.getMin()); // -2

const d = new MinStack();
d.push(1);
d.push(1);
d.pop();
console.log(d.getMin()); // 1  ← duplicates!

const e = new MinStack();
e.push(5);
e.push(3);
e.push(7);
e.push(3);
e.pop();
console.log(e.getMin()); // 3
e.pop();
e.pop();
console.log(e.getMin()); // 5
