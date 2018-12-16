// added list node, queue and stack implementations 
// to use later in BFS and DFS algorithms

const createListNode = (value) => {
    return {
        value,
        next: null,
        prev: null
    };
};

const createStack = () => {
    let lastNode = null;

    const peek = () => {
        return lastNode.value;
    };

    const isEmpty = () => {
        return lastNode === null;
    };

    const push = (value) => {
        const newNode = createListNode(value);

        if (lastNode === null) {
            lastNode = newNode;
            return;
        }

        newNode.prev = lastNode;
        lastNode = newNode;
    };

    const pop = () => {
        if (lastNode === null) {
            return null;
        }

        const last = lastNode;
        lastNode = lastNode.prev;
        return last.value;
    };

    const stack = {
        peek,
        push,
        pop,
        isEmpty,
    };

    return stack;
};

const createQueue = () => {
    let firstNode = null;
    let lastNode = null;

    const peek = () => {
        return firstNode.value;
    };

    const isEmpty = () => {
        return firstNode === null && lastNode === null;
    };

    const enqueue = (value) => {
        const newNode = createListNode(value);

        if (firstNode === null && lastNode === null) {
            firstNode = newNode;
            lastNode = newNode;
            return;
        }

        lastNode.next = newNode;
        lastNode = newNode;
    };

    const dequeue = () => {
        if (firstNode === null) {
            return null;
        }

        const first = firstNode;
        firstNode = firstNode.next;

        if (firstNode === null) {
            lastNode = null;
        }

        return first.value;
    };

    const queue = {
        peek,
        enqueue,
        dequeue,
        isEmpty,
    };

    return queue;
};

const createTreeNode = (value) => {
    return {
        value,
        children: []
    };
};

const buildTree = () => {
    const root = createTreeNode(1);

    root.children.push(createTreeNode(2));
    root.children.push(createTreeNode(3));
    root.children.push(createTreeNode(4));

    root.children[0].children.push(createTreeNode(5));
    root.children[0].children.push(createTreeNode(6));

    root.children[2].children.push(createTreeNode(7));

    return root;
};

const traverseTreeAndPrintNodes = (root) => {
    console.log(root.value);
    root.children.forEach(node => {
        console.log(node.value);
        node.children.forEach(child => console.log(child.value));
    });
};

const traverseTreeWithRecursiveDFS = (node) => {
    console.log(node.value);
    node.children.forEach(child => traverseTreeWithRecursiveDFS(child));
};

const traverseTreeWithIterativeDFS = (root) => {
    const stack = createStack();
    stack.push(root);

    while (!stack.isEmpty()) {
        const node = stack.pop();
        console.log(node.value);

        node.children.forEach(child => stack.push(child));
    }
};

const traverseTreeWithBFS = (root) => {
    const queue = createQueue();
    queue.enqueue(root);

    while (!queue.isEmpty()) {
        const node = queue.dequeue();
        console.log(node.value);

        node.children.forEach(child => queue.enqueue(child));
    }
};

const createBinaryTreeNode = (value) => {
    return {
        value,
        left: null,
        right: null,
    };
};

const buildBinaryTree = () => {
    const binaryTreeRoot = createBinaryTreeNode(1);

    binaryTreeRoot.left = createBinaryTreeNode(2);
    binaryTreeRoot.right = createBinaryTreeNode(3);

    binaryTreeRoot.left.left = createBinaryTreeNode(4);
    binaryTreeRoot.left.right = createBinaryTreeNode(5);
    binaryTreeRoot.right.left = createBinaryTreeNode(6);
    binaryTreeRoot.right.right = createBinaryTreeNode(7);

    return binaryTreeRoot;
};

const preOrderTraversal = (node) => {
    if (node === null) {
        return;
    }

    console.log(node.value);
    preOrderTraversal(node.left);
    preOrderTraversal(node.right);
};

const postOrderTraversal = (node) => {
    if (node === null) {
        return;
    }

    postOrderTraversal(node.left);
    postOrderTraversal(node.right);
    console.log(node.value);
};

const inOrderTraversal = (node) => {
    if (node === null) {
        return;
    }

    inOrderTraversal(node.left);
    console.log(node.value);
    inOrderTraversal(node.right);
};

const traverseWindowsFolder = () => {

    const fs = require('fs');
    const path = require('path');

    const traverseFileSystemRecursive = (directoryPath) => {
        fs.readdirSync(directoryPath).forEach(file => {
            console.log(file);

            try {
                const filePath = path.resolve(directoryPath, file);
                if (fs.statSync(filePath).isDirectory()) {
                    traverseFileSystemRecursive(filePath);
                }
            } catch {
                console.log('NOT PREMITTED!');
            }
        });
    };

    traverseFileSystemRecursive('C://WINDOWS');
};

