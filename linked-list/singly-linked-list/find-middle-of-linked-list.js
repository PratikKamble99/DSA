function middleOfLL1(head) {
    let curr = head;
    let cnt = 0;

    while (curr) {
        cnt += 1;
        curr = curr.next;
    }
    let mid = Math.floor(cnt / 2) + 1;
    curr = head;

    while (curr) {
        mid -= 1;

        if (mid == 0) {
            return curr.data;
        }
        curr = curr.next;
    }
}

function middleOfLL2(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow.data;
}

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
const head = convertArrayToLinkedList([12, 3, 4, 6, 8]);
console.log(middleOfLL2(head));
