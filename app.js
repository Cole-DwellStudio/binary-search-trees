const Node = (newData) => {
  const data = newData;
  const left = null;
  const right = null;
  return {
    data,
    left,
    right,
  };
};

const Tree = (array) => {
  const root = buildTree(array);
  const sortArray = (array) => {
    uniqueArray = Array.from(new Set(array));
    return Array.sort(uniqueArray);
  };
  const sortedArrayToBST = (array, start, end) => {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = Node(array[mid]);

    node.left = sortedArrayToBST(array, start, mid - 1);
    node.right = sortedArrayToBST(array, mid + 1, end);
    return node;
  };
  const buildTree = (array) => {
    let sortedArray = sortArray(array);
    return sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
  };
  const insert = (value) => {};

  return { root };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}$0{isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

var n = testArray.length;
let root = sortedArrayToBST(testArray, 0, n - 1);

prettyPrint(root);
