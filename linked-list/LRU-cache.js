// Least recent user cache

// Cache have limited capacity
// if capacity full then remove least accessed key/node

// For this use doubly linkedlist and hash map

class LRU {
    constructor(capacity) {
        this.capacity = capacity;
        this.used = 0;
        this.map = new Map();
        this.head = null;
        this.tail = null;
    }

    #removeNode(node) {
        if (!node) return;

        // If curr node has prev node
        if (node.prev) {
            node.prev.next = node.next;
        }

        // if curr node has next node
        if (node.next) {
            node.next.prev = node.prev;
        }

        // if curr node is head
        if (node === this.head) {
            this.head = node.next;
        }

        // if curr node is tail
        if (node === this.tail) {
            this.tail = node.prev;
        }
    }

    get(key) {
        if (!this.map.has(key)) return;

        const node = this.map.get(key);

        // remove node
        this.#removeNode(node);
        // add same node
        this.put(key, node.value);

        return node.value;
    }

    put(key, value) {
        // check if capacity reached
        if (this.used === this.capacity) {
            // check if node not present
            if (!this.map.has(key)) {
                this.#removeNode(this.tail);
                this.used -= 1;
            }
        }

        // 1. if node is already present then remove it
        if (this.map.has(key)) {
            this.#removeNode(this.map.get(key));
            this.used -= 1;
        }

        this.map.set(key, newNode);
        if (this.head !== null) this.head.prev = newNode;
        this.head = newNode;

        if (this.tail === null) {
            this.tail = newNode;
        }
        this.used += 1;
    }

    print() {
        let current = this.head;
        let str = "";
        while (current) {
            str += `--> [ ${current.key} : ${current.value} ]`;
            current = current.next;
        }
        console.log(str);
    }
}

const cache = new LRU(3);

cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30);
cache.put(2, 200);
cache.put(1, 100);
cache.put(3, 300);
cache.put(3, 3000);
cache.get(2);
cache.get(3);
cache.get(1);
cache.put(4, 40);

cache.print();
