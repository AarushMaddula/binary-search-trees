import Tree from "./Tree.js";

function traverseTree(callback) {
    let arr = [];

    callback(node => arr.push(node.data));

    console.log(arr);
}

function printAllElements() {
    console.log("Level Order")
    traverseTree(test.levelOrder)
    
    console.log("In Order")
    traverseTree(test.inOrder)
    
    console.log("Pre Order")
    traverseTree(test.preOrder)
    
    console.log("Post Order")
    traverseTree(test.postOrder)
}

const randomArray = [];
    
for (let i = 0; i < 50; i++) {
    randomArray.push(Math.floor(Math.random() * 100));
}

const test = Tree(randomArray);

test.prettyPrint();

printAllElements() 

const randomArrayInserts = [];
for (let i = 0; i < 50; i++) {
    randomArrayInserts.push(Math.floor(Math.random() * 100) + 100);
}
randomArrayInserts.forEach((num) => {
    test.insert(num);
})

test.prettyPrint();

console.log(test.isBalanced())

test.rebalance()

test.prettyPrint();

console.log(test.isBalanced())

printAllElements() 

console.log(test.find(54));
test.deleteItem(54);
test.deleteItem(48);
test.deleteItem(46);
test.deleteItem(32);

test.prettyPrint();
