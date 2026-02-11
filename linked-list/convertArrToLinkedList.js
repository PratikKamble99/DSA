function convertArrayToLinkedList(arr) {
    // First node
    const node = {
        data: arr[0],
        next: null,
    };

    let head = node; // Never change or update head
    let mover = head;

    for (let i = 1; i < arr.length; i++) {
        const new_node = {
            data: arr[i],
            next: null,
        };
        mover.next = new_node;
        mover = new_node;
    }
    return head;
}

// traverse in linked list
function traverse(head) {
    let current = head;
    while (current) {
        console.log(current.data);
        current = current.next;
    }
}

function lengthOfLL(head) {
    let count = 0;
    let current = head;
    while (current) {
        current = current.next;
        count++;
    }
    console.log("Length of LL: ", count);
}

function checkIfPresent(head, val) {
    let current = head;
    while (current) {
        if (current.data == val) return true;
        current = current.next;
    }
    return false;
}

const startOfLL = convertArrayToLinkedList([12, 3, 4, 6, 8]);
traverse(startOfLL);
lengthOfLL(startOfLL);
console.log(checkIfPresent(startOfLL, 16));
