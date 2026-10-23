/* Root is type of 
    Node {
        val: number,
        left: Node | null,
        right: Node | null
    } 
*/
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
            left: null,
            right: null,
        },
    },
    right: {
        value: 3,
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
};

// left -> root -> right
let ans = [];
function inOrderTraversal(root) {
    if (root == null) return;
    // visit left node
    inOrderTraversal(root.left);
    // print root
    // console.log(root.value);
    ans.push(root.value);
    inOrderTraversal(root.right);
}

inOrderTraversal(root);
console.log("IN_ORDER", ans);
ans = [];

// Root -> left -> Right
function preOrderTraversal(root) {
    if (root == null) return;
    // print root
    // console.log(root.value);
    ans.push(root.value);
    // visit left node
    preOrderTraversal(root.left);
    // visit right node
    preOrderTraversal(root.right);
}

preOrderTraversal(root);
console.log("PRE_ORDER", ans);
ans = [];

// Left -> Right -> Root
function postOrderTraversal(root) {
    if (root == null) return;
    // print root
    // visit left node
    postOrderTraversal(root.left);
    // visit right node
    postOrderTraversal(root.right);
    // console.log(root.value);
    ans.push(root.value);
}

postOrderTraversal(root);
console.log("POST_ORDER", ans);
