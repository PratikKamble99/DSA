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

function BFS(start_node) {
    const visited = new Set();
    const path = [];
    const queue = [start_node];

    while (queue.length) {
        const node = queue.shift();
        visited.add(node);
        path.push(node);
        for (let i = 0; i < adjacency_list[node].length; i++) {
            if (
                !visited.has(adjacency_list[node][i]) &&
                !queue.includes(adjacency_list[node][i])
            ) {
                queue.push(adjacency_list[node][i]);
            }
        }
    }
    console.log(path, "path");
}

BFS(3);
