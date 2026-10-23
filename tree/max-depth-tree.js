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
                right: {
                    value: 8,
                    left: null,
                    right: null,
                },
            },
        },
    },
    right: {
        value: 3,
        left: null,
        right: null,
    },
};

function maxDepth(node) {
    if (!node) return 0;

    const lh = maxDepth(node.left);
    const rh = maxDepth(node.right);

    return 1 + Math.max(lh, rh);
}

console.log(maxDepth(root));
