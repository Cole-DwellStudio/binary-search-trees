export { Node, Tree };

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  sortArray(array) {
    const uniqueArray = [...new Set(array)];
    return uniqueArray.sort((a, b) => a - b);
  }

  buildTree(array) {
    let sortedArray = this.sortArray(array);
    return this.buildTreeFromSortedArray(sortedArray);
  }

  buildTreeFromSortedArray(array) {
    if (array.length === 0) return null;
    let mid = Math.floor(array.length / 2);
    let node = new Node(
      array[mid],
      this.buildTreeFromSortedArray(array.slice(0, mid)),
      this.buildTreeFromSortedArray(array.slice(mid + 1))
    );
    return node;
  }

  insert(value) {
    this.#insertNode(value, this.root);
  }

  #insertNode(value, node) {
    if (node == null) {
      let newNode = new Node(value);
      return newNode;
    }
    if (value < node.data) {
      node.left = this.#insertNode(value, node.left);
    } else {
      node.right = this.#insertNode(value, node.right);
    }
    return node;
  }

  remove(value, node = this.root) {
    if (node == null) return node;
    if (node.data < value) {
      node.right = this.remove(value, node.right);
    } else if (node.data > value) {
      node.left = this.remove(value, node.left);
    } else {
      if (node.left == null) return node.right;
      else if (node.right === null) return node.left;
      node.data = this.#minValue(node.right);
      node.right = this.remove(value, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (node == null) return node;
    else if (node.data == value) return node;
    let foundNodeL = this.find(value, node.left);
    let foundNodeR = this.find(value, node.right);
    return foundNodeL != null ? foundNodeL : foundNodeR;
  }

  levelOrder(func, node = this.root) {
    let queue = [];
    let valueArray = [];
    queue.push(node);
    while (queue.length > 0) {
      if (func) {
        func(queue[0]);
      } else {
        valueArray.push(queue[0].data);
      }
      if (queue[0].left != null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right != null) {
        queue.push(queue[0].right);
      }
      queue.splice(0, 1);
    }
    if (!func) return valueArray;
  }

  inorder(func, node = this.root, valueArray = []) {
    if (node == null) return;

    this.inorder(func, node.left, valueArray);
    func ? func(node) : valueArray.push(node.data);
    this.inorder(func, node.right, valueArray);

    if (valueArray) return valueArray;
  }

  postorder(func, node = this.root, valueArray = []) {
    if (node == null) return;
    this.postorder(func, node.left, valueArray);
    this.postorder(func, node.right, valueArray);
    func ? func(node) : valueArray.push(node.data);
    if (func) {
      func(node);
    }
    if (valueArray) return valueArray;
  }

  preorder(func, node = this.root, valueArray = []) {
    if (node == null) return;
    func ? func(node) : valueArray.push(node.data);
    this.preorder(func, node.left, valueArray);
    this.preorder(func, node.right, valueArray);

    if (valueArray) return valueArray;
  }

  height(node = this.root) {
    if (node == null) return 0;
    else {
      let lDepth = this.height(node.left);
      let rDepth = this.height(node.right);

      if (lDepth > rDepth) return lDepth + 1;
      else return rDepth + 1;
    }
  }

  depth(node = this.root) {
    if (node == null) return null;
    let depth = 1;
    let key = node.data;
    node = this.root;
    while (node != null) {
      if (node.data == key) return depth;
      if (node.data > key) {
        node = node.left;
        depth++;
      } else {
        node = node.right;
        depth++;
      }
    }
    return depth;
  }

  isBalanced(root = this.root) {
    if (root == null) return true;

    const lHeight = this.height(root.left);
    const rHeight = this.height(root.right);

    if (
      Math.abs(lHeight - rHeight) <= 1 &&
      this.isBalanced(root.right) == true &&
      this.isBalanced(root.left) == true
    ) {
      return true;
    }
    return false;
  }

  rebalance(node = this.root) {
    if (node == null) return;
    const orderedTree = this.inorder();
    this.root = this.buildTreeFromSortedArray(orderedTree);
    return this.root;
  }

  #minValue(node) {
    let minv = node.data;
    while (node.left != null) {
      minv = node.left.value;
      node = node.left;
    }
    return minv;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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
