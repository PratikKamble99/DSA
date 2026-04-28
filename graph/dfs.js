const adjacency_list = {
    1: [2, 3],
    2: [1, 5, 6],
    3: [1, 7, 4],
    4: [3, 8],
    5: [2],
    6: [2],
    7: [3, 8],
    8: [7, 4],
};

function dfs(start_node) {
    const visited = new Set();
    const answer = [];

    function traverse(node) {
        if (visited.has(node)) return;
        visited.add(node);
        answer.push(node);

        for (let i = 0; i < adjacency_list[node].length; i++) {
            if (!visited.has(adjacency_list[node][i])) {
                traverse(adjacency_list[node][i]);
            }
        }
    }

    traverse(start_node);
    console.log(answer);
}

dfs(1);
