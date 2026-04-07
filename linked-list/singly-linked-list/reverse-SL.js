const { convertArrayToLinkedList, traverse } = require("./singly-linked-list");

function reverseSL(head) {
    let prev = null;
    let temp = head;
    let front = null;

    while (temp) {
        front = temp.next;
        temp.next = prev;
        prev = temp;
        temp = front;
    }

    return prev;
}

let head = convertArrayToLinkedList([12, 3, 4, 6, 8]);
traverse(head);
head = reverseSL(head);
traverse(head);
