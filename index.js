const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
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

function Node(data, left = null, right = null) {
  return { data, left, right };
}

function Tree(arr, root) {
  root = buildTree(arr);

  function insert(value, root = this.root) {
    if (root === null) {
      root = Node(value);
      return root;
    }
    if (root.data > value) {
      root.left = insert(value, root.left);
    } else if (root.data < value) {
      root.right = insert(value, root.right);
    }
    return root;
  }

  function find(value, root = this.root) {
    if (root === null) {
      return null;
    } else if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    } else {
      return root;
    }
  }

  function levelOrder(root = this.root, q = []) {
    const nodeList = [];
    if (root === null) {
      return;
    }
    q.push(root);
    while (q.length > 0) {
      const current = q.shift();
      nodeList.push(current.data);
      current.left !== null ? q.push(current.left) : false;
      current.right !== null ? q.push(current.right) : false;
    }
    return nodeList;
  }

  function inOrder(root = this.root, arr = []) {
    if (root !== null) {
      inOrder(root.left, arr);
      arr.push(root.data);
      inOrder(root.right, arr);
    }
    return arr;
  }

  function preOrder(root = this.root, arr = []) {
    if (root !== null) {
      arr.push(root.data);
      preOrder(root.left, arr);
      preOrder(root.right, arr);
    }
    return arr;
  }

  function postOrder(root = this.root, arr = []) {
    if (root !== null) {
      postOrder(root.left, arr);
      postOrder(root.right, arr);
      arr.push(root.data);
    }
    return arr;
  }

  function depth(value, root = this.root, d = 0) {
    if (root === null) {
      return null;
    } else if (value < root.data) {
      d += 1;
      return this.depth(value, root.left, d);
    } else if (value > root.data) {
      d += 1;
      return this.depth(value, root.right, d);
    } else {
      return d;
    }
  }

  function findHeightUtil(root, x) {
    if (root == null) {
      return -1;
    }
    var leftHeight = findHeightUtil(root.left, x);
    var rightHeight = findHeightUtil(root.right, x);
    var ans = Math.max(leftHeight, rightHeight) + 1;
    if (root.data == x) height = ans;
    return ans;
  }

  function findHeight(x, root = this.root) {
    findHeightUtil(root, x);
    return height;
  }

  function isBalanced(root = this.root) {
    if (root == null) {
      return -1;
    }
    var leftHeight = isBalanced(root.left);
    var rightHeight = isBalanced(root.right);
    if (leftHeight - rightHeight > 1) {
      return false;
    } else if (rightHeight - leftHeight > 1) {
      return false;
    } else {
      return true;
    }
  }

  function deleteNode(value, root = this.root) {
    if (root === null) {
      return root;
    }
    if (root.data > value) {
      root.left = deleteNode(value, root.left);
      return root;
    } else if (root.data < value) {
      root.right = deleteNode(value, root.right);
      return root;
    }
    // delete if single leaf
    if (root.left === null) {
      let temp = root.right;
      delete root;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root;
      return temp;
    } else {
      // if two leaves take the parent as new root
      let succParent = root;
      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }
      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }
      root.key = succ.key;
      delete succ;
      return root;
    }
  }

  return {
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    depth,
    findHeight,
    isBalanced,
  };
}

const cleanData = prepArr(data);
const tree = Tree(cleanData);

tree.insert(6);
tree.find(4);
prettyPrint(tree.root, (prefix = ""), (isLeft = true));

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }
  const mid = Math.floor((start + end) / 2);
  const root = Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

function mergeSort(array) {
  const half = array.length / 2;
  if (array.length < 2) {
    return array;
  }
  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return [...arr, ...left, ...right];
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function prepArr(arr) {
  return mergeSort(removeDuplicates(arr));
}
