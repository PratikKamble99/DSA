class Node {
    constructor(data, next = null, prev = null) {
        this.prev = prev;
        this.data = data;
        this.next = next;
    }
}

function createDLLFromArray(arr) {
    const head = new Node(arr[0]);
    let prev = head;

    for (let i = 1; i < arr.length; i++) {
        const new_node = new Node(arr[i], null, prev);
        prev.next = new_node;
        prev = new_node;
    }
    return head;
}

function printDLL(head) {
    let current = head;
    // console.log(head);
    let str = "";
    while (current) {
        str = str + " ";
        str += current.data;
        current = current.next;
    }

    console.log(str);
}

// Approach 1 (Extreme) - using stack only update data
function reverseLinkedList1(head) {
    let curr = head;
    const stack = [];

    while (curr) {
        stack.push(curr.data);
        curr = curr.next;
    }

    curr = head;
    while (curr) {
        curr.data = stack.pop();
        curr = curr.next;
    }

    return head;
}

// Approach 2 - Using swapping node's back and next pointer
function reverseLinkedList2(head) {
    let curr = head;

    let last = null;
    while (curr) {
        last = curr.prev;
        curr.prev = curr.next;
        curr.next = last;

        curr = curr.prev;
    }

    head = last.prev;
    return head;
}

let head = createDLLFromArray([1, 2, 3, 4, 5, 6]);
printDLL(head);
// head = reverseLinkedList1(head);
head = reverseLinkedList2(head);
printDLL(head);
