// Diameter of binary tree = longest path between to node ( they can be any nodes )
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

function diameter(root) {
    let max = 0;
    function height(node, max) {
        if (!node) return 0;
        // calculate left tree height
        const lh = height(node.left, max);
        // calculate right tree height
        const rh = height(node.right, max);

        // max will be addition of both height
        max = Math.max(max, lh + rh);

        return 1 + Math.max(lh, rh);
    }

    max = height(root, max);
    return max;
}

console.log(diameter(root));