const buildMatrix = () => {
    const matrix = [];
    const rows = 3;
    const cols = 3;

    for (let row = 0; row < rows; row++) {
        matrix.push([]);
        for (let col = 0; col < cols; col++) {
            matrix[row][col] = row * cols + col + 1;
        }
    }

    return matrix;
};

console.log(buildMatrix());

const printMatrixNodesWithRecursiveDFS = (matrix) => {

    const visited = [];                                 /// visited arr to push in
    matrix[0].forEach(() => visited.push([]));          /// push each element of the first arr in visited arr

    const printMatrixNodesWithDFS = (matrix, visited, row, col) => {

        if (row < 0 || row >= matrix.length ||              // if outside or already visited => return)
            col < 0 || col >= matrix[0].length ||
            visited[row][col]) {
            return;
        }

        console.log(matrix[row][col]);                      /// since we are not outside, print the next location
        visited[row][col] = true;                           /// mark it as visited

        printMatrixNodesWithDFS(matrix, visited, row + 1, col);     /// make the other moves
        printMatrixNodesWithDFS(matrix, visited, row, col + 1);
        printMatrixNodesWithDFS(matrix, visited, row - 1, col);
        printMatrixNodesWithDFS(matrix, visited, row, col - 1);
    };

    printMatrixNodesWithDFS(matrix, visited, 0, 0);
};
const ourMatrix = buildMatrix();
console.log(printMatrixNodesWithRecursiveDFS(ourMatrix));

const printMatrixNodesWithIterativeDFS = (matrix) => {

    const createCoordinates = (row, col) => {
        return {
            row,
            col,
        };
    };

    const matrixRows = matrix.length;
    const matrixCols = matrix[0].length;

    const visited = [];
    matrix.forEach(() => visited.push([]));

    const rootCoordinates = createCoordinates(0, 0);
    const stack = createStack();
    stack.push(rootCoordinates);

    while (!stack.isEmpty()) {
        const nodeCoordinates = stack.pop();

        if (nodeCoordinates.row < 0 || nodeCoordinates.row >= matrixRows ||
            nodeCoordinates.col < 0 || nodeCoordinates.col >= matrixCols ||
            visited[nodeCoordinates.row][nodeCoordinates.col]) {
            continue;
        }

        console.log(matrix[nodeCoordinates.row][nodeCoordinates.col]);
        visited[nodeCoordinates.row][nodeCoordinates.col] = true;

        const topNodeCoordinates = createCoordinates(nodeCoordinates.row - 1, nodeCoordinates.col);
        stack.push(topNodeCoordinates);

        const rightNodeCoordinates = createCoordinates(nodeCoordinates.row, nodeCoordinates.col + 1);
        stack.push(rightNodeCoordinates);

        const bottomNodeCoordinates = createCoordinates(nodeCoordinates.row + 1, nodeCoordinates.col);
        stack.push(bottomNodeCoordinates);

        const leftNodeCoordinates = createCoordinates(nodeCoordinates.row, nodeCoordinates.col - 1);
        stack.push(leftNodeCoordinates);
    }
};

const printMatrixNodesWithBFS = (matrix) => {

    const createCoordinates = (row, col) => {
        return {
            row,
            col,
        };
    };

    const matrixRows = matrix.length;
    const matrixCols = matrix[0].length;

    const visited = [];
    matrix.forEach(() => visited.push([]));

    const rootCoordinates = createCoordinates(0, 0);
    const queue = createQueue();
    queue.enqueue(rootCoordinates);

    while (!queue.isEmpty()) {
        const nodeCoordinates = queue.dequeue();

        if (nodeCoordinates.row < 0 || nodeCoordinates.row >= matrixRows ||
            nodeCoordinates.col < 0 || nodeCoordinates.col >= matrixCols ||
            visited[nodeCoordinates.row][nodeCoordinates.col]) {
            continue;
        }

        console.log(matrix[nodeCoordinates.row][nodeCoordinates.col]);
        visited[nodeCoordinates.row][nodeCoordinates.col] = true;

        const topNodeCoordinates = createCoordinates(nodeCoordinates.row - 1, nodeCoordinates.col);
        queue.enqueue(topNodeCoordinates);

        const rightNodeCoordinates = createCoordinates(nodeCoordinates.row, nodeCoordinates.col + 1);
        queue.enqueue(rightNodeCoordinates);

        const bottomNodeCoordinates = createCoordinates(nodeCoordinates.row + 1, nodeCoordinates.col);
        queue.enqueue(bottomNodeCoordinates);

        const leftNodeCoordinates = createCoordinates(nodeCoordinates.row, nodeCoordinates.col - 1);
        queue.enqueue(leftNodeCoordinates);
    }
};
