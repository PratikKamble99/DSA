function removeNthFromEnd(head, n) {
    let size = 0;
    let current = head;
    while (current) {
        size += 1;
        current = current.next;
    }

    if (n > size) return null;
    if (size == n) return (head = head.next);

    current = head;
    let pos = size - n;

    for (let i = 1; i < pos; i++) {
        current = current.next;
    }
    current.next = current.next.next;
    return head;
}
