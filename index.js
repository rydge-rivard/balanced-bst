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

  return { root, insert };
}

const cleanData = prepArr(data);
const tree = Tree(cleanData);

prettyPrint(tree.root, (prefix = ""), (isLeft = true));
tree.insert(6);

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
