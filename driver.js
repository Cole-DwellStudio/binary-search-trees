import { Tree } from "./BST.js";

function randomArray(length) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    let newElement = Math.floor(Math.random() * 100);
    randomArray.push(newElement);
  }
  return randomArray;
}

const myBST = new Tree(randomArray(100));

console.log(myBST.isBalanced());

console.log(myBST.levelOrder());
console.log(myBST.preorder());
console.log(myBST.postorder());
console.log(myBST.inorder());

myBST.insert(110);
myBST.insert(115);
myBST.insert(136);

console.log(myBST.isBalanced());
myBST.rebalance();
console.log(myBST.isBalanced());

console.log(myBST.levelOrder());
console.log(myBST.preorder());
console.log(myBST.postorder());
console.log(myBST.inorder());
