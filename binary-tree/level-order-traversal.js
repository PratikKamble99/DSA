import { Queue2 } from "../queue/queue-implementation.js";

/* Root is type of 
    Node {
        val: number,
        left: Node | null,
        right: Node | null
    } 
*/
let root = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
            left: null,
            right: null,
        },
        right: {
            value: 5,
            left: null,
            right: null,
        },
    },
    right: {
        value: 3,
        left: {
            value: 6,
            left: null,
            right: null,
        },
        right: {
            value: 7,
            left: null,
            right: null,
        },
    },
};

/* 
    step 1 push root into queue
    while -> queue not empty
        run for loop of size of queue  
            node = queue.dequeue()
            print(node.value)
            if left present push into queue
            if right present push into queue
        
        repeat 
*/

function levelOrderTraversal(root) {
    const ans = [];
    const queue = new Queue2();
    queue.push(root);

    while (queue.size > 0) {
        const size = queue.size;
        const level = [];

        for (let i = 1; i <= size; i++) {
            const node = queue.pop();
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
            level.push(node.value);
        }
        ans.push(level);
    }
    console.log(ans);
}

levelOrderTraversal(root);
