import Node from "./Node.js";

export default function(array) {

    function buildTree (array) {
        if (array.length === 0) return null;

        array = [...new Set(array)];
        array.sort((a, b) => +a - +b);
    
        const mid = Math.floor(array.length / 2);
        const root = Node(array[mid]);

        root.left = buildTree(array.slice(0, mid));
        root.right = buildTree(array.slice(mid + 1));

        return root;
    }

    function insert (value) {
        let currentNode = root;

        if (!root) root = Node(value)

        while (currentNode) {
            if (value > currentNode.data) {
                if (currentNode.right === null) {
                    currentNode.right = Node(value)
                    return;
                }
                
                currentNode = currentNode.right;
            } else {
                if (currentNode.left === null) {
                    currentNode.left = Node(value)
                    return;
                }

                currentNode = currentNode.left;
            }
        }
    }

    function deleteItem (value) {
        let currentNode = root;
        let previousNode = null;

        while (currentNode && currentNode.data !== value) {
            previousNode = currentNode;

            if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }

        if (!currentNode) return;

        //no children
        if (!currentNode.left || !currentNode.right) {
            let child; 

            if (currentNode.left === null) {
                child = currentNode.right
            } else {
                child = currentNode.left;
            }

            //check root
            if (previousNode === null) {
                root = child;
                return;
            }

            if (previousNode.left === currentNode) {
                previousNode.left = child;
            } else {
                previousNode.right = child;
            }

            return;
        }
        
        let currentSubNode = currentNode.right;
        let previousSubNode = null;

        while (currentSubNode.left !== null) {
            previousSubNode = currentSubNode;
            currentSubNode = currentSubNode.left
        }

        currentNode.data = currentSubNode.data;

        if (previousSubNode.left === currentSubNode) {
            previousSubNode.left = currentSubNode.right;
        } else {
            previousSubNode.right = currentSubNode.right;
        }
    }

    function find (value) {
        let currentNode = root;

        while (currentNode) {
            if (currentNode.data === value) {
                return currentNode;
            }

            if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }

        return null;
    }

    function levelOrder (callback) {
        if (!callback) throw new Error("Callback not provided!");

        let queue = [root];

        while (queue.length !== 0) {
            let currentNode = queue[0];
            callback(currentNode);
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
            queue.shift();
        }
    }

    function inOrder(callback, node = root) {
        if (!callback) throw new Error("Callback not provided!");
        if (!node) return;

        inOrder(callback, node.left);
        callback(node);
        inOrder(callback, node.right);
    }

    function preOrder(callback, node = root) {
        if (!callback) throw new Error("Callback not provided!");
        if (!node) return;

        callback(node);
        preOrder(callback, node.left);
        preOrder(callback, node.right);
    }

    function postOrder(callback, node = root) {
        if (!callback) throw new Error("Callback not provided!");
        if (!node) return;

        postOrder(callback, node.left);
        postOrder(callback, node.right);
        callback(node);
    }

    function height (node) {
        if (!node || (!node.right && !node.left)) return 0;

        return Math.max(height(node.right), height(node.left)) + 1;
    }

    function depth (node) {
        let currentNode = root;
        let depth = 0;

        while (currentNode) {
            if (currentNode === node) {
                return depth;
            }

            if (value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }

            depth++;
        }

        return null;
    }

    function isBalanced (node = root) {
        if (!node) return true

        return Math.abs(height(root.right) - height(root.left)) <= 1 && isBalanced(node.left) && isBalanced(node.right);
    }

    function rebalance () {
        let array = []

        inOrder((node) => {
            array.push(node.data);
        })

        root = buildTree(array);
    }

    function prettyPrint (node=root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    let root = buildTree(array);

    return {
        buildTree,
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        rebalance,
        prettyPrint
    }
}