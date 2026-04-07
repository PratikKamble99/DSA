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
    let str = "";
    while (current) {
        str += current.data += " ";
        current = current.next;
    }
    console.log(str);
}

function lengthOfLL(head) {
    let count = 0;
    let current = head;
    while (current) {
        current = current.next;
        count++;
    }
    // console.log("Length of LL: ", count);
    return count;
}

function checkIfPresent(head, val) {
    let current = head;
    while (current) {
        if (current.data == val) return true;
        current = current.next;
    }
    return false;
}

function deleteHead(head) {
    // c++ Node* temp = head; // This is still in Memory so to free in C++ use free(temp)
    // let temp = head;
    head = head.next;
    return JSON.stringify(head);
}

function deleteTail(head) {
    if (head == null || head.next == null) return null;

    let current = head;
    while (current.next.next) {
        current = current.next;
    }
    current.next = null;
    return JSON.stringify(head);
}

function deleteAtKPos(head, k) {
    if (k > lengthOfLL(head)) return head;
    if (head == null) return null;
    if (k == 1) return deleteHead(head);
    if (k == lengthOfLL(head)) return deleteTail(head);

    let current = head;
    let pos = 0;

    while (current) {
        pos += 1;
        if (pos == k - 1) {
            current.next = current.next.next;
            break;
        }
        current = current.next;
    }

    // let prevNode;
    // while (current) {
    //      pos += 1;
    //      if(pos == k){
    //          prevNode.next = prevNode.next.next
    //          break
    //      }
    //     prevNode = current;
    //     current = current.next;
    // }

    return JSON.stringify(head);
}

function deleteByValue(head, data) {
    if (!checkIfPresent(head, data)) return head;
    if (head == null) return null;
    if (head.data == data) return deleteHead(head); // Check if data is at Head

    let current = head;
    let prev;

    while (current) {
        if (current.data == data) {
            prev.next = prev.next.next;
            break;
        }
        prev = current;
        current = current.next;
    }
    return JSON.stringify(head);
}

function insertAtStart(head, data) {
    let new_node = {
        data: data,
        next: head,
    };

    // head = new_node;
    // return JSON.stringify(head);
    return JSON.stringify(new_node);
    // return {
    //     data: data,
    //     next: head,
    // };
}

function insertAtLast(head, data) {
    let new_node = {
        data: data,
        next: null,
    };

    if ((head = null)) return new_node;

    let current = head;
    while (current.next) {
        current = current.next;
    }
    current.next = new_node;
    return JSON.stringify(head);
}

function insertAtPosK(head, data, k) {
    if (head == null) {
        if (k == 1) {
            return {
                data: data,
                next: head,
            };
        } else return "No linked List Found";
    }

    if (k == 1) {
        return {
            data: data,
            next: head,
        };
    }

    let new_node = {
        data: data,
        next: null,
    };

    let curr = head;
    // let prev;
    let pos = 0;

    while (curr) {
        pos += 1;
        // if (pos == k) {
        //     prev.next = new_node;
        //     new_node.next = curr;
        //     break;
        // }
        if (pos == k - 1) {
            new_node.next = curr.next;
            curr.next = new_node;
            break;
        }
        // prev = curr;
        curr = curr.next;
    }
    return JSON.stringify(head);
}

function insertBeforeEle(head, data, ele) {
    if (head == null) {
        return "No linked List Found";
    }

    let new_node = {
        data: data,
        next: null,
    };

    if (head.data == ele) {
        new_node.next = head;
        head = new_node;
        return head;
    }

    let curr = head;
    let prev;

    while (curr) {
        if (curr.data == ele) {
            new_node.next = curr;
            prev.next = new_node;
            break;
        }
        prev = curr;
        curr = curr.next;
    }
    return JSON.stringify(head);
}

const startOfLL = convertArrayToLinkedList([12, 3, 4, 6, 8]);
// console.log(JSON.stringify(startOfLL));
// traverse(startOfLL);
// lengthOfLL(startOfLL);
// console.log(checkIfPresent(startOfLL, 16));
// console.log(deleteHead(startOfLL));
// console.log(deleteTail(startOfLL));
// console.log(deleteAtKPos(startOfLL, 4));
// console.log(deleteByValue(startOfLL, 3));
// console.log(insertAtStart(startOfLL, 1010));
// console.log(insertAtPosK(startOfLL, 90, 2));
// console.log(insertBeforeEle(startOfLL, 90, 4));

module.exports = {
    convertArrayToLinkedList,
    traverse,
};
