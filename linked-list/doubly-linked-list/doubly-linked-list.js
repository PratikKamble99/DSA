// Doubly linked list allows traversal from both ends
/* 
    [prev, d, next] <---> [prev, d, next] <---> [prev, d, next]

    Node {
        prev
        data
        next
    }
*/

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
        // new_node.prev = prev; // passed in constructor while creating node
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

function deleteHead(head) {
    if (!head.prev && !head.next) return null;
    // const prev = head;
    head = head.next;
    head.prev = null;
    // prev.next = null; // NO need to do this in JS because GC remove it automatically, but need to do in C++
    return head;
}

function deleteTail(head) {
    if (head == null || head.next == null) return null;

    let curr = head;

    // while (curr.next.next) {
    //     curr = curr.next;
    // }
    // curr.next = null;

    while (curr.next) {
        curr = curr.next;
    }
    let prev = curr.prev;
    prev.next = null;
    // curr.prev = null

    return head;
}

function deleteAtKthPos(head, k) {
    if (head == null || head.next == null) return null;
    if (k == 1) return deleteHead(head);
    let curr = head;
    let pos = 0;
    while (curr) {
        pos += 1;
        if (pos == k) {
            break;
        }
        curr = curr.next;
    }
    let prev = curr.prev;
    if (!curr.next && !prev) return deleteHead(head);
    // else if (!curr.next) return deleteTail(head);
    else if (!curr.next) prev.next = null;
    else {
        prev.next = curr.next;
        curr.next.prev = prev;
    }

    return head;
}

function deleteNode(node) {
    if (node.next == null) {
        node.prev.next = null;
        return;
    }

    let prev = node.prev;
    let front = node.next;

    prev.next = front;
    front.prev = prev;
}

function insertBeforeHead(head, data) {
    const newNode = new Node(data, head);
    head.prev = newNode;
    return newNode;
}

function insertBeforeTail(head, data) {
    if (head.next == null) return insertBeforeHead(data);

    let curr = head;
    while (curr.next.next) {
        curr = curr.next;
    }

    const newNode = new Node(data, curr.next, curr);
    curr.next = newNode;
    curr.next.prev = newNode;
    return head;
}

function insertBeforeKthEle(head, data, k) {
    if (head.next == null || k == 1) return insertBeforeHead(data);

    let curr = head;
    let cnt = 0;
    while (curr.next) {
        cnt += 1;
        if (cnt == k) break;
        curr = curr.next;
    }

    const newNode = new Node(data, curr, curr.prev);
    curr.prev.next = newNode;
    curr.prev = newNode;
    return head;
}

function insertBeforeNode(node, data) {
    const prev = node.prev;
    const newNode = new Node(data, node, prev);
    if (node.prev == null) {
        node.prev = newNode;

        return;
    }
    prev.next = newNode;
    node.prev = newNode;
}

let head = createDLLFromArray([1, 2, 3, 4, 5, 6]);
// let head = createDLLFromArray([1]);
// printDLL(head);
// printDLL(deleteHead(head));
// head = deleteHead(head);
// printDLL(deleteTail(head));
// printDLL(deleteAtKthPos(head, 1));
// deleteNode(head.next.next.next);
head = insertBeforeHead(head, 40);
head = insertBeforeHead(head, 50);
head = insertBeforeTail(head, 60);
head = insertBeforeTail(head, 100);
head = insertBeforeKthEle(head, 600, 2);
head = insertBeforeKthEle(head, 800, 4);
printDLL(head);
insertBeforeNode(head.next, 200); // don't pass node as head to insert before
console.log(head);
printDLL(head);
