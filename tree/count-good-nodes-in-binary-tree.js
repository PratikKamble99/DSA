/* 
Given a binary tree root, a node X in the tree is named good 
if in the path from root to current node all prev nodes are less than current node.
Return the number of good nodes in the binary tree.

It uses 
1. Preorder traversal
2. DFS searching
*/

var goodNodes = function (root, maxNode = -Infinity, count = 0) {
    if (root == null) return count;
    if (maxNode <= root.val) count = 1;

    maxNode = Math.max(maxNode, root.val);
    count += goodNodes(root.left, maxNode);
    count += goodNodes(root.right, maxNode);

    return count;
};
