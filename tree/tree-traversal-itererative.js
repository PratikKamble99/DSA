// Traversal of tree without using recursion
// using Stack

import { StackUsingArr } from "../stack/stack-implementation.js";

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
    },
    right: {
        value: 3,
        left: null,
        right: null,
    },
};

function preOrderTraversal(root) {
    const stack = new StackUsingArr();
    const preOrder = [];
    stack.push(root);
    while (stack.getTop() !== -1) {
        const node = stack.getTop();
        stack.pop();
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);
        preOrder.push(node.value);
    }
    console.log(preOrder);
}

function inOrderTraversal(root) {
    const stack = new StackUsingArr();
    const inOrder = [];
    let node = root;
    while (true) {
        if (node !== null) {
            stack.push(node);
            node = node.left;
        } else {
            if (stack.getTop() == -1) break;

            node = stack.pop();
            inOrder.push(node.value);
            node = node.right;
        }
    }
    console.log(inOrder);
}

inOrderTraversal(root);
